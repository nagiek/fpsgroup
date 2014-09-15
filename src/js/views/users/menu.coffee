BaseView = require("../base")
Parse = require("parse").Parse

module.exports = BaseView.extend

  tagName: "ul"
  attributes:
    id: "user-menu"
    class: "nav navbar-nav navbar-right pull-right"

  events:
    "click #signup-link"  : "showSignupModal"
    "click #login-link"   : "showLoginModal"
    "click #logout"       : "logOut"

  initialize: ->
    # We assume we are logged out by default.
    # Re-render the user menu if we are logged in.
    @listenTo @app, "start user:login", @handleUserLogin
    @listenTo @app, "start user:change", @render

  # Bind events if we have a user.
  handleUserLogin: ->
    if Parse.User.current()
      @listenTo Parse.User.current().get("profile"), "change:image_profile", @updatePic
      @listenTo Parse.User.current().get("profile"), "change:first_name change:last_name", @updateName

  # Don't assign Parse.User.current().get("profile") to @model
  # It makes the user profile sticky after log out.
  getTemplateData: ->
    if Parse.User.current() then console.log Parse.User.current().get("profile")
    return Parse.User.current().get("profile").toJSON() if Parse.User.current()
    return _.clone @options

  # Logs out the user and shows the login view
  logOut: (e) ->
    @stopListening Parse.User.current().get("profile")
    Parse.User.logOut()
    @app.trigger "user:change"
    @app.trigger "user:logout"

  showSignupModal: (e) =>
    e.preventDefault()
    Parse.$('#signup-modal').modal()
    Parse.$("#signup-username").focus()

  showLoginModal: (e) =>
    e.preventDefault()
    Parse.$('#login-modal').modal()
    Parse.$("#login-username").focus()


  updateNav: -> 
    @$('#profile-link img').prop "src", Parse.User.current().get("profile").cover("micro")

  updateName: ->
    @$('#profile-link span').html Parse.User.current().get("profile").name()

module.exports.id = "users/menu"