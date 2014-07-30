BaseView = require("../base")
moment = require("moment")
_ = require("underscore")
Parse = require("parse").Parse

module.exports = class IssuesNewView extends BaseView

  className: "issues_new_view"

  events:
    'submit form' : 'save'
    
  initialize : (attrs) ->

    @listenTo @model, 'invalid', (error) =>
      console.log error
      @$('button.save').button "reset"
      msg = i18nCommon.errors.unknown

    @on "save:success", (model) =>

      @app.alert event: 'model-save', fade: true, message: @app.polyglot.t("common.actions.changes_saved"), type: 'success'

      if model.get("public") and not model.get("activity")

        # Create activity
        activity = new Activity
          activityType: "new_#{model.className}"
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
    _.extend data,
      cancelPath: if @model.isNew() then @options.collection.url else @model.getUrl()

  save : (e) ->

    # super
    BaseView::save.apply(this, arguments)

    data = @$('form').serializeJSON()

    # Massage the Only-String data from serializeJSON()
    data.issue.rent = 0 if data.issue.rent is '' or data.issue.rent is '0'
    data.issue.rent = Number data.issue.rent if data.issue.rent

    for attr in ['startDate', 'endDate']
      # Instead of "ll", might have to use "moment.langData().longDateFormat()"
      if typeof data.issue[attr] is 'string' and data.issue[attr] isnt ''
        data.issue[attr] = moment(data.issue[attr], "ll").toDate()
    
    data.issue.slug = _.slugify data.issue.title

    @model.save data.issue,
      success: (model) => 
        console.log @model
        debugger
        @model.trigger "save:success"
        @trigger "save:success", model, @
      error: (model, error) => 
        @model.trigger "invalid", error

module.exports.id = "issues/new"
