module.exports =
  index: (params, callback) ->
    spec = collection:
      collection: "Issues"
      params: params

    @app.fetch spec, (err, result) ->
      callback err, result
      return

    return

  show: (params, callback) ->
    spec =
      model:
        model: "Issue"
        params: params
        ensureKeys: [
          "language"
          "watchers_count"
        ]

      build:
        model: "Build"
        params: params

    @app.fetch spec, (err, result) ->
      callback err, result
      return

    return