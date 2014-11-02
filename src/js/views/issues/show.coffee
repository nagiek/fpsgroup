BaseView = require("../base")
module.exports = BaseView.extend
  className: "issues_show_view"
  getTemplateData: ->
    # Get `super`.
    data = BaseView.prototype.getTemplateData.call(this)
    _.extend data, 
      editPath: @model.getUrl() + "/edit"
      pricesPath: @model.getUrl() + "/prices"
module.exports.id = "issues/show"