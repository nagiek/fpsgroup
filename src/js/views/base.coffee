RendrView = require("rendr/shared/base/view")

# Create a base view, for adding common extensions to our
# application's views.
module.exports = RendrView.extend

  save: (e) ->
    e.preventDefault()
    @$('button.save').button "loading"
    @$('.has-error').removeClass('has-error')

  # to be overwritten
  getSaveData: ->

  # Clean up
  clear: ->
    @removeChildViews()
    @childViews = null
    @parentView = null
    @viewing = false

    obj = @model || @collection
    obj.off(null, null, @) if obj

    @stopListening()
    @undelegateEvents()
    delete @

  # Clean up child views
  clearChildViews: -> (@childViews || []).forEach (view) -> view.clear()