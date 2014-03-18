Base = require("./base")
module.exports = Base.extend("Issue",
  url: "/issues/:name"
  idAttribute: "name"
)
module.exports.id = "Issue"