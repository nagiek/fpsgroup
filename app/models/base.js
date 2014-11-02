(function() {
  var Parse, RendrBase, _;

  RendrBase = require("rendr/shared/base/model");

  Parse = require("parse").Parse;

  _ = require("underscore");

  module.exports = RendrBase.extend("Base", {
    idAttribute: "objectId",
    save: function(attrs, options) {
      var success;
      options = options ? _.clone(options) : {};
      success = options.success;
      options.success = (function(_this) {
        return function(nextModel, resp, xhr) {
          if (success) {
            success(nextModel, resp);
          }
          _this.store();
          if (_this.collection) {
            return _this.app.fetcher.collectionStore.set(_this.collection);
          }
        };
      })(this);
      return RendrBase.prototype.save.apply(this, arguments);
    },
    parse: function(resp, status, xhr) {
      var output;
      resp = RendrBase.prototype.parse.apply(this, arguments);
      output = _.clone(resp);
      _(["createdAt", "updatedAt"]).each(function(key) {
        if (output[key]) {
          return output[key] = Parse._parseDate(output[key]);
        }
      });
      if (!output.updatedAt) {
        output.updatedAt = output.createdAt;
      }
      if (status) {
        this._existed = status !== 201;
      }
      return output;
    }
  });

}).call(this);
