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



# Query
# --------


# Modify to take an options object
_oldQuery = Parse.Query

Parse.Query = (objectClass, options) ->
  objectClass = Parse.Object._getSubclass(objectClass)  if _.isString(objectClass)
  @objectClass = objectClass
  @className = objectClass::className
  @_where = {}
  @_include = []
  @_limit = -1 # negative limit means, do not send a limit
  @_skip = 0
  @_extraOptions = {}

  # Options are not copied into the query, but extraOptions are.
  @options = options || {}
  @options.app = Parse.app
  return

# Copy over items. We cannot change the constructor, so do it this way.
_.extend Parse.Query, _oldQuery
_.extend Parse.Query::, _oldQuery::

###
Differences:
copy the options into the object being found.
###
Parse.Query::find = (options) ->
  self = this
  options = options or {}
  request = Parse._request(
    route: "classes"
    className: @className
    method: "GET"
    useMasterKey: options.useMasterKey
    data: @toJSON()
  )
  request.then((response) ->
    _.map response.results, (json) ->
      obj = undefined
      if response.className
        obj = new Parse.Object(response.className, self.options)
      else
        obj = new self.objectClass(null, self.options)
      obj._finishFetch json, true
      obj
  )._thenRunCallbacks options

###
Modify so that we copy the options into the object being found.
###
Parse.Query::first = (options) ->
  self = this
  options = options or {}
  params = @toJSON()
  params.limit = 1
  request = Parse._request(
    route: "classes"
    className: @className
    method: "GET"
    useMasterKey: options.useMasterKey
    data: params
  )
  request.then((response) ->
    _.map(response.results, (json) ->
      obj = new self.objectClass(null, self.options)
      obj._finishFetch json, true
      obj
    )[0]
  )._thenRunCallbacks options


# Object
# --------

###
A model is new if it has never been saved to the server, and lacks an id.
###
Parse.Object::isNew = -> !@has @idAttribute

Parse.Object._getSubclass = (className) ->
  throw "Parse.Object._getSubclass requires a string argument."  unless _.isString(className)
  ObjectClass = Parse.Object._classMap[className]
  unless ObjectClass
    ObjectClass = require("../models/#{className.toLowerCase()}")
    Parse.Object._classMap[className] = ObjectClass
  ObjectClass

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
# Parse.Collection::first = -> @at(0)
# Parse.Collection::last = -> @at(@length - 1)

### 
Make sure we pass in the collection to the model.
###
Parse.Collection::fetch = (options) ->
  options = _.clone(options) or {}
  options.parse = true  if options.parse is `undefined`
  collection = this
  query = @query or new Parse.Query(@model, collection: collection)
  query.find(useMasterKey: options.useMasterKey).then((results) ->
    if options.add
      collection.add results, options
    else
      collection.reset results, options
    collection
  )._thenRunCallbacks options, this

Parse.Collection::add = (models, options) ->
  @set models, _.extend(
    merge: false
  , options, addOptions)

# Update a collection by `set`-ing a new list of models, adding new ones,
# removing models that are no longer present, and merging models that
# already exist in the collection, as necessary. Similar to **Model#set**,
# the core operation for updating the data contained by the collection.
Parse.Collection::set = (models, options) ->
  options = _.defaults({}, options, setOptions)
  models = @parse(models, options)  if options.parse
  singular = not _.isArray(models)
  models = (if singular then ((if models then [models] else [])) else _.clone(models))
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


# Prepare a model or hash of attributes to be added to this collection.
# 
# @differences: purposefully create the model here, as we do not have a
# server model which we may be syncing in.
Parse.Collection::create = (attrs, options) ->
  options = (if options then _.clone(options) else {})
  options.collection = this
  options.app = @app

  model = new @model(attrs, options)
  @_prepareModel(model, options)
  return false unless model
  @add model, options  unless options.wait

  collection = this
  success = options.success
  options.success = (model, resp) ->
    collection.add model, options  if options.wait
    success model, resp, options  if success
    return

  model.save null, options
  model

# Prepare a model or hash of attributes to be added to this collection.
# 
# @differences: if we have a hash, assume we are syncing from server data.
Parse.Collection::_prepareModel = (model, options) ->
  unless model instanceof Parse.Object
    attrs = model
    options.collection = this
    options.app = @app
    model = new @model(null, options)
    if attrs isnt {} then model._finishFetch attrs, true
    return false unless model._validate({}, options)
  else model.collection = this  unless model.collection
  model this  unless model.collection
  model

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


# Parse.Relation
# --------------


# Allow the query to take options.
Parse.Relation::query = (options) ->
  options = options || {}
  unless @targetClassName
    targetClass = Parse.Object._getSubclass(@parent.className)
    query = new Parse.Query(targetClass, options)
    query._extraOptions.redirectClassNameForKey = @key
  else
    targetClass = Parse.Object._getSubclass(@targetClassName)
    query = new Parse.Query(targetClass, options)
  query._addCondition "$relatedTo", "object", @parent._toPointer()
  query._addCondition "$relatedTo", "key", @key
  query