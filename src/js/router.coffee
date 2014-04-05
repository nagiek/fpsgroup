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

  # Use delegation to avoid initial DOM selection and allow all matching elements to bubble
  $(document).on "click", "a", (e) ->
    console.log e
    return if e.isDefaultPrevented()
    # Get the anchor href
    href = $(this).attr("href")
    return if href is "#" or not href?
    # If this is a relative link on this domain.
    if href.substring(0,1) is '/' and href.substring(0,2) isnt '//'
      e.preventDefault()
      Parse.history.navigate href, true


  @on "action:start", @trackImpression, this

Router::trackImpression = ->
  _gaq.push ["_trackPageview"]  if window._gaq
  return