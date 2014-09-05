Base = require("./base")

module.exports = Base.extend "Issue",
  idAttribute: "objectId"
  
  className: "Issue"
  defaults:
    title: "hello"
    slug: "hello"
  url: "/issues/:slug"

module.exports.id = "Issue"