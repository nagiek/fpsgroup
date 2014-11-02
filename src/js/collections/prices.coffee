Price = require("../models/price")
Base = require("./base")
module.exports = Base.extend
  model: Price
  url: "/prices"

  comparator: (a) -> a.get("date") # if a.get("date") > b.get("date") then 1 else -1

module.exports.id = "prices"