(function() {
  var BaseView;

  BaseView = require("./base");

  module.exports = BaseView.extend({
    className: "user_repos_view"
  });

  module.exports.id = "user_repos_view";

}).call(this);
