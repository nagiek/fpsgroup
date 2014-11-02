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

  i18n: (attr) ->
    @[attr+Handlebars.polyglot.currentLocale.toUpperCase()]

  moment: (context, format) ->
    return '' unless context?
    if typeof format isnt "String" then format = "LL"
    moment(context.iso).format(format)

  duration: (context, format) ->
    return '' unless context?
    if typeof format isnt "String" then format = "LL"
    moment.duration(context.iso).format(format)

  datepicker: (context) ->
    return '' unless context?
    format = Handlebars.polyglot.t("common.dates.formats.output")
    moment(context.iso).format(format)


  log: (variable) -> console.log variable
