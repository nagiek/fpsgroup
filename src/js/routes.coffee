module.exports = (match) ->
  match "",                             "home#index"
  match "repos",                        "repos#index"
  match "repos/:owner/:name",           "repos#show"

  match "issues",                       "issues#index"
  match "issues/new",                   "issues#new"
  match "issues/:objectId/:slug",       "issues#show"
  match "issues/:objectId/:slug/edit",  "issues#edit"

  match "users",                        "users#index"
  match "users/:login",                 "users#show"
