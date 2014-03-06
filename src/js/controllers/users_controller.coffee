_ = require("underscore")
module.exports =
  index: (params, callback) ->
    spec = collection:
      collection: "Users"
      params: params

    @app.fetch spec, (err, result) ->
      callback err, result
      return

    return

  show: (params, callback) ->
    spec =
      model:
        model: "User"
        params: params

      repos:
        collection: "Repos"
        params:
          user: params.login

    @app.fetch spec, (err, result) ->
      callback err, result
      return

    return