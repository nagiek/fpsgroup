BaseView = require("../base")
moment = require("moment")
Issue = require("../../models/issue")

module.exports = BaseView.extend
  className: "issues_new_view"

  el: '.content'
    
  events:
    'submit form'                 : 'save'
    
  initialize : (attrs) ->

    @model = new Issue() unless @model

    @listenTo @model, 'invalid', (error) =>
      console.log error
      @$('button.save').button "reset"

      msg = i18nCommon.errors.unknown

  save : (e) ->
    e.preventDefault()
    
    @$('button.save').button "loading"
    data = @$('form').serializeJSON()

    console.log data

    @$('.has-error').removeClass('has-error')

    # Massage the Only-String data from serializeJSON()
    data.issue.rent = 0 if data.issue.rent is '' or data.issue.rent is '0'
    data.issue.rent = Number data.issue.rent if data.issue.rent

    for attr in ['start_date', 'end_date']
      # Instead of "ll", might have to use "moment.langData().longDateFormat()"
      data.issue[attr] = moment(data.issue[attr], "ll").toDate() unless data.issue[attr] is ''
      data.issue[attr] = new Date if typeof data.issue[attr] is 'string'
    
    attrs = data.issue

    @model.save attrs,
      success: (model) => 
        @trigger "save:success", model, newUnit
      error: (model, error) => 
        @model.trigger "invalid", error

  getTemplateData: ->
    data = BaseView::getTemplateData.call(this)
    data.build = @options.build.toJSON()
    data

module.exports.id = "issues/new"