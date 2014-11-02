BaseView = require("../base")
moment = require("moment")
_ = require("underscore")
Parse = require("parse").Parse
PricesColl = require("../../collections/prices")
Price = require("../../models/price")

module.exports = BaseView.extend

  className: "issues_prices_view"

  events:
    'submit form' : 'saveAll'

    'change table input' : 'markAsUnsaved'
    'click #edit-mode'   : 'toggleEditMode'
    'click #delete-mode' : 'toggleDeleteMode'

    'click .add' : 'addOne'
    'click .edit' : 'edit'
    'click .save-changes' : 'saveChanges'
    'click .discard-changes' : 'discardChanges'
    'click .remove' : 'removeOne'

  # @model will not be in initialize, as we have not hydrated the view.
  # Therefore, delay adding prices until preRender (which comes after hydrate).
  postRender : ->

    _.bindAll this, "handleBadSave", "_renderOne", "_removeOne"

    # Save references on the client.
    if not @model.prices then @model.prices = @collection
    if not @collection.issue then @collection.issue = @model
    @$prices = @$("table tbody")

    # Prepare for new prices.
    @pricesNewTemplate = @app.templateAdapter.getTemplate("prices/new");

    @$('.datepicker').datepicker()

    @listenTo @model, "error", @handleBadSave
    @listenTo @model.prices, "invalid", @handleBadSave
    @listenTo @model.prices, "add", @_renderOne
    @listenTo @model.prices, "remove", @_removeOne

    # Add a model to get started.
    if @model.prices.length is 0 then @model.prices.add {}, app: @app


    # We may call this often, therefore apply a throttle.
    # Call save with `this` as the context of the model.
    @model.save = _.throttle(@model.save, 2000)

    # Set the modes
    @editMode = false
    @deleteMode = false

  # @model is not well-formed on server. Recheck fetcher.
  getTemplateData: ->
    # Get `super`.
    data = BaseView.prototype.getTemplateData.call(this)
    _.extend data,
      prices: @collection.toJSON()
      editPath: @model.getUrl() + "/edit"
      cancelPath: @model.getUrl()


  # Start the process.
  addOne: (e) ->
    $price = @$(e.currentTarget).closest("tr")

    attrs = @getAttrsFromPrice $price
    attrs.date = attrs.date.add(1, "day").toDate()
    
    @model.prices.add attrs, app: @app, at: $price.index()

 
  # Do it.
  _renderOne: (model, collection, options) ->

    JSON = model.toJSON()
    JSON.cid = model.cid

    if options.at 
      $new = @$prices.children().eq(options.at).after @pricesNewTemplate(JSON)
    else 
      $new = @$prices.append @pricesNewTemplate(JSON)

    $new.find('.datepicker').datepicker()

  # Start the process
  removeOne: (e)  ->
    $price = @$(e.currentTarget).closest("tr")
    data = $price.data()
    $price.remove()

    if data
      model = @model.prices.get (data.id || data.cid)
      @model.prices.remove model

    # Make sure we're leaving a way to start again.
    if @model.prices.length is 0 then @model.prices.add {}, app: @app

  # Finish the process
  _removeOne: (model)  ->

    # Only act for saved models.
    return unless model.id

    @model.increment pricesCount: -1
    @model.relation("prices").remove model

    model.destroy()
    @model.save()


  edit: (e) ->
    @switchToEdit(@$(e.currentTarget).closest("tr"))

  # Go back to edit state.
  switchToEdit: ($price) ->
    $price.find(".edit").addClass "hide"
    $price.find(".value").addClass "hide"
    $price.find(".input-group").removeClass "hide"
    $price.find(".add").addClass "hide"
    $price.find(".save-changes").removeClass "hide"
    $price.find(".discard-changes").removeClass "hide"

  # Go back to view state.
  switchToView: ($price) ->
    $price.find(".input-group").addClass "hide"
    $price.find(".value").removeClass "hide"
    $price.find(".save-changes").addClass "hide"
    $price.find(".discard-changes").addClass "hide"
    $price.find(".edit").removeClass "hide"
    $price.find(".add").removeClass "hide"

  saveChanges: (e) ->
    $button = @$(e.currentTarget)
    $button.button("loading")

    $price = $button.closest("tr")

    data = $price.data()
    model = @model.prices.get data.id or data.cid
    attrs = @refineAttrs(@getAttrsFromPrice($price))

    model.save(attrs).then(=>
      $button.button("reset")
      @finishSave $price, model

      unless model.id
        @addToRelation [model]
        @model.save()

    , (newModel, error) =>
      $button.button("reset")
      @handleBadSave error
    )


  markAsUnsaved: (e) ->
    @$(e.currentTarget).closest("tr").addClass("unsaved")
    

  discardChanges: (e) ->
    $price = @$(e.currentTarget).closest("tr")
    @switchToView $price

  getAttrsFromPrice: ($price) ->
    priceDate = $price.find(".date-input").val()
    format = @app.polyglot.t("common.dates.formats.output")

    attrs = 
      date: moment(priceDate, format)
      price: Number $price.find(".price-input").val()

  refineAttrs: (attrs) ->
    attrs.date = attrs.date.toDate()
    attrs

  # Do the steps needed to update the $price.
  finishSave: ($price, model) ->
    $price.removeClass("unsaved")
    $price.find(".date-value").html moment(model.get("date")).format("LL")
    $price.find(".price-value").html model.get("price")
    @switchToView $price

    return unless model.existed()

    $price.attr("data-id", model.id)
    $price.attr("id", "price-#{model.id}")
    $price.removeClass(".price-new")
    $price.addClass(".price-existing")

  addToRelation: (models) ->
    @model.relation("prices").add models
    @model.increment pricesCount: models.count

  saveAll: (e) ->
    e.preventDefault()
    @$(".btn-primary").button("loading")

    list = []
    newModels = []

    $prices = @$(".unsaved")
    $prices.each (i, el) =>
      $price = @$(el)
      data = $price.data()
      model = @model.prices.get data.id or data.cid
      attrs = @refineAttrs(@getAttrsFromPrice($price))
      model.set attrs
      list.push model
      newModels.push model unless model.id

    return unless list.length > 0 

    options = 
      success: (models) => 
        @$(".btn-primary").button("reset")

        $prices.each (i, el) =>
          $price = @$(el)
          data = $price.data()
          model = @model.prices.get data.id or data.cid
          # If we don't have an id, it's new.
          @finishSave $price, model

        # Save the updated relation and count.
        if newModels.length > 0 
          @addToRelation newModels
          @model.save()
      error: @handleBadSave

    # Parse.Object.saveAll should only save changed models.
    Parse.Object.saveAll list, options

  toggleEditMode: (e) ->
    if @editMode
      @switchToView(@$prices)
      @editMode = false
    else
      @switchToEdit(@$prices)
      @editMode = true

  toggleDeleteMode: (e) ->
    if @deleteMode
      @$prices.find(".remove").addClass("hide")
      @deleteMode = false
    else
      @$prices.find(".remove").removeClass("hide")
      @deleteMode = true

  handleBadSave : (error) ->
    console.log error
    @$(".btn-primary").button("reset")
    msg = @app.polyglot.t("common.errors.unknown")
    @app.alert event: 'model-error', fade: true, message: msg, type: 'error'
  
module.exports.id = "issues/prices"
