module.exports = function(Handlebars) {

var templates = {};

templates["helper/alert"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return " alert-dismissable";
  }

function program3(depth0,data) {
  
  
  return "<button type=\"button\" class=\"close pull-right\" data-dismiss=\"alert\">&times;</button>";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<h4 class=\"alert-heading\">";
  if (stack1 = helpers.heading) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.heading; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p class=\"message\">";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p class=\"buttons\">";
  if (stack1 = helpers.buttons) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.buttons; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>";
  return buffer;
  }

  buffer += "<div id=\"alert-";
  if (stack1 = helpers.event) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.event; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"alert alert-";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = helpers['if'].call(depth0, depth0.dismiss, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " fade in\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.dismiss, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.heading, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.message, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.buttons, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h1 id=\"welcome-to-github-browser-\">Welcome to GitHub Browser!</h1>\n<p>This is a little app that demonstrates how to use Rendr by consuming GitHub's public Api.</p>\n<p>Check out <a href=\"/repos\">Repos</a> or <a href=\"/users\">Users</a>.</p>\n<p>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.copyright || depth0.copyright),stack1 ? stack1.call(depth0, "2013", options) : helperMissing.call(depth0, "copyright", "2013", options)))
    + "</p>\n";
  return buffer;
  });

templates["issues/form"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<!-- form-xlarge -->\n<fieldset>\n  <div class=\"form-group title-group\">\n    <label for=\"issue-title\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.fields.title", options) : helperMissing.call(depth0, "__", "issue.fields.title", options)))
    + "</label>\n    <div class=\"col-sm-10 col-md-8\">\n      <input type=\"text\" class=\"form-control input-lg\" name=\"issue[title]\" id=\"issue-title\" maxlength=\"128\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.issue),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.fields.title", options) : helperMissing.call(depth0, "__", "issue.fields.title", options)))
    + "\" required=\"required\" />\n      <p class=\"help-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.form.title_help", options) : helperMissing.call(depth0, "__", "issue.form.title_help", options)))
    + "</p>\n    </div>\n  </div>\n</fieldset>";
  return buffer;
  });

templates["issues/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <li>\n    <a href=\"/issues/"
    + escapeExpression(((stack1 = ((stack1 = depth0.data),stack1 == null || stack1 === false ? stack1 : stack1.longName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  if (stack2 = helpers.datalongName) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.datalongName; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</a>, by <a href=\"/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n  </li>\n";
  return buffer;
  }

  buffer += "<header>\n  <ul class=\"list-inline right-sm\">\n    <li>\n      <a href=\"/issues/new\" id=\"new-issue-link\" class=\"btn btn-success\">\n        <span class=\"glyphicon glyphicon-plus\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issues.actions.new_issue", options) : helperMissing.call(depth0, "__", "issues.actions.new_issue", options)))
    + "\n      </a>\n    </li>\n  </ul>\n  <h1 class=\"left-sm\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.meta.className_plural", options) : helperMissing.call(depth0, "__", "issue.meta.className_plural", options)))
    + "</h1>\n</header>\n\n<ul>\n";
  stack2 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</ul>\n";
  return buffer;
  });

templates["issues/new"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"container\">\n  <h2 class=\"col-sm-offset-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issues.menu.add_new_issue", options) : helperMissing.call(depth0, "__", "issues.menu.add_new_issue", options)))
    + "</h2>\n  <form class=\"listing-form form-horizontal\" enctype=\"multipart/form-data\">\n\n    ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.partial || depth0.partial),stack1 ? stack1.call(depth0, "issues/form", options) : helperMissing.call(depth0, "partial", "issues/form", options)))
    + "\n    \n    <div class=\"form-actions col-sm-offset-2\">\n      <button type=\"submit\" class=\"save btn btn-primary\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.save", options) : helperMissing.call(depth0, "__", "common.actions.save", options)))
    + "</button>\n      <a href=\"";
  if (stack2 = helpers.cancelPath) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.cancelPath; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"cancel btn btn-default\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.cancel", options) : helperMissing.call(depth0, "__", "common.actions.cancel", options)))
    + "</a>\n    </div>\n  </form>\n</div>\n\n\n\n";
  return buffer;
  });

