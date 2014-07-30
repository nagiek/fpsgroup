RendrBase = require "rendr/shared/base/model"
_ = require "underscore"
module.exports = RendrBase.extend "Base",
  # {}
  idAttribute: "objectId"

  constructor: ->
    
    console.log "constructor"

    # super
    RendrBase::constructor.apply(this, arguments)

    @on 'save:success', @updateModelOrCollectionStore, @
    @on 'destroy', @updateModelOrCollectionStore, @

  storeModelOrCollection: ->
    console.log "updateModelOrCollectionStore"
    if @collection then @collection.store() else @store()