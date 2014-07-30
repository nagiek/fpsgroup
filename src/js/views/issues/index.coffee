BaseView = require("../base")


module.exports = BaseView.extend
  className: "issues_index_view"

  getTemplateData: ->
    # Get `super`.
    data = BaseView::getTemplateData.call(this)
    # _.each data.models, (model) -> 
    #   model.slug = model.getUrl()
    # data
        
module.exports.id = "issues/index"