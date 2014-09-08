(function() {
  var BaseApp, Parse, Polyglot, handlebarsHelpers, moment, _;

  BaseApp = require("rendr/shared/app");

  Parse = require("./lib/parseFix");

  handlebarsHelpers = require("./lib/handlebarsHelpers");

  moment = require("moment");

  Polyglot = require("node-polyglot");

  _ = require('underscore');

  _.str = require('underscore.string');

  _.mixin(_.str.exports());


  /*
  Extend the `BaseApp` class, adding any custom methods or overrides.
   */

  module.exports = BaseApp.extend({

    /*
    Client and server.
    
    `initialize` is called on app initialize, both on the client and server.
    On the server, an app is instantiated once for each request, and in the
    client, it's instantiated once on page load.
    
    This is a good place to initialize any code that needs to be available to
    app on both client and server.
     */
    initialize: function() {
      var phrases;
      this.locale = this.locale || 'en';
      phrases = {
        en: require("./lang/en"),
        fr: require("./lang/fr")
      };
      this.polyglot = new Polyglot({
        locale: this.locale,
        phrases: phrases[this.locale]
      });
      moment.locale(this.locale);
      this.templateAdapter.Handlebars.polyglot = this.polyglot;

      /*
      Register our Handlebars helpers.
      
      `this.templateAdapter` is, by default, the `rendr-handlebars` module.
      It has a `registerHelpers` method, which allows us to register helper
      modules that can be used on both client & server.
       */
      return this.templateAdapter.registerHelpers(handlebarsHelpers);
    },
    getAppViewClass: function() {
      return require('./views/app');
    },

    /*
    Client-side only.
    
    `start` is called at the bottom of `__layout.hbs`. Calling this kicks off
    the router and initializes the application.
    
    Override this method (remembering to call the superclass' `start` method!)
    in order to do things like bind events to the router, as shown below.
     */
    start: function() {
      window.APPID = "XPgFZcncZDVj0jjwpUJkUhPpCisuk7gytJDJGI5v";
      window.JSKEY = "bY8kXjylVf3x2nev6Kq2UjMt91fNZFiMsGF5b1h5";
      window.RESTAPIKEY = "ulEQgeXTKidIPtjTIdwnRKrecmRTnxoxSKHgnqOC";
      Parse.initialize(window.APPID, window.JSKEY);
      this.router.on("action:start", (function() {
        this.set({
          loading: true
        });
      }), this);
      this.router.on("action:end", (function() {
        this.set({
          loading: false
        });
      }), this);
      return BaseApp.prototype.start.call(this);
    },

    /*
    Client-side only.
    
    `alert` is the method used to alert the user of an activity.
     */
    alert: function(data) {
      return this.trigger("alert", data);
    }
  });

}).call(this);
