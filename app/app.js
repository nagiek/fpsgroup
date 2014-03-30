(function() {
  var BaseApp, ModelUtils, Parse, handlebarsHelpers;

  BaseApp = require("rendr/shared/app");

  Parse = require("parse").Parse;

  handlebarsHelpers = require("./lib/handlebarsHelpers");

  ModelUtils = require("../shared/modelUtils");


  /*
  Extend the `BaseApp` class, adding any custom methods or overrides.
   */

  module.exports = BaseApp.extend({

    /*
    @shared
     */

    /*
    Client and server.
    
    `postInitialize` is called on app initialize, both on the client and server.
    On the server, an app is instantiated once for each request, and in the
    client, it's instantiated once on page load.
    
    This is a good place to initialize any code that needs to be available to
    app on both client and server.
     */
    postInitialize: function() {

      /*
      Register our Handlebars helpers.
      
      `this.templateAdapter` is, by default, the `rendr-handlebars` module.
      It has a `registerHelpers` method, which allows us to register helper
      modules that can be used on both client & server.
       */
      this.templateAdapter.registerHelpers(handlebarsHelpers);
    },

    /*
    Client-side only.
    
    `start` is called at the bottom of `__layout.hbs`. Calling this kicks off
    the router and initializes the application.
    
    Override this method (remembering to call the superclass' `start` method!)
    in order to do things like bind events to the router, as shown below.
     */
    start: function() {
      Parse.initialize("S3u3s87Sng5OBo9YjFh6PuJIEnicbld6YYjojbGp", "bWEMzR4vYCQvXGhsQRaayQljkhFm3TJiToZ5rBEJ");
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
      BaseApp.prototype.start.call(this);
    }
  });

}).call(this);
