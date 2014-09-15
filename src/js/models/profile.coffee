Base = require("./base")

module.exports = Base.extend "Profile",
  idAttribute: "objectId"
  
  className: "Profile"
  url: "/users/:objectId"

module.exports.id = "Profile"