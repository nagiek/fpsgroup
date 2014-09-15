# Set Picture
# -----------
# Set a user's picture to an external URL
Parse.Cloud.define "SetPicture", (req, res) ->

  Parse.Cloud.httpRequest
    method: "GET"
    url: req.params.url
    success: (httpres) ->
      # Write the response to a buffer and save as file.
      Buffer = require('buffer').Buffer
      buf = new Buffer(httpres.buffer)      
      file = new Parse.File(req.user.getUsername() + "-picture.jpeg", base64: buf.toString('base64'))
      file.save().then( ->
        (new Parse.Query "Profile").equalTo('objectId', req.user.get("profile").id).first()
      , 
        (error) -> res.error error
      ).then( (profile) ->
        profile.save image_thumb: file.url(), image_profile: file.url(), image_full: file.url()
      ,
        (error) -> res.error error
      ).then( ->
        res.success file.url()
      ,
        (error) -> res.error error
      )
    error: (error) ->
      res.error error

# User before save
Parse.Cloud.beforeSave Parse.User, (req, res) ->

  return res.success() if req.object.existed()
  
  (new Parse.Object("Profile")).save().then (profile) ->
    req.object.set "profile", profile
    res.success req.object
  , -> res.error "profile_not_saved"

# User after save
Parse.Cloud.afterSave Parse.User, (req) ->

  return if req.object.existed()
   
  # Map the user to the profile, if any.
  (new Parse.Query "Profile").get req.object.get("profile").id, 
  success: (profile) ->

    # There's no chance the profile has a user...
    return if profile.get("user")

    # Create the profileACL after we have a userId.
    profileACL = new Parse.ACL()
    profileACL.setPublicReadAccess true
    profileACL.setReadAccess req.object, true
    profileACL.setWriteAccess req.object, true
   
    profile.save user: req.object, ACL: profileACL
