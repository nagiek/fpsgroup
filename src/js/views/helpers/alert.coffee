BaseView = require("../base")
moment = require("moment")
_ = require("underscore")

defaultOptions =
  type: 'success'
  dismiss: true
  fade: false
  heading: ''
  message: ''
  buttons: ''
  event: ''

module.exports = BaseView.extend
  
  className: 'alert_view'
  
  events:
    'click .close' : 'clear'
  
  initialize: (attrs) ->
    _.defaults @options, defaultOptions

  # Fade out after 3 seconds.
  # Keep the correct value of "this"
  postRender: -> setTimeout((=> @clear.call(this)), 3000)

  alertClass: -> "alert-#{@options-type}"

  update: (data) ->

    oldClass = alertClass()
    @options = _.extend @options, data
    @$el
      .removeClass oldClass
      .addClass alertClass()
      .find(".message")
        .html @options.message
    
  clear: ->
    @$el.removeClass "in"
    @options.app.trigger "alert:clear", @cid
    setTimeout =>
      @remove()
      @undelegateEvents()
      delete this
    , 150

module.exports.id = "helpers/alert"