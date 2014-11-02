BaseView = require("../base")
moment = require("moment")
_ = require("underscore")
Parse = require("parse").Parse
# Modernizr = require("../../../bower_components/modernizr/modernizr")
Issue = require("../../models/issue")

module.exports = BaseView.extend

  className: "issues_new_view"

  events:
    'submit form' : 'save'

  # @collection will not be in initialize, as we have not hydrated the view.
  # Therefore, delay adding events until preRender (which comes after hydrate).
  postRender : ->

    @listenTo @collection, 'invalid', @handleBadSave

    @on "save:success", (model) =>

      msg = @app.polyglot.t("common.actions.changes_saved")
      @app.alert event: 'model-save', fade: true, message: msg, type: 'success'

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

    # unless Modernizr.inputtypes.date
    @$('.datepicker').datepicker()

  getTemplateData: ->
    # Get `super`.
    data = BaseView::getTemplateData.call(this)
    _.extend data, cancelPath: @collection.url

  getSaveData: ->

    # super
    BaseView::getSaveData.apply(this, arguments)

    data = @$('form').serializeJSON()    
    data.issue.slugEN = _.slugify data.issue.titleEN
    data.issue.slugFR = _.slugify data.issue.titleFR

    format = @app.polyglot.t("common.dates.formats.output")
    data.issue.issuanceDate = moment(data.issue.issuanceDate, format).toDate()
    data.issue.maturityDate = moment(data.issue.maturityDate, format).toDate()

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

  handleBadSave : (error) =>
    console.log error
    @$('button.save').button "reset"
    msg = @app.polyglot.t("common.errors.unknown")
    @app.alert event: 'model-error', fade: true, message: msg, type: 'error'
  
module.exports.id = "issues/new"
