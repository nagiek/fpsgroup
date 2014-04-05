###
We inject the Handlebars instance, because this module doesn't know where
the actual Handlebars instance will come from.
###
# Polyglot = require "node-polyglot"

module.exports = (Handlebars) ->
  
  # phrases = require "../lang/#{Handlebars.locale}"

  # polyglot = new Polyglot 
  # 	locale: Handlebars.locale
  # 	phrases: phrases

  copyright: (year) ->
    new Handlebars.SafeString("&copy;" + year)

  __: (key, options) ->
  	Handlebars.polyglot.t key, options