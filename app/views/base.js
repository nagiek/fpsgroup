(function() {
  var RendrView;

  RendrView = require("rendr/shared/base/view");

  module.exports = RendrView.extend({
    save: function(e) {
      e.preventDefault();
      this.$('button.save').button("loading");
      return this.$('.has-error').removeClass('has-error');
    },
    getSaveData: function() {},
    clear: function() {
      var obj;
      this.removeChildViews();
      this.childViews = null;
      this.parentView = null;
      this.viewing = false;
      obj = this.model || this.collection;
      if (obj) {
        obj.off(null, null, this);
      }
      this.stopListening();
      this.undelegateEvents();
      return delete this;
    },
    clearChildViews: function() {
      return (this.childViews || []).forEach(function(view) {
        return view.clear();
      });
    }
  });

}).call(this);
