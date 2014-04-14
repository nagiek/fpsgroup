Base = require("./base")
module.exports = Base.extend("Issue",
  url: "/issues/:title"
  idAttribute: "title"
)
module.exports.id = "Issue"
module.exports::className = "Issue";