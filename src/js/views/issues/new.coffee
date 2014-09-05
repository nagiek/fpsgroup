BaseView = require("../base")
moment = require("moment")
_ = require("underscore")
Parse = require("parse").Parse
Issue = require("../../models/issue")

module.exports = class IssuesNewView extends BaseView

  className: "issues_new_view"

  events:
    'submit form' : 'save'

  errorHandler : ->
    
  initialize : (attrs) ->

  
  # @collection will not be in initialize, as we have not hydrated the view.
  # Therefore, delay adding events until preRender (which comes after hydrate).
  preRender : ->

    @listenTo @collection, 'invalid', (error) =>
      console.log error
      @$('button.save').button "reset"
      msg = i18nCommon.errors.unknown

    @on "save:success", (model) =>

      @app.alert event: 'model-save', fade: true, message: @app.polyglot.t("common.actions.changes_saved"), type: 'success'

      # Only make an activity for new models
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
    _.extend data, cancelPath: @collection.url

  getSaveData: ->

    # super
    BaseView::getSaveData.apply(this, arguments)

    data = @$('form').serializeJSON()    
    data.issue.slug = _.slugify data.issue.title

    data

  save : (e) ->

    # super
    BaseView::save.apply(this, arguments)

    data = @getSaveData()

    @collection.create data.issue,
      success: (model) =>
        @trigger "save:success", model
      error: (model, error) =>  
        @collection.trigger "invalid", error

module.exports.id = "issues/new"
