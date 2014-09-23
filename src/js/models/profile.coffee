Base = require("./base")

module.exports = Base.extend "Profile",
  className: "Profile"
  url: "/users/:objectId"

module.exports.id = "Profile"