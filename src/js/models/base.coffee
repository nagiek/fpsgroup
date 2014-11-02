RendrBase = require "rendr/shared/base/model"
Parse = require("parse").Parse
_ = require("underscore")

module.exports = RendrBase.extend "Base",

  idAttribute: "objectId"

  save: (attrs, options) ->

    options = if options then _.clone(options) else {}
    success = options.success

    options.success = (nextModel, resp, xhr) =>

      success(nextModel, resp) if success
      
      @store()

      # Update the collection store with the new model.
      if @collection then @app.fetcher.collectionStore.set(@collection)

    # Super
    RendrBase::save.apply(this, arguments)

  # Merge the parse function provided for us by rendr.
  parse: (resp, status, xhr) ->

    # Super
    resp = RendrBase::parse.apply(this, arguments)

    output = _.clone(resp)
    _(["createdAt", "updatedAt"]).each (key) ->
      if output[key] then output[key] = Parse._parseDate(output[key])

    output.updatedAt = output.createdAt unless output.updatedAt
    
    if status then @_existed = status isnt 201

    output

