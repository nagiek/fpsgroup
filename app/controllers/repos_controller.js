(function() {
  module.exports = {
    index: function(params, callback) {
      var spec;
      spec = {
        collection: {
          collection: "Repos",
          params: params
        }
      };
      this.app.fetch(spec, function(err, result) {
        callback(err, result);
      });
    },
    show: function(params, callback) {
      var spec;
      spec = {
        model: {
          model: "Repo",
          params: params,
          ensureKeys: ["language", "watchers_count"]
        },
        build: {
          model: "Build",
          params: params
        }
      };
      this.app.fetch(spec, function(err, result) {
        callback(err, result);
      });
    }
  };

}).call(this);
