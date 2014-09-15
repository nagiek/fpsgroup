module.exports = (match) ->
  match "",                             "home#index"
  match "repos",                        "repos#index"
  match "repos/:owner/:name",           "repos#show"

  match "issues",                       "issues#index"
  match "issues/new",                   "issues#new"
  match "issues/:objectId/:slug",       "issues#show"
  match "issues/:objectId/:slug/edit",  "issues#edit"

  match "users/:objectId",              "profiles#show"
  match "users/:objectId/edit",         "profiles#edit"

  match "account/settings",             "users#settings"
  match "account/history",              "users#history"
  match "account/login",                "users#login"
  match "account/signup",               "users#signup"
  match "account/reset",                "users#reset"
