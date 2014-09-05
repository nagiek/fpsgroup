(function() {
  var RendrBase;

  RendrBase = require("rendr/shared/base/model");

  module.exports = RendrBase.extend("Base", {
    idAttribute: "objectId",
    save: function(attrs, options) {
      var success;
      options = options ? _.clone(options) : {};
      success = options.success;
      options.success = (function(_this) {
        return function(nextModel, resp, xhr) {
          _this.store();
          if (_this.collection) {
            _this.app.fetcher.collectionStore.set(_this.collection);
          }
          if (success) {
            return success(nextModel, resp);
          }
        };
      })(this);
      return RendrBase.prototype.save.apply(this, arguments);
    }
  });

}).call(this);
