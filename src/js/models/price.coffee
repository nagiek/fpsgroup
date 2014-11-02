Base = require("./base")

module.exports = Base.extend "Price",
  className: "Price"
  url: -> "/issues/:issue/*/:objectId"

module.exports.id = "Price"