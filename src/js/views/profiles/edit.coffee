BaseView = require("../base")
_ = require("underscore")
Parse = require("parse").Parse

module.exports = BaseView.extend
  className: "profiles_edit_view"
  	
  events:
    'submit form' : 'save'
    
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

  getTemplateData: ->
    # Get `super`.
    data = BaseView.prototype.getTemplateData.call(this)
    _.extend data, cancelPath: @model.getUrl()

  getSaveData: ->

    # super
    BaseView::getSaveData.apply(this, arguments)

    data = @$('form').serializeJSON()

    data

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

module.exports.id = "profiles/edit"