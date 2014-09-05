RendrBase = require "rendr/shared/base/model"

module.exports = RendrBase.extend "Base",

  idAttribute: "objectId"

  save: (attrs, options) ->

    options = if options then _.clone(options) else {}
    success = options.success

    options.success = (nextModel, resp, xhr) =>

      @store()

      # Update the collection store with the new model.
      if @collection then @app.fetcher.collectionStore.set(@collection)

      success(nextModel, resp) if success
        
    RendrBase::save.apply(this, arguments)