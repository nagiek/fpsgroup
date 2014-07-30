Base = require("./base")
module.exports = Base.extend "Issue",
  url: "/issues/:slug"

module.exports.id = "Issue"
module.exports::className = "Issue";