templates["issues/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <br>\n  <p><a href=\"https://travis-ci.org/"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "/builds/"
    + escapeExpression(((stack1 = ((stack1 = depth0.build),stack1 == null || stack1 === false ? stack1 : stack1.last_build_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Latest TravisCI build</a></p>\n";
  return buffer;
  }

  buffer += "<a href=\"/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> / ";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "<br>\n\n\n";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.build),stack1 == null || stack1 === false ? stack1 : stack1.last_build_id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n<h3>Stats</h3>\n<div class=\"row\">\n  <div class=\"col-lg-6 col-md-6 col-sm-6\">\n    <table class=\"table\">\n      <tr>\n        <th>Description</th>\n        <td>";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Language</th>\n        <td>";
  if (stack2 = helpers.language) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.language; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Watchers</th>\n        <td>";
  if (stack2 = helpers.watchers_count) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.watchers_count; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Forks</th>\n        <td>";
  if (stack2 = helpers.forks_count) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.forks_count; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Open Issues</th>\n        <td>";
  if (stack2 = helpers.open_issues_count) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.open_issues_count; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n    </table>\n  </div>\n</div>\n";
  return buffer;
  });

templates["repos/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <li>\n    <a href=\"/repos/"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</a>, by <a href=\"/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n  </li>\n";
  return buffer;
  }

  buffer += "<h1>Repos</h1>\n\n<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });

templates["repos/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <br>\n  <p><a href=\"https://travis-ci.org/"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "/builds/"
    + escapeExpression(((stack1 = ((stack1 = depth0.build),stack1 == null || stack1 === false ? stack1 : stack1.last_build_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Latest TravisCI build</a></p>\n";
  return buffer;
  }

  buffer += "<a href=\"/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.owner),stack1 == null || stack1 === false ? stack1 : stack1.login)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> / ";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "<br>\n\n\n";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.build),stack1 == null || stack1 === false ? stack1 : stack1.last_build_id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n<h3>Stats</h3>\n<div class=\"row\">\n  <div class=\"col-lg-6 col-md-6 col-sm-6\">\n    <table class=\"table\">\n      <tr>\n        <th>Description</th>\n        <td>";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Language</th>\n        <td>";
  if (stack2 = helpers.language) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.language; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Watchers</th>\n        <td>";
  if (stack2 = helpers.watchers_count) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.watchers_count; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Forks</th>\n        <td>";
  if (stack2 = helpers.forks_count) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.forks_count; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Open Issues</th>\n        <td>";
  if (stack2 = helpers.open_issues_count) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.open_issues_count; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n    </table>\n  </div>\n</div>\n";
  return buffer;
  });

templates["users/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <li>\n    <a href=\"/users/";
  if (stack1 = helpers.login) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.login; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.login) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.login; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n  </li>\n";
  return buffer;
  }

  buffer += "<h1>Users</h1>\n\n<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.models, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });

templates["users/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<img src=\"";
  if (stack1 = helpers.avatar_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.avatar_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" width=80 height=80> ";
  if (stack1 = helpers.login) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.login; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " (";
  if (stack1 = helpers.public_repos) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.public_repos; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " public repos)\n\n<br>\n\n<div class=\"row\">\n  <div class=\"col-lg-6 col-md-6 col-sm-6\">\n    ";
  options = {hash:{
    'collection': (depth0.repos)
  },data:data};
  buffer += escapeExpression(((stack1 = helpers.view || depth0.view),stack1 ? stack1.call(depth0, "user_repos_view", options) : helperMissing.call(depth0, "view", "user_repos_view", options)))
    + "\n  </div>\n\n  <div class=\"col-lg-6 col-md-6 col-sm-6\">\n    <h3>Info</h3>\n    <br>\n    <table class=\"info-table table\">\n      <tr>\n        <th>Location</th>\n        <td>";
  if (stack2 = helpers.location) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.location; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n      <tr>\n        <th>Blog</th>\n        <td>";
  if (stack2 = helpers.blog) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.blog; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n      </tr>\n    </table>\n  </div>\n</div>\n";
  return buffer;
  });

return templates;

};