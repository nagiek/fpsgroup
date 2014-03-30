(function() {
  var Base;

  Base = require("./base");

  module.exports = Base.extend("_User", {
    url: "/users/:login",
    idAttribute: "login"
  });

  module.exports.id = "User";

  module.exports.prototype.className = "_User";

}).call(this);
