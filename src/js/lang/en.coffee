###
Translation strings for the entire site.
###

module.exports = 
            
  ## Common ##            
  # Classes           
  "common.classes.issues":                        "Issues"

  "common.actions.save":                          "Save"
  "common.actions.edit":                          "Edit"
  "common.actions.cancel":                        "Cancel"
  "common.actions.changes_saved":                 "Changes saved"
  
  "common.nouns.dates":                           "Dates"
  "common.nouns.history":                         "History"
  "common.nouns.codes":                           "Codes"
  
  "common.langs.EN":                              "EN"
  "common.langs.FR":                              "FR"
  "common.langs.english":                         "English"
  "common.langs.french":                          "French"
  
  "common.expressions.mark_read":                 "Mark read"
  "common.expressions.see_all":                   "See all"
  
  "common.conjuctions.and":                       "and"
  "common.conjuctions.or":                        "or"
  
  "common.dates.formats.medium":                  "MMM D, YYYY"
  "common.dates.formats.input":                   "yyyy-mm-dd"
  "common.dates.formats.output":                  "YYYY-MM-DD"
  
  "common.fields.title":                          "Title"
  "common.fields.body":                           "Body"
  "common.fields.email":                          "Email"
  "common.fields.phone":                          "Phone"
  "common.fields.website":                        "Website"
  "common.fields.status":                         "Status"
  "common.fields.name":                           "Name"
  "common.fields.posted":                         "Posted"
  "common.fields.posted_at":                      "Posted at"
          
  
  ## Issues ##              
  "issue.meta.className":                         "Issue"
  "issue.meta.className_plural":                  "Issues"
  "issues.actions.new_issue":		                  "New Issue"
  "issue.fields.issuanceDate":                    "Issuance Date"
  "issue.fields.maturityDate":                    "Maturity Date"
  "issue.fields.fundservCode":                    "FundSERV Code"
  "issue.fields.ismCode":                         "ISM Code"
  "issue.form.title_help":                        "Put in a good title"
  "issue.menu.add_new_issue":                     "Add new issue"
  "issue.menu.edit_issue":                        "Edit issue"


  ## Users ##            
  "user.actions.signin":                          "Sign in"
  "user.actions.signup":                          "Sign up"
  "user.actions.logout":                          "Log out"
  "user.actions.login":                           "Login"
  "user.actions.reset_password":                  "Reset password"
  "user.actions.forgot_your_password":            "Forgot your password?"
  "user.actions.missing_confirmation":            "Didn't receive confirmation instructions?"
  "user.actions.missing_unlock":                  "Didn't receive unlock instructions?"
  "user.actions.sign_in_with_email":              "Sign in with email"
  "user.actions.sign_up_with_email":              "Sign up with email"
  "user.actions.change_password":                 "Change my password"
  "user.actions.confirm_account":                 "Confirm my account"
  "user.actions.resend_unlock_instructions":      "Resend unlock instructions"
  "user.actions.unlock_account":                  "Unlock my account"
  "user.actions.back_to_profile":                 "Back to profile"
  "user.actions.switch_signup":                   "Don't have an account?"
  "user.actions.switch_login":                    "Already have an account?"
  
  "user.menu.view_profile":                       "Profile"
  "user.menu.edit_profile":                       "Edit profile"
  "user.menu.edit_my_profile":                    "Edit my profile"
  "user.menu.account":                            "Account"
  "user.menu.privacy":                            "Privacy"
  "user.menu.apps":                               "Apps"
  "user.menu.find_friends":                       "Find friends"
  "user.menu.connect_to_continue":                "Connect to continue"
  "user.menu.account_settings":                   "Account settings"
  "user.menu.privacy_settings":                   "Privacy settings"
  "user.menu.profile_menu":                       "Profile menu"

  "user.fields.name":                             "Name"
  "user.fields.first_name":                       "First Name"
  "user.fields.last_name":                        "Last Name"
  "user.fields.bio":                              "Bio"
  "user.fields.website":                          "Website"
  "user.fields.phone":                            "Phone"
  "user.fields.gender.label":                     "Gender"
  "user.fields.gender.male":                      "Male"
  "user.fields.gender.female":                    "Female"
  "user.fields.birthday":                         "Birthday"
  "user.fields.avatar":                           "Picture"

  "user.form.email":                              "Email"
  "user.form.password":                           "Password"
  "user.form.password_change_hint":               "Leave blank if you don't want to change it"
  "user.form.password_required":                  "We need your current password to change either your email or your password."
  "user.form.password_current_hint":              "We need your current password to confirm your changes"
  "user.form.cancel_account":                     "Cancel my account"
  "user.form.cancel_account_instructions":        "Unhappy? %{href}"
  "user.form.new_password":                       "New password"
  "user.form.new_password_confirm":               "Confirm new password"
  "user.form.send_instructions":                  "Send instructions"
  "user.form.instructions_to_email":              "Instructions to change your password will be emailed to you."

  "user.messages.password_reset":                 "We have sent a link to reset your password to your email"

  "user.errors.logged_in":                        "You must be logged in to do that."
  "user.errors.invalid_birthday":                 "You did not enter a correct birthday."
  "user.errors.username_doesnt_exist":            "We don't have that email in our system. Why not sign up?"
  "user.errors.username_taken":                   "That email is in use. Have you forgotten your password?"
  "user.errors.fields_missing":                   "You must enter a username and password."
  "user.errors.invalid_login":                    "Invalid email or password. Please try again."
  "user.errors.invalid_email":                    "Please enter a valid email address."
  "user.errors.invalid_email_format":             "Please enter a valid email address."
  "user.errors.missing_password":                 "You must enter your password to make changes."
  "user.errors.invalid_login_parameters":         "You have entered an incorrect email or password."
  "user.errors.missing_passwords":                "You must confirm your password to change it."
  "user.errors.unmatching_passwords":             "The passwords you entered do not match."

  # mailing
  "mailer.general.greeting":                      "Hello %{name}"
  "mailer.general.welcome":                       "Welcome %{person}!"
  "mailer.reset_password.explanation":            "Someone has requested a link to change your password. You can do this through the link below."
  "mailer.reset_password.ignore_if":              "If you didn't request this, please ignore this email."
  "mailer.reset_password.reassurance":            "Your password won't change until you access the link above and create a new one."
  "mailer.confirm.explanation":                   "You can confirm your account email through the link below:"
  "mailer.unlock.explanation":                    "Your account has been locked due to an excessive number of unsuccessful sign in attempts."
  "mailer.unlock.link_explanation":               "Click the link below to unlock your account:"