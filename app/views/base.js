(function() {
  var RendrView;

  RendrView = require("rendr/shared/base/view");

  module.exports = RendrView.extend({
    save: function(e) {
      e.preventDefault();
      this.$('button.save').button("loading");
      return this.$('.has-error').removeClass('has-error');
    },
    getSaveData: function() {}
  });

}).call(this);
