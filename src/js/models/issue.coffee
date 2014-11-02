Base = require("./base")
# We need this in order to properly establish our relation.
Price = require("../models/price")

module.exports = Base.extend "Issue",
  className: "Issue"
  url: -> "/issues/:objectId/:slug#{@app.lang.toUpperCase()}"
  defaults:
  	pricesCount: 0

module.exports.id = "Issue"