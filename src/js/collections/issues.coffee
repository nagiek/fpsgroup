Issue = require("../models/issue")
Base = require("./base")
module.exports = Base.extend(
  model: Issue
  url: "/issues"
)
module.exports.id = "issues"