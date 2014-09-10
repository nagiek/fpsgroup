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

    @app.fetch spec, (err, result) =>
      result.model = @app.modelUtils.getModel "issue"
      callback err, result
      
  edit: (params, callback) ->
    spec =
      model:
        model: "Issue"
        params: params

      collection:
        collection: "Issues"

    @app.fetch spec, (err, result) ->
      callback err, result

  show: (params, callback) ->
    spec =
      model:
        model: "Issue"
        params: params

    @app.fetch spec, (err, result) ->
      callback err, result
