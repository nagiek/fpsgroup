BaseClientAppView = require('rendr/client/app_view')
Alert = require("./helper/alert")

# Create a base view, for adding common extensions to our
# application's views.
module.exports = BaseClientAppView.extend

  initialize: (attrs) ->

    @listenTo @app, "alert", @renderAlert

    @childViews = @childViews or []

    @on "alert:clear", (cid) ->
      clearedViewIndex = _.indexOf @childViews, (cv) -> cv.cid is cid
      @childViews[clearedViewIndex] = null if clearedViewIndex


  ###
  Override `render` instead of `postRender`, as we are 
  using the special `app_view` class as a base.
  ###
  render: ->

    @$messages = @$("#messages")

  renderAlert: (data) ->

    data.app = @app

    # Create a new alert for the event if one doesn't exist.
    if @$messages.find("#alert-#{data.event}").length is 0

      alert = new Alert data
      @childViews.push alert
      @$messages.append alert.render().el

    # Otherwise update the existing alert
    else

      alert = _.find @childViews, (cv) -> cv.options.event is data.event
      alert.update data if alert