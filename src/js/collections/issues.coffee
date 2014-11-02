Issue = require("../models/issue")
Base = require("./base")
module.exports = Base.extend
  model: Issue
  url: "/issues"
  defaults:
  	pricesCount: 0

module.exports.id = "issues"