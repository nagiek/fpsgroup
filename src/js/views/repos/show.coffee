BaseView = require("../base")
module.exports = BaseView.extend(
  className: "repos_show_view"
  getTemplateData: ->
    data = BaseView::getTemplateData.call(this)
    data.build = @options.build.toJSON()
    data
)
module.exports.id = "repos/show"