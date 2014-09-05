BaseView = require("./new")
module.exports = BaseView.extend
  className: "issues_edit_view"

  # @collection will not be in initialize, as we have not hydrated the view.
  # Therefore, delay adding events until preRender (which comes after hydrate).
  preRender : ->

    @listenTo @model, 'invalid', (error) =>
      console.log error
      @$('button.save').button "reset"
      msg = i18nCommon.errors.unknown

    @on "save:success", (model) =>

      @app.alert event: 'model-save', fade: true, message: @app.polyglot.t("common.actions.changes_saved"), type: 'success'
      Parse.history.navigate model.getUrl(), true

  getTemplateData: ->
    # Get `super`.
    data = BaseView.prototype.getTemplateData.call(this)
    _.extend data, cancelPath: @model.getUrl()

  save : (e) ->

    # super
    BaseView::save.apply(this, arguments)

    @model.save data.issue,
      success: (model) => 
        model.trigger "save:success"
        @trigger "save:success", model, @
      error: (model, error) => 
        model.trigger "invalid", error

module.exports.id = "issues/edit"