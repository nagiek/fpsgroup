Base = require("./base")

module.exports = Base.extend "Issue",
  className: "Issue"
  url: -> "/issues/:objectId/:slug#{@app.lang.toUpperCase()}"

module.exports.id = "Issue"