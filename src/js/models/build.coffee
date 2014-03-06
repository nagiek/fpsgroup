Base = require("./base")
module.exports = Base.extend("Build",
  url: "/repos/:owner/:name"
  api: "travis-ci"
)
module.exports.id = "Build"