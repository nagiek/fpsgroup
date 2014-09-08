###
We inject the Handlebars instance, because this module doesn't know where
the actual Handlebars instance will come from.
###
# Polyglot = require "node-polyglot"
moment = require("moment")

module.exports = (Handlebars) ->
  
  # phrases = require "../lang/#{Handlebars.locale}"

  # polyglot = new Polyglot 
  #   locale: Handlebars.locale
  #   phrases: phrases

  copyright: (year) ->
    new Handlebars.SafeString("&copy;" + year)

  __: (key, options) ->
    Handlebars.polyglot.t key, options

  moment: (context, format) ->
    if typeof format isnt "String" then format = "LL"
    moment(context.iso).format(format)

  duration: (context, format) ->
    if typeof format isnt "String" then format = "LL"
    moment.duration(context.iso).format(format)
