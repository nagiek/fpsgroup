BaseView    = require("../base")
Parse       = require("parse").Parse

module.exports = BaseView.extend

  tagName: "section"
  attributes: 
    id: "modals"

  initialize: ->
    @finalizeLogin = @finalizeLogin.bind(@)

  events:
    "submit form#login-modal-form"        : "logIn"
    "submit form#signup-modal-form"       : "signUp"
    "submit form#reset-password-form"     : "resetPassword"
    "click #switch-signup-modal"          : "switchToSignup"
    "click #switch-login-modal"           : "switchToLogin"
    "click #login-modal-form .reset-password-link" : "switchToResetPassword"

  postRender: ->
    # Use triggers, in case we login from a non-modal source.
    @listenTo @app, "user:loginStart", @startLogin

  startLogin: ->
    Parse.User.current().setup().then @finalizeLogin, @loginError

  finalizeLogin: ->
    @app.trigger "user:login"
    @app.trigger "user:change"

  loginError: (error) -> console.log error

  resetPassword: (e) ->
    e.preventDefault()
    @$("> #reset-password-modal button.btn-primary").button "loading"
    @$('> #reset-password-modal .has-error').removeClass('has-error')
    Parse.User.requestPasswordReset $("#reset-email").val(),
      success: =>
        @$('> #reset-password-modal').modal('hide')
        @$("> #reset-password-modal button.btn-primary").button "reset"
        msg = @app.polyglot.t("user.messages.password_reset")
        @app.alert event: 'reset-password', fade: true, message: msg
      error: (error) ->
        console.log error
        @$("> #reset-password-modal button.btn-primary").button "reset"
        msg = switch error.code
          when Parse.Error.INVALID_EMAIL_ADDRESS then @app.polyglot.t("user.errors.invalid_email_format")
          when Parse.Error.EMAIL_NOT_FOUND then @app.polyglot.t("user.errors.username_doesnt_exist")
          else error.message

        @$("#reset-email-modal-group").addClass('has-error')
        @app.alert event: 'reset-password', fade: false, message: msg, type: 'danger'

  logIn: (e) ->
    e.preventDefault()
    @$("> #login-modal #login-modal-form button.btn-primary").button "loading"
    @$("> #login-modal #login-modal-form .has-error").removeClass 'has-error'
    email = @$("#login-modal-username").val()
    password = @$("#login-modal-password").val()
    Parse.User.logIn email, password,
      success: (user) =>
        @$('> #login-modal').modal('hide')
        @$("> #login-modal #login-modal-form button.btn-primary").button "reset"
        @app.trigger "user:loginStart"

      error: (user, error) =>
        console.log error
        @$("> #login-modal #login-modal-form button.btn-primary").button "reset"
        @$('> #login-modal #login-modal-form .username-group').addClass('has-error')
        @$('> #login-modal #login-modal-form .password-group').addClass('has-error')

        msg = switch error.code
          when Parse.Error.OTHER_CAUSE   then @app.polyglot.t("user.errors.fields_missing")
          else @app.polyglot.t("user.errors.invalid_login")
        
        @$("> #login-modal #login-modal-form .alert-danger").html(msg).show()

  signUp: (e) ->
    console.log "signUp"
    e.preventDefault()
    @$("> #signup-modal #signup-modal-form button.btn-primary").button "loading"
    @$("> #signup-modal #signup-modal-form .has-error").removeClass 'has-error'
    email = @$("#signup-modal-username").val()
    password = @$("#signup-modal-password").val()
    Parse.User.signUp email, password, { email: email, ACL: new Parse.ACL() },
      success: (user) =>
        @$('> #signup-modal').modal('hide')
        @$("> #signup-modal #signup-modal-form button.btn-primary").button "reset"

        # I thought we could skip the user-setup phase, as we will not have 
        # anything to add and the only extra things were profile and notifications.
        # 
        # However, we have to query the notifications to see if 
        # we've been previously been invited to a property.
        # 
        # profile = user.get("profile")
        # profile.set "email", user.get("email")
        # 
        # Parse.User.current().set "profile", profile
        # Parse.User.current().notifications = new NotificationList

        @app.trigger "user:loginStart"

      error: (user, error) =>
        @$("> #signup-modal #signup-modal-form button.btn-primary").button "reset"
        msg = switch error.code
          when Parse.Error.INVALID_EMAIL_ADDRESS  then @app.polyglot.t("user.errors.invalid_email_format")
          when Parse.Error.USERNAME_TAKEN         then @app.polyglot.t("user.errors.username_taken")
          when Parse.Error.OTHER_CAUSE            then @app.polyglot.t("user.errors.fields_missing")
          else error.message

        switch error.code
          when Parse.Error.INVALID_EMAIL_ADDRESS or Parse.Error.USERNAME_TAKEN
            @$('.username-group').addClass('has-error')
          when Parse.Error.OTHER_CAUSE
            @$('> #signup-modal #signup-modal-form username-group').addClass('has-error')
            @$('> #signup-modal #signup-modal-form password-group').addClass('has-error')

        @$("> #signup-modal #signup-modal-form .alert-danger").html(msg).show()

  switchToSignup: (e) ->
    e.preventDefault()
    @$('> .modal.in').modal('hide')
    @$('> #signup-modal').modal()
    @$("#signup-modal-username").focus()
  switchToLogin: (e) ->
    e.preventDefault()
    @$('> .modal.in').modal('hide')
    @$('> #login-modal').modal()
    @$("#login-modal-username").focus()
  switchToResetPassword: (e) ->
    e.preventDefault()
    @$('> .modal.in').modal('hide')
    @$('> #reset-password-modal').modal()
    @$("#reset-modal-email").focus()

module.exports.id = "users/loggedoutmodals"