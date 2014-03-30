BaseView = require("../base")
module.exports = BaseView.extend(
  className: "issues_show_view"
  getTemplateData: ->
    data = BaseView::getTemplateData.call(this)
    data.build = @options.build.toJSON()
    data
)
module.exports.id = "issues/show"