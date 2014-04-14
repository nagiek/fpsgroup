BaseView = require("../base")
moment = require("moment")
_ = require("underscore")
Issue = require("../../models/issue")
Parse = require("parse").Parse

module.exports = BaseView.extend
  className: "issues_new_view"

  events:
    'submit form' : 'save'
    
  initialize : (attrs) ->

    @model = new Issue({}, app: @options.app, collection: @options.collection) unless @model

    @listenTo @model, 'invalid', (error) =>
      console.log error
      @$('button.save').button "reset"
      msg = i18nCommon.errors.unknown

    @on "save:success", (model) =>

      @app.alert event: 'model-save', fade: true, message: @app.polyglot.t("common.actions.changes_saved"), type: 'success'

      if model.get "public" and not model.get "activity"

        # Create activity
        activity = new Activity
          activity_type: "new_#{model.className}"
          public: true
          title: model.get "title"
          subject: Parse.User.current().get("profile")
          object: model

        activity.save().then (returnedActivity) ->
          model.save activity: returnedActivity
      
      Parse.history.navigate model.getUrl(), true

  getTemplateData: ->
    # Get `super`.
    data = BaseView.prototype.getTemplateData.call(this)
    console.log @model
    _.extend data,
      cancelPath: if @model.isNew() then @options.collection.getUrl() else @model.getUrl()

  save : (e) ->

    # super
    BaseView::save.apply(this, arguments)

    data = @$('form').serializeJSON()

    # Massage the Only-String data from serializeJSON()
    data.issue.rent = 0 if data.issue.rent is '' or data.issue.rent is '0'
    data.issue.rent = Number data.issue.rent if data.issue.rent

    for attr in ['start_date', 'end_date']
      # Instead of "ll", might have to use "moment.langData().longDateFormat()"
      data.issue[attr] = moment(data.issue[attr], "ll").toDate() unless data.issue[attr] is ''
      data.issue[attr] = new Date if typeof data.issue[attr] is 'string'
    
    attrs = data.issue

    @model.save attrs,
      success: (model) => 
        @trigger "save:success", model, _this
      error: (model, error) => 
        @model.trigger "invalid", error

module.exports.id = "issues/new"