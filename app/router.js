(function() {
  var BaseClientRouter, Parse, Router;

  BaseClientRouter = require("rendr/client/router");

  Parse = require("parse").Parse;

  Router = module.exports = Router = function(options) {
    BaseClientRouter.call(this, options);
  };


  /*
  Set up inheritance.
   */

  Router.prototype = Object.create(BaseClientRouter.prototype);

  Router.prototype.constructor = BaseClientRouter;

  Router.prototype.postInitialize = function() {
    return this.on("action:start", this.trackImpression, this);
  };

  Router.prototype.trackImpression = function() {
    if (window._gaq) {
      _gaq.push(["_trackPageview"]);
    }
  };

}).call(this);
