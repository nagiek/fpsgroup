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
    $(document).on("click", "a", function(e) {
      var href;
      console.log(e);
      if (e.isDefaultPrevented()) {
        return;
      }
      href = $(this).attr("href");
      if (href === "#" || (href == null)) {
        return;
      }
      if (href.substring(0, 1) === '/' && href.substring(0, 2) !== '//') {
        e.preventDefault();
        return Parse.history.navigate(href, true);
      }
    });
    return this.on("action:start", this.trackImpression, this);
  };

  Router.prototype.trackImpression = function() {
    if (window._gaq) {
      _gaq.push(["_trackPageview"]);
    }
  };

}).call(this);
