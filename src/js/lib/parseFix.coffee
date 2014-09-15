###
Fixes for Parse.
###

Parse = require("parse").Parse
_ = require("underscore")

module.exports = Parse

# Events
# ---------

# # Regular expression used to split event strings.
eventSplitter = /\s+/

# Implement fancy features of the Events API such as multiple event
# names `"change blur"` and jQuery-style event maps `{change: action}`
# in terms of the existing API.
eventsApi = (obj, action, name, rest) ->
  return true  unless name
  
  # Handle event maps.
  if typeof name is "object"
    for key of name
      obj[action].apply obj, [key, name[key]].concat(rest)
    return false
  
  # Handle space separated event names.
  if eventSplitter.test(name)
    names = name.split(eventSplitter)
    i = 0
    l = names.length

    while i < l
      obj[action].apply obj, [names[i]].concat(rest)
      i++
    return false
  true


# Add missing Parse Events
Parse.Events.once = (name, callback, context) ->
  return this  if not eventsApi(this, "once", name, [callback, context]) or not callback
  once = _.once(=>
    @off name, once
    callback.apply this, arguments
  )
  once._callback = callback
  @on name, once, context

Parse.Object::once = Parse.Events.once
Parse.View::once = Parse.Events.once
Parse.Collection::once = Parse.Events.once

# Add Listen functionality.

# Inversion-of-control versions of `on` and `once`. Tell *this* object to
# listen to an event in another object ... keeping track of what it's
# listening to.
listenMethods =
  listenTo: "on"
  listenToOnce: "once"
listenEvents = {}

_.each listenMethods, (implementation, method) ->
  listenEvents[method] = (obj, name, callback) ->
    listeners = @_listeners or (@_listeners = {})
    id = obj._listenerId or (obj._listenerId = _.uniqueId("l"))
    listeners[id] = obj
    callback = @  if typeof name is "object"
    obj[implementation] name, callback, @
    @

listenEvents.stopListening = (obj, name, callback) ->
  listeners = @_listeners
  return @  unless listeners
  deleteListener = not name and not callback
  callback = @  if typeof name is "object"
  (listeners = {})[obj._listenerId] = obj  if obj
  for id of listeners
    listeners[id].off name, callback, @
    delete @_listeners[id]  if deleteListener
  @

_.extend Parse.Router.prototype, listenEvents
_.extend Parse.View.prototype, listenEvents
_.extend Parse.Object.prototype, listenEvents

# View
# -------

# Remove this view by taking the element out of the DOM, and removing any
# applicable Backbone.Events listeners.
Parse.View::remove = ->
  @$el.remove()
  @stopListening()
  @


# User
# --------

###
Return the current user, but only if we're on the client.
Logging in to the server is not allowed.
###
oldParseUserCurrent = Parse.User.current
Parse.User.current = ->
  if Parse._isNode then return null
  oldParseUserCurrent()

###
Run all activites to set up the current user.
###
Parse.User::setup = ->
  new Parse.Query("_User")
  .include('profile')
  .equalTo("objectId", @id)
  .first().then (user) => 

    profile = user.get "profile"

    unless profile
      error = new Parse.Error "no_profile", "No matching profile was found"
      return Parse.Promise.error error

    @set "profile", profile 

    # Return a promise, to maintain API
    Parse.Promise.as @
  , ->
    error = new Parse.Error "no_profile", "No matching profile was found"
    return Parse.Promise.error error


# Object
# --------

###
A model is new if it has never been saved to the server, and lacks an id.
###
Parse.Object::isNew = -> !@has @idAttribute

###
Pulls "special" fields like objectId, createdAt, etc. out of attrs
and puts them on "this" directly.  Removes them from attrs.
@param attrs - A dictionary with the data for this Parse.Object.
###
# Parse.Object::_mergeMagicFields = (attrs) ->
  
#   # Check for changes of magic fields.
#   model = this
#   specialFields = [
#     "createdAt"
#     "updatedAt"
#   ]
#   Parse._arrayEach specialFields, (attr) ->
#     if attrs[attr] and not _.isDate(attrs[attr])
#       model[attr] = Parse._parseDate(attrs[attr])
#       # While they may be useful, Parse.com fails if you send these fields via a PUT request.
#       delete attrs[attr]

