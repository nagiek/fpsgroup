BaseView = require("../base")
NewIssuesView = require("./new")
moment = require("moment")
_ = require("underscore")
Parse = require("parse").Parse

module.exports = NewIssuesView.extend
  className: "issues_edit_view"

  # @collection will not be in initialize, as we have not hydrated the view.
  # Therefore, delay adding events until preRender (which comes after hydrate).
  postRender : ->

    @listenTo @model, 'invalid', (error) =>
      console.log error
      @$('button.save').button "reset"
      msg = @app.polyglot.t("common.errors.unknown")
      @app.alert event: 'model-save', fade: true, message: msg, type: 'error'

    @on "save:success", (model) =>

      msg = @app.polyglot.t("common.actions.changes_saved")
      @app.alert event: 'model-save', fade: true, message: msg, type: 'success'

      Parse.history.navigate model.getUrl(), true

    # unless Modernizr.inputtypes.date
    @$('.datepicker').datepicker()

  getTemplateData: ->
    # Get `super`.
    data = BaseView.prototype.getTemplateData.call(this)
    _.extend data, cancelPath: @model.getUrl()

  save : (e) ->

    # super
    BaseView::save.apply(this, arguments)

    data = @getSaveData()

    @model.save data.issue,
      success: (model) => 
        model.trigger "save:success"
        @trigger "save:success", model
      error: (model, error) => 
        model.trigger "invalid", error

module.exports.id = "issues/edit"