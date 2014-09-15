BaseView = require("../base")
_ = require('underscore')
Parse = require("parse").Parse

module.exports = BaseView.extend
  className: "user_settings_view"
  	
  events:
    'submit form' : 'save'
  
  postRender : ->

    if Parse.User.current()

      @listenTo Parse.User.current(), 'invalid', (error) =>
        console.log error
        @$('button.save').button "reset"
        msg = @app.polyglot.t("common.errors.unknown")
        @app.alert event: 'model-save', fade: true, message: msg, type: 'error'

      @on "save:success", (model) =>
        @$('button.save').button "reset"

        msg = @app.polyglot.t("common.actions.changes_saved")
        @app.alert event: 'model-save', fade: true, message: msg, type: 'success'


  getTemplateData: ->

    if Parse.User.current()
      data = Parse.User.current().toJSON()
      data.cancelPath = Parse.User.current().get("profile").getUrl()
      return data
    else
      _.clone @options

  getSaveData: ->

    data = @$('form').serializeJSON()
    data

  save : (e) ->

    # super
    BaseView::save.apply(this, arguments)

    data = @getSaveData()

    Parse.User.current().save data.user,
      success: (model) => 
        model.trigger "save:success"
        @trigger "save:success", model
      error: (model, error) => 
        model.trigger "invalid", error

module.exports.id = "users/settings"