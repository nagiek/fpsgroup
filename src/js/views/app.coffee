BaseClientAppView =       require "rendr/client/app_view"
Parse =                   require("parse").Parse
Alert =                   require "./helpers/alert"

# Create a base view, for adding common extensions to our
# application's views.
module.exports = BaseClientAppView.extend

  initialize: (attrs) ->

    # Keep childViews and alertViews separate.
    # Distinction: alerts clean themselves up, children are managed.
    @alertViews = []

    @listenTo @app, "alert", @renderAlert

    @on "alert:clear", (cid) ->
      clearedViewIndex = _.indexOf @alertViews, (cv) -> cv.cid is cid
      @alertViews[clearedViewIndex] = null if clearedViewIndex

    @$alerts = @$("#alerts")

  renderAlert: (data) ->

    data.app = @app

    # Create a new alert for the event if one doesn't exist.
    if @$alerts.find("#alert-#{data.event}").length is 0

      alert = new Alert data
      @alertViews.push alert
      @$alerts.append alert.render().el

    # Otherwise update the existing alert
    else

      alert = _.find @alertViews, (av) -> av.options.event is data.event
      alert.update data if alert