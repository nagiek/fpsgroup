BaseView = require("../base")
module.exports = BaseView.extend(
  className: "users_show_view"
  getTemplateData: ->
    data = BaseView::getTemplateData.call(this)
    data.repos = @options.repos
    data
)
module.exports.id = "users/show"