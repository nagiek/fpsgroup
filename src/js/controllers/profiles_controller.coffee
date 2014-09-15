module.exports =
  show: (params, callback) ->
    spec =
      model:
        model: "Profile"
        params: params

    @app.fetch spec, (err, result) ->
      callback err, result

  edit: (params, callback) ->
    spec =
      model:
        model: "Profile"
        params: params

    @app.fetch spec, (err, result) ->
      callback err, result