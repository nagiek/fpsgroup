Base = require("./base")
module.exports = Base.extend("Repo",
  url: "/repos/:owner/:name"
  idAttribute: "name"
)
module.exports.id = "Repo"