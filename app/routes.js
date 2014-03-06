(function() {
  module.exports = function(match) {
    match("", "home#index");
    match("repos", "repos#index");
    match("repos/:owner/:name", "repos#show");
    match("users", "users#index");
    return match("users/:login", "users#show");
  };

}).call(this);
