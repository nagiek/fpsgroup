BaseView = require("../base")
Parse = require("parse").Parse

module.exports = BaseView.extend

  events:
    "submit form#reset-password-form"     : "resetPassword"

  resetPassword: (e) =>
    e.preventDefault()
    @$("button.btn-primary").button "loading"
    @$('.has-error').removeClass('has-error')
    Parse.User.requestPasswordReset $("#reset-email").val(),
      success: =>
        msg = @app.polyglot.t("user.messages.password_reset")
        @app.alert event: 'reset-password', fade: true, message: msg
        
        @$("button.btn-primary").button "reset"
      error: (error) =>
        msg = switch error.code
          when Parse.Error.INVALID_EMAIL_ADDRESS then @app.polyglot.t("user.errors.invalid_email_format")
          when Parse.Error.EMAIL_NOT_FOUND       then @app.polyglot.t("user.errors.username_doesnt_exist")
          else error.message
          
        @$("button.btn-primary").button "reset"
        @$("#reset-email-group").addClass('has-error')
        @app.alert event: 'reset-password', fade: false, message: msg, type: 'danger'

module.exports.id = "users/reset"