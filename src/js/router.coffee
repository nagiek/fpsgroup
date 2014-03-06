BaseClientRouter = require("rendr/client/router")
Router = module.exports = Router = (options) ->
  BaseClientRouter.call this, options
  return


###
Set up inheritance.
###
Router:: = Object.create(BaseClientRouter::)
Router::constructor = BaseClientRouter
Router::postInitialize = ->
  @on "action:start", @trackImpression, this
  return

Router::trackImpression = ->
  _gaq.push ["_trackPageview"]  if window._gaq
  return