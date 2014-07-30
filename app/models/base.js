(function() {
  var RendrBase, _;

  RendrBase = require("rendr/shared/base/model");

  _ = require("underscore");

  module.exports = RendrBase.extend("Base", {
    idAttribute: "objectId",
    constructor: function() {
      console.log("constructor");
      RendrBase.prototype.constructor.apply(this, arguments);
      this.on('save:success', this.updateModelOrCollectionStore, this);
      return this.on('destroy', this.updateModelOrCollectionStore, this);
    },
    storeModelOrCollection: function() {
      console.log("updateModelOrCollectionStore");
      if (this.collection) {
        return this.collection.store();
      } else {
        return this.store();
      }
    }
  });

}).call(this);