###
Sets a hash of model attributes on the object, firing
<code>"change"</code> unless you choose to silence it.

<p>You can call it with an object containing keys and values, or with one
key and value.  For example:<pre>
gameTurn.set({
player: player1,
diceRoll: 2
}, {
error: function(gameTurnAgain, error) {
// The set failed validation.
}
});

game.set("currentPlayer", player2, {
error: function(gameTurnAgain, error) {
// The set failed validation.
}
});

game.set("finished", true);</pre></p>

@param {String} key The key to set.
@param {} value The value to give it.
@param {Object} options A set of Backbone-like options for the set.
The only supported options are <code>silent</code>,
<code>error</code>, and <code>promise</code>.
@return {Boolean} true if the set succeeded.
@see Parse.Object#validate
@see Parse.Error
###
# Parse.Object::set = (key, val, options) ->
#   attr = undefined
#   attrs = undefined
#   unset = undefined
#   changes = undefined
#   silent = undefined
#   changing = undefined
#   prev = undefined
#   current = undefined
#   return this  unless key?
  
#   # Handle both `"key", value` and `{key: value}` -style arguments.
#   if typeof key is "object"
#     attrs = key
#     options = val
#   else
#     (attrs = {})[key] = val
#   options or (options = {})
  
#   # Run validation.
#   return false  unless @_validate(attrs, options)

#   @_mergeMagicFields attrs
  
#   options.changes = {}
#   escaped = @_escapedAttributes
#   prev = @_previousAttributes or {}

#   # Update attributes.
#   Parse._arrayEach _.keys(attrs), (attr) =>
#     val = attrs[attr]
    
#     # If this is a relation object we need to set the parent correctly,
#     # since the location where it was parsed does not have access to
#     # this object.
#     val.parent = this  if val instanceof Parse.Relation
#     val = new Parse.Op.Set(val)  unless val instanceof Parse.Op
    
#     # See if this change will actually have any effect.
#     isRealChange = true
#     isRealChange = false  if val instanceof Parse.Op.Set and _.isEqual(@attributes[attr], val.value)
#     if isRealChange
#       delete escaped[attr]

#       if options.silent
#         @_silent[attr] = true
#       else
#         options.changes[attr] = true
#     currentChanges = _.last(@_opSetQueue)
#     currentChanges[attr] = val._mergeWithPrevious(currentChanges[attr])
#     @_rebuildEstimatedDataForKey attr
#     if isRealChange
#       @changed[attr] = @attributes[attr]
#       @_pending[attr] = true  unless options.silent
#     else
#       delete @changed[attr]
#       delete @_pending[attr]
#     return

#   @change options  unless options.silent
#   this



###*
  Set a hash of model attributes, and save the model to the server.
  updatedAt will be updated when the request returns.
  You can either call it as:<pre>
  object.save();</pre>
  or<pre>
  object.save(null, options);</pre>
  or<pre>
  object.save(attrs, options);</pre>
  or<pre>
  object.save(key, value, options);</pre>

  For example, <pre>
  gameTurn.save({
  player: "Jake Cutter",
  diceRoll: 2
  }, {
  success: function(gameTurnAgain) {
  // The save was successful.
  },
  error: function(gameTurnAgain, error) {
  // The save failed.  Error is an instance of Parse.Error.
  }
  });</pre>
  or with promises:<pre>
  gameTurn.save({
  player: "Jake Cutter",
  diceRoll: 2
  }).then(function(gameTurnAgain) {
  // The save was successful.
  }, function(error) {
  // The save failed.  Error is an instance of Parse.Error.
  });</pre>

  @param {Object} options A Backbone-style callback object.
  Valid options are:<ul>
  <li>wait: Set to true to wait for the server to confirm a successful
  save before modifying the attributes on the object.
  <li>silent: Set to true to avoid firing the `set` event.
  <li>success: A Backbone-style success callback.
  <li>error: An Backbone-style error callback.
  <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
  be used for this request.
  </ul>
  @return {Parse.Promise} A promise that is fulfilled when the save
  completes.
  @see Parse.Error
