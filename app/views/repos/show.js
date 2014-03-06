(function() {
  var BaseView;

  BaseView = require("../base");

  module.exports = BaseView.extend({
    className: "repos_show_view",
    getTemplateData: function() {
      var data;
      data = BaseView.prototype.getTemplateData.call(this);
      data.build = this.options.build.toJSON();
      return data;
    }
  });

  module.exports.id = "repos/show";

}).call(this);
