BaseClientRouter = require("rendr/client/router")
Parse = require("parse").Parse

Router = module.exports = Router = (options) ->
  BaseClientRouter.call this, options
  return


###
Set up inheritance.
###
Router:: = Object.create(BaseClientRouter::)
Router::constructor = BaseClientRouter
Router::postInitialize = ->

  # Reset global view state.
  # @listenTo Parse.history, "route", (router, route, params) => Parse.App.search.$('input').val("").blur() 

  @on "action:start", @trackImpression, this

Router::trackImpression = ->
  _gaq.push ["_trackPageview"]  if window._gaq
  return