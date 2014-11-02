module.exports =
  index: (params, callback) ->
    spec = collection:
      collection: "Issues"
      params: params

    @app.fetch spec, (err, result) ->
      callback err, result

  new: (params, callback) ->

    spec =
      collection:
        collection: "Issues"
        params: params
      # model:
      #   model: "Issue"
      #   # Indicate that we want a new model with params: {}
      #   params: params

    @app.fetch spec, (err, result) =>
      result.model = @app.modelUtils.getModel "issue", {}, collection: result.collection, app: @app
      callback err, result
      
  edit: (params, callback) ->
    spec =
      model:
        model: "Issue"
        params: params
        id: params.objectId

    @app.fetch spec, (err, result) ->
      callback err, result
      
  prices: (params, callback) ->

    spec =
      model:
        model: "Issue"
        params: params
        id: params.objectId
      collection:
        collection: "Prices"
        relation:
          parent:
            className: "Issue"
            id: params.objectId
          key: "prices"
        params: params

    @app.fetch spec, (err, result) ->
      callback err, result

  show: (params, callback) ->
    spec =
      model:
        model: "Issue"
        params: params
        id: params.objectId

    @app.fetch spec, (err, result) ->
      callback err, result
