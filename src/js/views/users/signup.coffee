BaseView = require("../base")
Parse = require("parse").Parse

module.exports = BaseView.extend

  events:
    "submit form#signup-form"  : "signUp"

  signUp: (e) =>
    e.preventDefault()
    @$("button.btn-primary").button "loading"
    @$(".has-error").removeClass 'has-error'
    email = @$("#signup-username").val()
    password = @$("#signup-password").val()
    user_type = if @$(".type-group :checked").prop('id') is 'signup-tenant' then 'tenant' else 'manager'
    Parse.User.signUp email, password, { user_type: user_type, email: email, ACL: new Parse.ACL() },
      success: (user) =>
        @$("button.btn-primary").button "reset"

        @app.trigger "user:loginStart"

      error: (user, error) =>
        @$("button.btn-primary").button "reset"
        msg = switch error.code
          when Parse.Error.INVALID_EMAIL_ADDRESS then @app.polyglot.t("user.errors.invalid_email_format")
          when Parse.Error.USERNAME_TAKEN        then @app.polyglot.t("user.errors.username_taken")
          when Parse.Error.OTHER_CAUSE           then @app.polyglot.t("user.errors.fields_missing")
          else error.message

        switch error.code
          when Parse.Error.INVALID_EMAIL_ADDRESS or Parse.Error.USERNAME_TAKEN
            @$('.username-group').addClass('has-error')
          when Parse.Error.OTHER_CAUSE
            @$('.username-group').addClass('has-error')
            @$('.password-group').addClass('has-error')

        @$(".alert-danger").html(msg).show()

module.exports.id = "users/signup"