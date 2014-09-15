Base = require("./base")

module.exports = Base.extend "Issue",
  idAttribute: "objectId"
  
  className: "Issue"
  url: "/issues/:objectId/:slug"

module.exports.id = "Issue"