###
# Parse.Object::save = (arg1, arg2, arg3) ->
#   i = undefined
#   attrs = undefined
#   current = undefined
#   options = undefined
#   saved = undefined
#   if _.isObject(arg1) or Parse._isNullOrUndefined(arg1)
#     attrs = arg1
#     options = arg2
#   else
#     attrs = {}
#     attrs[arg1] = arg2
#     options = arg3
  
#   # Make save({ success: function() {} }) work.
#   if not options and attrs
#     extra_keys = _.reject(attrs, (value, key) ->
#       _.include [
#         "success"
#         "error"
#         "wait"
#       ], key
#     )
#     if extra_keys.length is 0
#       all_functions = true
#       all_functions = false  if _.has(attrs, "success") and not _.isFunction(attrs.success)
#       all_functions = false  if _.has(attrs, "error") and not _.isFunction(attrs.error)
      
#       # This attrs object looks like it's really an options object,
#       # and there's no other options object, so let's just use it.
#       return @save(null, attrs)  if all_functions
#   options = _.clone(options) or {}
#   current = _.clone(@attributes)  if options.wait
#   setOptions = _.clone(options) or {}
#   setOptions.silent = true  if setOptions.wait
#   setError = undefined
#   setOptions.error = (model, error) ->
#     setError = error
#     return

#   return Parse.Promise.error(setError)._thenRunCallbacks(options, this)  if attrs and not @set(attrs, setOptions)
#   model = this
  
#   # If there is any unsaved child, save it first.
#   model._refreshCache()
  
#   # TODO(klimt): Refactor this so that the save starts now, not later.
#   unsavedChildren = []
#   unsavedFiles = []
#   Parse.Object._findUnsavedChildren model.attributes, unsavedChildren, unsavedFiles
#   if unsavedChildren.length + unsavedFiles.length > 0
#     return Parse.Object._deepSaveAsync(@attributes,
#       useMasterKey: options.useMasterKey
#     ).then(->
#       model.save null, options
#     , (error) ->
#       Parse.Promise.error(error)._thenRunCallbacks options, model
#     )
#   @_startSave()
#   @_saving = (@_saving or 0) + 1
#   @_allPreviousSaves = @_allPreviousSaves or Parse.Promise.as()
#   @_allPreviousSaves = @_allPreviousSaves._continueWith(->
#     method = (if model.id then "PUT" else "POST")
#     json = model._getSaveJSON()
#     route = "classes"
#     className = model.className
#     if model.className is "_User" and not model.id
      
#       # Special-case user sign-up.
#       route = "users"
#       className = null
#     request = Parse._request(
#       route: route
#       className: className
#       objectId: model.id
#       method: method
#       useMasterKey: options.useMasterKey
#       data: json
#     )
#     request = request.then((resp, status, xhr) ->
#       serverAttrs = model.parse(resp, status, xhr)
#       serverAttrs = _.extend(attrs or {}, serverAttrs)  if options.wait
#       model._finishSave serverAttrs
#       model.set current, setOptions  if options.wait
#       model
#     , (error) ->
#       model._cancelSave()
#       Parse.Promise.error error
#     )._thenRunCallbacks(options, model)
#     request
#   )
#   @_allPreviousSaves

# Collection
# --------

# Default options for `Collection#set`.
setOptions =
  add: true
  remove: true
  merge: true

addOptions =
  add: true
  remove: false

# Add missing countBy method.
Parse.Collection::countBy = -> _.countBy.apply _, [this.models].concat(_.toArray(arguments))

Parse.Collection::add = (models, options) ->
  @set models, _.extend(
    merge: false
  , options, addOptions)

