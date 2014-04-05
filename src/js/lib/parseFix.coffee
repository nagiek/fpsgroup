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
  self = this
  once = _.once(->
    self.off name, once
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

# Collection
# -------

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
    attrs = models[i]
    if attrs instanceof Parse.Object
      id = model = attrs
    else
      id = attrs[targetModel::idAttribute]
    
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
      
      # Listen to added models' events, and index models for lookup by
      # `id` and by `cid`.
      model.on "all", @_onModelEvent, this
      @_byId[model.cid] = model
      @_byId[model.id] = model  if model.id?
    order.push existing or model  if order
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