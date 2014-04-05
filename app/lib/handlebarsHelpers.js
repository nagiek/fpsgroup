
/*
We inject the Handlebars instance, because this module doesn't know where
the actual Handlebars instance will come from.
 */

(function() {
  module.exports = function(Handlebars) {
    return {
      copyright: function(year) {
        return new Handlebars.SafeString("&copy;" + year);
      },
      __: function(key, options) {
        return Handlebars.polyglot.t(key, options);
      }
    };
  };

}).call(this);