# Update a collection by `set`-ing a new list of models, adding new ones,
# removing models that are no longer present, and merging models that
# already exist in the collection, as necessary. Similar to **Model#set**,
# the core operation for updating the data contained by the collection.
Parse.Collection::# Update a collection by `set`-ing a new list of models, adding new ones,
# removing models that are no longer present, and merging models that
# already exist in the collection, as necessary. Similar to **Model#set**,
# the core operation for updating the data contained by the collection.
Parse.Collection::set = (models, options) ->
  options = _.defaults({}, options, setOptions)
  models = @parse(models, options)  if options.parse
  singular = not _.isArray(models)
  models = (if singular then ((if models then [models] else [])) else _.clone(models))
  i = undefined
  l = undefined
  id = undefined
  model = undefined
  attrs = undefined
  existing = undefined
  sort = undefined
  at = options.at
  targetModel = @model
  sortable = @comparator and (not (at?)) and options.sort isnt false
  sortAttr = (if _.isString(@comparator) then @comparator else null)
  toAdd = []
  toRemove = []
  modelMap = {}
  add = options.add
  merge = options.merge
  remove = options.remove
  order = (if not sortable and add and remove then [] else false)
  
  # Turn bare objects into model references, and prevent invalid models
  # from being added.
  i = 0
  l = models.length

  while i < l
    attrs = models[i] or {}
    if attrs instanceof Parse.Object
      id = model = attrs
    else
      id = attrs[targetModel::idAttribute or "id"]
    
    # If a duplicate is found, prevent it from being added and
    # optionally merge it into the existing model.
    if existing = @get(id)
      modelMap[existing.cid] = true  if remove
      if merge
        attrs = (if attrs is model then model.attributes else attrs)
        attrs = existing.parse(attrs, options)  if options.parse
        existing.set attrs, options
        sort = true  if sortable and not sort and existing.hasChanged(sortAttr)
      models[i] = existing
    
    # If this is a new, valid model, push it to the `toAdd` list.
    else if add
      model = models[i] = @_prepareModel(attrs, options)
      continue  unless model
      toAdd.push model
      @_addReference model, options
    
    # Do not add multiple models with the same `id`.
    model = existing or model
    order.push model  if order and (model.isNew() or not modelMap[model.id])
    modelMap[model.id] = true
    i++
  
  # Remove nonexistent models if appropriate.
  if remove
    i = 0
    l = @length

    while i < l
      toRemove.push model  unless modelMap[(model = @models[i]).cid]
      ++i
    @remove toRemove, options  if toRemove.length
  
  # See if sorting is needed, update `length` and splice in new models.
  if toAdd.length or (order and order.length)
    sort = true  if sortable
    @length += toAdd.length
    if at?
      i = 0
      l = toAdd.length

      while i < l
        @models.splice at + i, 0, toAdd[i]
        i++
    else
      @models.length = 0  if order
      orderedModels = order or toAdd
      i = 0
      l = orderedModels.length

      while i < l
        @models.push orderedModels[i]
        i++
  
  # Silently sort the collection if appropriate.
  @sort silent: true  if sort
  
  # Unless silenced, it's time to fire all appropriate add/sort events.
  unless options.silent
    i = 0
    l = toAdd.length

    while i < l
      (model = toAdd[i]).trigger "add", model, this, options
      i++
    @trigger "sort", this, options  if sort or (order and order.length)
  
  # Return the added (or merged) model (or models).
  (if singular then models[0] else models)

# When you have more items than you want to add or remove individually,
# you can reset the entire set with a new list of models, without firing
# any granular `add` or `remove` events. Fires `reset` when finished.
# Useful for bulk operations and optimizations.
Parse.Collection::reset = (models, options) ->
  options or (options = {})
  i = 0
  l = @models.length

  while i < l
    @_removeReference @models[i], options
    i++
  options.previousModels = @models
  @_reset()
  models = @add(models, _.extend(
    silent: true
  , options))
  @trigger "reset", this, options  unless options.silent
  models

# Internal method to create a model's ties to a collection.
Parse.Collection::_addReference = (model, options) ->
  @_byId[model.cid] = model
  @_byId[model.id] = model  if model.id?
  model.collection = this  unless model.collection
  model.on "all", @_onModelEvent, this
  return

# Internal method to sever a model's ties to a collection.
Parse.Collection::_removeReference = (model, options) ->
  delete model.collection  if this is model.collection
  model.off "all", @_onModelEvent, this
  return

# Internal method called every time a model in the set fires an event.
# Sets need to update their indexes when models change ids. All other
# events simply proxy through. "add" and "remove" events that originate
# in other collections are ignored.
# Parse.Collection::_onModelEvent = (event, model, collection, options) ->
#   return  if (event is "add" or event is "remove") and collection isnt this
#   @remove model, options  if event is "destroy"
#   if model and event is "change:" + model.idAttribute
#     delete @_byId[model.previous(model.idAttribute)]

#     @_byId[model.id] = model  if model.id?
#   @trigger.apply this, arguments