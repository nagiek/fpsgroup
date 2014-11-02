(function() {
  var _;

  _ = require("underscore");

  Parse.Cloud.beforeSave("Price", function(req, res) {
    if (!req.object.get("price")) {
      return req.error("missing.price");
    }
    if (!req.object.get("date")) {
      return req.error("missing.date");
    }
    return res.success();
  });

  Parse.Cloud.beforeSave("Issue", function(req, res) {
    var issue, stopWords, titleEN, titleFR, words;
    issue = req.object;
    titleEN = issue.get("titleEN") || "";
    titleFR = issue.get("titleFR") || "";
    if (!titleEN) {
      return res.error("missing.titleEN");
    }
    if (!titleFR) {
      return res.error("missing.titleFR");
    }
    words = [].concat(titleEN.split(/\s+/), titleFR.split(/\s+/));
    words = _.map(words, function(w) {
      return w.toLowerCase();
    });
    words.push(issue.get("ismCode").toLowerCase());
    words.push(issue.get("fundservCode").toLowerCase());
    issue.set("ismCode", issue.get("ismCode").toUpperCase());
    issue.set("fundservCode", issue.get("fundservCode").toUpperCase());
    stopWords = ["the", "in", "and", "le", "la", "les"];
    words = _.filter(words, function(w) {
      return w.match(/^\w+$/) && !_.contains(stopWords, w);
    });
    issue.set("search", words);
    return res.success();
  });

  Parse.Cloud.define("SetPicture", function(req, res) {
    return Parse.Cloud.httpRequest({
      method: "GET",
      url: req.params.url,
      success: function(httpres) {
        var Buffer, buf, file;
        Buffer = require('buffer').Buffer;
        buf = new Buffer(httpres.buffer);
        file = new Parse.File(req.user.getUsername() + "-picture.jpeg", {
          base64: buf.toString('base64')
        });
        return file.save().then(function() {
          return (new Parse.Query("Profile")).equalTo('objectId', req.user.get("profile").id).first();
        }, function(error) {
          return res.error(error);
        }).then(function(profile) {
          return profile.save({
            image_thumb: file.url(),
            image_profile: file.url(),
            image_full: file.url()
          });
        }, function(error) {
          return res.error(error);
        }).then(function() {
          return res.success(file.url());
        }, function(error) {
          return res.error(error);
        });
      },
      error: function(error) {
        return res.error(error);
      }
    });
  });

  Parse.Cloud.beforeSave(Parse.User, function(req, res) {
    if (req.object.existed()) {
      return res.success();
    }
    return (new Parse.Object("Profile")).save().then(function(profile) {
      req.object.set("profile", profile);
      return res.success(req.object);
    }, function() {
      return res.error("profile_not_saved");
    });
  });

  Parse.Cloud.afterSave(Parse.User, function(req) {
    if (req.object.existed()) {
      return;
    }
    return (new Parse.Query("Profile")).get(req.object.get("profile").id, {
      success: function(profile) {
        var profileACL;
        if (profile.get("user")) {
          return;
        }
        profileACL = new Parse.ACL();
        profileACL.setPublicReadAccess(true);
        profileACL.setReadAccess(req.object, true);
        profileACL.setWriteAccess(req.object, true);
        return profile.save({
          user: req.object,
          ACL: profileACL
        });
      }
    });
  });

}).call(this);
