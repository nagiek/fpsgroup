BaseApp = require("rendr/shared/app")
Parse = require("./lib/parseFix")
handlebarsHelpers = require("./lib/handlebarsHelpers")
moment = require("moment")
Polyglot = require("node-polyglot")

_ = require('underscore');

# Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string')

# Mix in non-conflict functions to Underscore namespace if you want
_.mixin _.str.exports()

###
Extend the `BaseApp` class, adding any custom methods or overrides.
###
module.exports = BaseApp.extend
  
  ###
  Client and server.
  
  `initialize` is called on app initialize, both on the client and server.
  On the server, an app is instantiated once for each request, and in the
  client, it's instantiated once on page load.
  
  This is a good place to initialize any code that needs to be available to
  app on both client and server.
  ###
  initialize: ->

    APPID =      "XPgFZcncZDVj0jjwpUJkUhPpCisuk7gytJDJGI5v"
    JSKEY =      "bY8kXjylVf3x2nev6Kq2UjMt91fNZFiMsGF5b1h5"
    RESTAPIKEY = "ulEQgeXTKidIPtjTIdwnRKrecmRTnxoxSKHgnqOC"
    
    # Javascript Key
    Parse.initialize APPID, JSKEY
    
    # Set the locale
    # Give the templateAdapter access to the locale.
    @locale = @locale or 'en'

    phrases =
      en: require "./lang/en" # #{@locale}
      fr: require "./lang/fr" # #{@locale}

    @polyglot = new Polyglot 
      locale: @locale
      phrases: phrases[@locale]

    # Configure moment.js
    moment.locale @locale

    # Save a reference to our locale
    @templateAdapter.Handlebars.polyglot = @polyglot

    ###
    Register our Handlebars helpers.
    
    `this.templateAdapter` is, by default, the `rendr-handlebars` module.
    It has a `registerHelpers` method, which allows us to register helper
    modules that can be used on both client & server.
    ###
    @templateAdapter.registerHelpers handlebarsHelpers


  getAppViewClass: -> require('./views/app')
  
  ###
  Client-side only.
  
  `start` is called at the bottom of `__layout.hbs`. Calling this kicks off
  the router and initializes the application.
  
  Override this method (remembering to call the superclass' `start` method!)
  in order to do things like bind events to the router, as shown below.
  ###
  start: ->

    # Always include these headers, unless otherwise noted.
    # if window isnt undefined and window.$ isnt undefined
    #   window.$.ajaxSetup beforeSend: (jqXHR, settings) ->
    #     jqXHR.setRequestHeader "X-Parse-Application-Id", window.APPID
    #     jqXHR.setRequestHeader "X-Parse-REST-API-Key", window.RESTAPIKEY
    
    # Show a loading indicator when the app is fetching.
    @router.on "action:start", (->
      @set loading: true
      return
    ), this
    @router.on "action:end", (->
      @set loading: false
      return
    ), this

    # Call 'super'.
    BaseApp::start.call this

  ###
  Client-side only.
  
  `alert` is the method used to alert the user of an activity.
  ###
  alert: (data) -> 
    @trigger "alert", data