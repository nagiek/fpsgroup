Base = require("./base")
module.exports = Base.extend("User",
  url: "/users/:login"
  idAttribute: "login"
)
module.exports.id = "User"