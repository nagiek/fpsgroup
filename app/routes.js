(function() {
  module.exports = function(match) {
    match("", "home#index");
    match("repos", "repos#index");
    match("repos/:owner/:name", "repos#show");
    match("issues", "issues#index");
    match("issues/new", "issues#new");
    match("issues/:objectId/:slugEN", "issues#show");
    match("issues/:objectId/:slugFR", "issues#show");
    match("issues/:objectId/:slugEN/edit", "issues#edit");
    match("issues/:objectId/:slugFR/edit", "issues#edit");
    match("issues/:objectId/:slugEN/prices", "issues#prices");
    match("issues/:objectId/:slugFR/prices", "issues#prices");
    match("users/:objectId", "profiles#show");
    match("users/:objectId/edit", "profiles#edit");
    match("account/settings", "users#settings");
    match("account/history", "users#history");
    match("account/login", "users#login");
    match("account/signup", "users#signup");
    return match("account/reset", "users#reset");
  };

}).call(this);
