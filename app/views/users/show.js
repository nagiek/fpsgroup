(function() {
  var BaseView;

  BaseView = require("../base");

  module.exports = BaseView.extend({
    className: "users_show_view",
    getTemplateData: function() {
      var data;
      data = BaseView.prototype.getTemplateData.call(this);
      data.repos = this.options.repos;
      return data;
    }
  });

  module.exports.id = "users/show";

}).call(this);
