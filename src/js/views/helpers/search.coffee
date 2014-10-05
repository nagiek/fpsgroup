BaseView = require("../base")
_ = require("underscore")
Parse = require("parse").Parse

module.exports = BaseView.extend
  className: "helpers_search_view"

  events:
    'submit form': 'doNothing'

  # typeahead widget takes care of navigation.
  doNothing : (e) -> e.preventDefault()

  postRender : ->

    # Bloodhound = require("../../lib/bloodhound")
    require("../../lib/typeahead.bundle.min")

    issueFilter = (parsedResponse) ->
      return [] if parsedResponse.results.length is 0
      _.map parsedResponse.results, (p) ->
        value: p["title" + lang]
        url: "/issues/#{p.objectId}/#{p['slug' + lang]}"
        objectId: p.objectId
        tokens: [].concat p["title" + lang].split(/\s+/), [p.fundSERVCode, p.ISMCode]

    lang = @app.lang.toUpperCase()

    Bloodhound = window.Bloodhound

    issuesBloodhound = new Bloodhound
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value")
      queryTokenizer: Bloodhound.tokenizers.whitespace
      dupDetector: (remoteMatch, localMatch) -> remoteMatch.objectId is localMatch.objectId
      prefetch:
        url: "https://api.parse.com/1/classes/Issue?limit=50&order=-issuanceDate"
        filter: issueFilter
      remote:
        url: "https://api.parse.com/1/classes/Issue?where="
        filter: issueFilter
        replace: (url, uriEncodedQuery) ->
          # Do not use "$options":"i", as it takes longer.
          if /^[vV][0-9]*/.test uriEncodedQuery
            url += encodeURIComponent(JSON.stringify({"ismCode":{"$regex":"^#{uriEncodedQuery.toUpperCase()}"}}))
          else if /[(NBC)(nbc)][0-9]*/.test uriEncodedQuery
            url += encodeURIComponent(JSON.stringify({"fundservCode":{"$regex":"^#{uriEncodedQuery.toUpperCase()}"}}))
          else if /\s+/.test uriEncodedQuery
            # if we have spaces
            searchString = uriEncodedQuery.replace(/'/g, '"').split(/\s+/).join('","')
            url += encodeURIComponent(JSON.stringify({"search":{"$in":["#{searchString}"]}}))
          else
            if lang is "EN"
              url += encodeURIComponent(JSON.stringify({"titleEN":{"$regex":uriEncodedQuery}}))
            else 
              url += encodeURIComponent(JSON.stringify({"titleFR":{"$regex":uriEncodedQuery}}))



    issuesBloodhound.initialize()
    datasets = [
      name: "issues"
      source: issuesBloodhound.ttAdapter()
      templates:
        header: "<span class='dropdown-header'>#{@app.polyglot.t('common.classes.issues')}</span>"
        empty: """
                <span class='tt-suggestion'><span class='tt-empty'>
                  #{@app.polyglot.t('issue.search.empty')}
                </span></span>
               """
        suggestion: _.template  """
                                <a href="<%= url %>">
                                  <span class="label label-info label-lg">AC</span>
                                  <strong><%= value %></strong>
                                </a>
                                """
    ]

    @$('input').typeahead 
      highlight: true
      autoselect: true
      datasets

    # Go to the selected option.
    @$('input').on 'typeahead:selected', (event, raw, datasetName) -> 
      if raw.url then Parse.history.navigate raw.url, true

    @listenTo Parse.history, "route", (router, route, params) => @$('input').typeahead("val", "")

  undelegateEvents: ->
    # Call `super`.
    BaseView.prototype.undelegateEvents.call(this)
    @$('input').off "typeahead:selected"


module.exports.id = "helpers/search"