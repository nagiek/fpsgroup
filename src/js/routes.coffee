module.exports = (match) ->
  match "",                   "home#index"
  match "repos",              "repos#index"
  match "repos/:owner/:name", "repos#show"
  match "issues",             "issues#index"
  match "issues/new",         "issues#new"
  match "issues/:name", 	  "issues#show"
  match "users",              "users#index"
  match "users/:login",       "users#show"
