BaseView = require("../base")
Parse = require("parse").Parse

module.exports = BaseView.extend

  events:
    "submit form#login-form"  : "logIn"

  logIn: (e) =>
    e.preventDefault()
    @$("button.btn-primary").button "loading"
    @$(".has-error").removeClass 'has-error'
    email = @$("#login-username").val()
    password = @$("#login-password").val()
    Parse.User.logIn email, password,
      success: (user) =>
        @$("button.btn-primary").button "reset"
        @app.trigger "user:loginStart"

      error: (user, error) =>
        @$("button.btn-primary").button "reset"
        @$('.username-group').addClass('has-error')
        @$('.password-group').addClass('has-error')

        msg = switch error.code
          when Parse.Error.OTHER_CAUSE  then @app.polyglot.t("user.errors.fields_missing")
          else @app.polyglot.t("user.errors.invalid_login")
        
        @$(".alert-danger").html(msg).show()

module.exports.id = "users/login"