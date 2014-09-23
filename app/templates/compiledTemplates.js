module.exports = function(Handlebars) {

var templates = {};

templates["helpers/alert"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
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


  buffer += "<p>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.copyright || depth0.copyright),stack1 ? stack1.call(depth0, "2013", options) : helperMissing.call(depth0, "copyright", "2013", options)))
    + "</p>\n<p><em>hi</em> hi</p>\n<blockquote>\n<p>hi\nhey</p>\n</blockquote>\n<p>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.copyright || depth0.copyright),stack1 ? stack1.call(depth0, "2013", options) : helperMissing.call(depth0, "copyright", "2013", options)))
    + "</p>\n";
  return buffer;
  });

templates["issues/edit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"container\">\n  <h2 class=\"col-sm-offset-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.menu.edit_issue", options) : helperMissing.call(depth0, "__", "issue.menu.edit_issue", options)))
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
    + "</a>\n    </div>\n  </form>\n</div>";
  return buffer;
  });

templates["issues/form"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<!-- form-xlarge -->\n<fieldset>\n  <div class=\"form-group title-group\">\n    <label for=\"issue-titleEN\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.title", options) : helperMissing.call(depth0, "__", "common.fields.title", options)))
    + " (";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.langs.EN", options) : helperMissing.call(depth0, "__", "common.langs.EN", options)))
    + ")</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control input-lg\" name=\"issue[titleEN]\" id=\"issue-titleEN\" maxlength=\"128\" value=\"";
  if (stack2 = helpers.titleEN) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.titleEN; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.title", options) : helperMissing.call(depth0, "__", "common.fields.title", options)))
    + " (";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.langs.EN", options) : helperMissing.call(depth0, "__", "common.langs.EN", options)))
    + ")\" required=\"required\" />\n      <p class=\"help-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.form.title_help", options) : helperMissing.call(depth0, "__", "issue.form.title_help", options)))
    + "</p>\n    </div>\n    <label for=\"issue-titleFR\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.title", options) : helperMissing.call(depth0, "__", "common.fields.title", options)))
    + " (";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.langs.FR", options) : helperMissing.call(depth0, "__", "common.langs.FR", options)))
    + ")</label>\n    <div class=\"col-sm-10\">\n      <input type=\"text\" class=\"form-control input-lg\" name=\"issue[titleFR]\" id=\"issue-titleFR\" maxlength=\"128\" value=\"";
  if (stack2 = helpers.titleFR) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.titleFR; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.title", options) : helperMissing.call(depth0, "__", "common.fields.title", options)))
    + " ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.langs.FR", options) : helperMissing.call(depth0, "__", "common.langs.FR", options)))
    + "\" required=\"required\" />\n      <p class=\"help-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.form.title_help", options) : helperMissing.call(depth0, "__", "issue.form.title_help", options)))
    + "</p>\n    </div>\n  </div>\n</fieldset>\n\n<fieldset>\n  <div class=\"col-sm-offset-2 col-sm-10\">\n    <div class=\"row\"><legend class=\"col-sm-8\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.nouns.codes", options) : helperMissing.call(depth0, "__", "common.nouns.codes", options)))
    + "</legend></div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"fundservCode\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.fields.fundservCode", options) : helperMissing.call(depth0, "__", "issue.fields.fundservCode", options)))
    + "</label>\n    <div class=\"col-xs-6\">\n      <input type=\"text\" class=\"form-control\" name=\"issue[fundservCode]\" maxlength=\"8\" value=\"";
  if (stack2 = helpers.fundservCode) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.fundservCode; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" />\n    </div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"ismCode\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.fields.ismCode", options) : helperMissing.call(depth0, "__", "issue.fields.ismCode", options)))
    + "</label>\n    <div class=\"col-xs-6\">\n      <input type=\"text\" class=\"form-control\" name=\"issue[ismCode]\" maxlength=\"8\" value=\"";
  if (stack2 = helpers.ismCode) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.ismCode; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" />\n    </div>\n  </div>\n</fieldset>\n\n<fieldset>\n  <div class=\"col-sm-offset-2 col-sm-10\">\n    <div class=\"row\"><legend class=\"col-sm-8\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.nouns.dates", options) : helperMissing.call(depth0, "__", "common.nouns.dates", options)))
    + "</legend></div>\n  </div>\n  <div class=\"date-group form-group\">\n    <label for=\"issuanceDate\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.fields.issuanceDate", options) : helperMissing.call(depth0, "__", "issue.fields.issuanceDate", options)))
    + "</label>\n    <div class=\"col-xs-6\">\n      <input type=\"text\" class=\"form-control datepicker\" name=\"issue[issuanceDate]\" maxlength=\"10\" value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.datepicker || depth0.datepicker),stack1 ? stack1.call(depth0, depth0.issuanceDate, options) : helperMissing.call(depth0, "datepicker", depth0.issuanceDate, options)))
    + "\" data-date=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.datepicker || depth0.datepicker),stack1 ? stack1.call(depth0, depth0.issuanceDate, options) : helperMissing.call(depth0, "datepicker", depth0.issuanceDate, options)))
    + "\" data-date-format=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.dates.formats.input", options) : helperMissing.call(depth0, "__", "common.dates.formats.input", options)))
    + "\"  />\n    </div>\n  </div>\n  <div class=\"date-group form-group\">\n    <label for=\"maturityDate\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.fields.maturityDate", options) : helperMissing.call(depth0, "__", "issue.fields.maturityDate", options)))
    + "</label>\n    <div class=\"col-xs-6\">\n      <input type=\"text\" class=\"form-control datepicker\" name=\"issue[maturityDate]\" maxlength=\"10\" value=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.datepicker || depth0.datepicker),stack1 ? stack1.call(depth0, depth0.maturityDate, options) : helperMissing.call(depth0, "datepicker", depth0.maturityDate, options)))
    + "\" data-date=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.datepicker || depth0.datepicker),stack1 ? stack1.call(depth0, depth0.maturityDate, options) : helperMissing.call(depth0, "datepicker", depth0.maturityDate, options)))
    + "\" data-date-format=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.dates.formats.input", options) : helperMissing.call(depth0, "__", "common.dates.formats.input", options)))
    + "\"  />\n    </div>\n  </div>\n</fieldset>";
  return buffer;
  });

templates["issues/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  <li>\n    <a href=\"/issues/";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, "slug", options) : helperMissing.call(depth0, "i18n", "slug", options)))
    + "\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, "title", options) : helperMissing.call(depth0, "i18n", "title", options)))
    + "</a>\n  </li>\n";
  return buffer;
  }

  buffer += "<header class=\"clearfix\">\n  <h1 class=\"left-sm\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.meta.className_plural", options) : helperMissing.call(depth0, "__", "issue.meta.className_plural", options)))
    + "</h1>\n  <ul class=\"list-inline left-sm\">\n    <li>\n      <a href=\"/issues/new\" id=\"new-issue-link\" class=\"btn btn-success\">\n        <span class=\"glyphicon glyphicon-plus\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issues.actions.new_issue", options) : helperMissing.call(depth0, "__", "issues.actions.new_issue", options)))
    + "\n      </a>\n    </li>\n  </ul>\n</header>\n\n<ul>\n";
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
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "issue.menu.add_new_issue", options) : helperMissing.call(depth0, "__", "issue.menu.add_new_issue", options)))
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
    + "</a>\n    </div>\n  </form>\n</div>";
  return buffer;
  });

templates["issues/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"clearfix\">\n  <h1>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, "title", options) : helperMissing.call(depth0, "i18n", "title", options)))
    + "</h1>\n  <ul class=\"list-inline left-sm\">\n    <li>\n      <a href=\"/issues/";
  if (stack2 = helpers.objectId) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.objectId; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "/";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.i18n || depth0.i18n),stack1 ? stack1.call(depth0, "slug", options) : helperMissing.call(depth0, "i18n", "slug", options)))
    + "/edit\" id=\"edit-issue-link\" class=\"btn btn-default\">\n        <span class=\"glyphicon glyphicon-edit\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.edit", options) : helperMissing.call(depth0, "__", "common.actions.edit", options)))
    + "\n      </a>\n    </li>\n  </ul>\n</div>\n<table>\n  <thead>\n    <tr>\n      <th>Attribute</th>\n      <th>Explanation</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Issuance Date</td>\n      <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.moment || depth0.moment),stack1 ? stack1.call(depth0, depth0.issuanceDate, options) : helperMissing.call(depth0, "moment", depth0.issuanceDate, options)))
    + "</td>\n    </tr>\n    <tr>\n      <td>Maturity Date</td>\n      <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.moment || depth0.moment),stack1 ? stack1.call(depth0, depth0.maturityDate, options) : helperMissing.call(depth0, "moment", depth0.maturityDate, options)))
    + "</td>\n    </tr>\n  </tbody>\n</table>\n";
  return buffer;
  });

templates["profiles/edit"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"container\">\n  <h2 class=\"col-sm-offset-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.menu.edit_profile", options) : helperMissing.call(depth0, "__", "user.menu.edit_profile", options)))
    + "</h2>\n  <form class=\"listing-form form-horizontal\" enctype=\"multipart/form-data\">\n\n    <fieldset>\n      <div class=\"form-group name-group\">\n        <label for=\"profile-name\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.name", options) : helperMissing.call(depth0, "__", "common.fields.name", options)))
    + "</label>\n        <div class=\"col-sm-10 col-md-8\">\n          <input type=\"text\" class=\"form-control input-lg\" name=\"profile[name]\" id=\"profile-name\" maxlength=\"128\" value=\"";
  if (stack2 = helpers.name) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.name; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.name", options) : helperMissing.call(depth0, "__", "common.fields.name", options)))
    + "\" required=\"required\" />\n        </div>\n      </div>\n    </fieldset>\n    \n    <div class=\"form-actions col-sm-offset-2\">\n      <button type=\"submit\" class=\"save btn btn-primary\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.save", options) : helperMissing.call(depth0, "__", "common.actions.save", options)))
    + "</button>\n      <a href=\"";
  if (stack2 = helpers.cancelPath) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.cancelPath; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"cancel btn btn-default\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.cancel", options) : helperMissing.call(depth0, "__", "common.actions.cancel", options)))
    + "</a>\n    </div>\n  </form>\n</div>";
  return buffer;
  });

templates["profiles/show"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"clearfix\">\n  <h1>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n  <ul class=\"list-inline left-sm\">\n    <li>\n      <a href=\"/users/";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/edit\" id=\"edit-profile-link\" class=\"btn btn-default\">\n        <span class=\"glyphicon glyphicon-edit\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.edit", options) : helperMissing.call(depth0, "__", "common.actions.edit", options)))
    + "\n      </a>\n    </li>\n  </ul>\n</div>";
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

templates["users/loggedoutmodals"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div id=\"login-modal\" class=\"modal fade\">\n  <form id=\"login-modal-form\" class=\"modal-dialog modal-form modal-large\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-labelledby=\"login-modal-label\" aria-hidden=\"true\">&times;</button>\n        <h3 id=\"login-modal-label\" class=\"modal-title inline-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.login", options) : helperMissing.call(depth0, "__", "user.actions.login", options)))
    + "</h3>\n        <p class=\"inline-block\">(<a id=\"switch-signup-modal\" href=\"#\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.switch_signup", options) : helperMissing.call(depth0, "__", "user.actions.switch_signup", options)))
    + "</a>)</p>\n      </div>\n      <div class=\"modal-body\">\n        <fieldset>\n          <div class=\"alert alert-danger\" style=\"display:none\"></div>        \n          <legend class=\"text-center\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.sign_in_with_email", options) : helperMissing.call(depth0, "__", "user.actions.sign_in_with_email", options)))
    + "</legend>\n          <div class=\"row\">\n            <div class=\"form-group username-group align-top col-md-6\">\n              <label for=\"login-username\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + ":</label>\n              <div class=\"controls\">\n                <input type=\"email\" name=\"login-username\" id=\"login-modal-username\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + "\">\n              </div>\n            </div>\n            <div class=\"form-group password-group align-top col-md-6\">\n              <label for=\"login-password\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + ":</label>\n              <div class=\"controls\">\n                <input type=\"password\" name=\"login-password\" id=\"login-modal-password\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + "\">\n              </div>\n              <p class=\"help-block\"><small><a class=\"reset-password-link\" href=\"#\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.forgot_your_password", options) : helperMissing.call(depth0, "__", "user.actions.forgot_your_password", options)))
    + "</a></small></p>\n            </div>\n          </div>\n        </fieldset>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.login", options) : helperMissing.call(depth0, "__", "user.actions.login", options)))
    + "</button>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div id=\"signup-modal\" class=\"modal fade\">\n  <form id=\"signup-modal-form\" class=\"modal-dialog modal-form modal-large modal-thin \">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-labelledby=\"signup-modal-label\" aria-hidden=\"true\">&times;</button>\n        <h3 id=\"signup-modal-label\" class=\"modal-title inline-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.signup", options) : helperMissing.call(depth0, "__", "user.actions.signup", options)))
    + "</h3>\n        <p class=\"inline-block\">(<a id=\"switch-login-modal\" href=\"#\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.switch_login", options) : helperMissing.call(depth0, "__", "user.actions.switch_login", options)))
    + "</a>)</p>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"alert alert-danger\" style=\"display:none\"></div>\n        <fieldset>\n          <legend class=\"text-center\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.sign_up_with_email", options) : helperMissing.call(depth0, "__", "user.actions.sign_up_with_email", options)))
    + "</legend>\n          <div class=\"form-group username-group\">\n            <label for=\"signup-username\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + ":</label>\n            <div class=\"controls\">\n              <input type=\"email\" name=\"signup-username\" id=\"signup-modal-username\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + "\">\n            </div>\n          </div>\n          <div class=\"form-group password-group\">\n            <label for=\"signup-password\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + ":</label>\n            <div class=\"controls\">\n              <input type=\"password\" name=\"signup-password\" id=\"signup-modal-password\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + "\">\n            </div>\n          </div>\n        </fieldset>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.signup", options) : helperMissing.call(depth0, "__", "user.actions.signup", options)))
    + "</button>\n      </div>\n    </div>\n  </form>\n</div>\n\n<div id=\"reset-password-modal\" class=\"modal fade\">\n  <form id=\"reset-password-modal-form\" class=\"modal-dialog modal-form modal-large\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-labelledby=\"reset-password-modal-label\" aria-hidden=\"true\">&times;</button>\n        <h3 id=\"reset-password-modal-label\" class=\"modal-title\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.forgot_your_password", options) : helperMissing.call(depth0, "__", "user.actions.forgot_your_password", options)))
    + "</h3>\n      </div>\n      <div class=\"modal-body\">\n        <div id=\"reset-email-modal-group\" class=\"form-group\">\n          <label for=\"email\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + ":</label>\n          <div class=\"controls\">\n            <input type=\"email\" name=\"email\" id=\"reset-modal-email\" class=\"form-control input-lg\" size=\"22\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + "\">\n            <p class=\"help-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.instructions_to_email", options) : helperMissing.call(depth0, "__", "user.form.instructions_to_email", options)))
    + "</p>\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.reset_password", options) : helperMissing.call(depth0, "__", "user.actions.reset_password", options)))
    + "</button>\n      </div>\n    </div>\n  </form>\n</div>";
  return buffer;
  });

templates["users/login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container\">\n  <form id=\"login-form\" class=\"modal-dialog modal-form modal-large\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h3 id=\"login-label\" class=\"modal-title inline-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.login", options) : helperMissing.call(depth0, "__", "user.actions.login", options)))
    + "</h3>\n        <p class=\"inline-block\">(<a id=\"switch-signup-modal\" href=\"/account/signup\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.switch_signup", options) : helperMissing.call(depth0, "__", "user.actions.switch_signup", options)))
    + "</a>)</p>\n      </div>\n      <div class=\"modal-body\">\n        <fieldset>\n          <div class=\"alert alert-danger\" style=\"display:none\"></div>        \n          <legend class=\"text-center\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.sign_in_with_email", options) : helperMissing.call(depth0, "__", "user.actions.sign_in_with_email", options)))
    + "</legend>\n          <div class=\"row\">\n            <div class=\"form-group username-group align-top col-md-6\">\n              <label for=\"login-username\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + ":</label>\n              <div class=\"controls\">\n                <input type=\"email\" name=\"login-username\" id=\"login-username\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + "\">\n              </div>\n            </div>\n            <div class=\"form-group password-group align-top col-md-6\">\n              <label for=\"login-password\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + ":</label>\n              <div class=\"controls\">\n                <input type=\"password\" name=\"login-password\" id=\"login-password\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + "\">\n              </div>\n              <p class=\"help-block\"><small><a class=\"reset-password-link\" href=\"/account/reset_password\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.forgot_your_password", options) : helperMissing.call(depth0, "__", "user.actions.forgot_your_password", options)))
    + "</a></small></p>\n            </div>\n          </div>\n        </fieldset>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.login", options) : helperMissing.call(depth0, "__", "user.actions.login", options)))
    + "</button>\n      </div>\n    </div>\n  </form>\n</div>";
  return buffer;
  });

templates["users/menu"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  <li>\n    <a id=\"profile-link\" class=\"clearfix\" href=\"/users/";
  if (stack1 = helpers.objectId) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.objectId; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n      <img src=\"";
  if (stack1 = helpers.src) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.src; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"pull-left photo photo-tiny img-circle\" width=\"32\" height=\"32\">\n      <span class=\"photo-float tiny-float hidden-sm hidden-xs\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </a>\n  </li>\n  <li id=\"memos\" class=\"dropdown list-item-icon\">\n    <a id=\"mLabel\" data-target=\"#\" data-toggle=\"dropdown\" role=\"menu\" class=\"dropdown-toggle\">\n      <span class=\"glyphicon glyphicon-flag\"></span>\n      <span id=\"memos-count\" class=\"badge badge-danger hide\">0</span>\n    </a>\n    <div aria-labelledby=\"mLabel\" role=\"menu\" class=\"dropdown-menu notifications-menu\">\n      <div class=\"dropdown-top\"><a href=\"#\" id=\"mark-read\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.expressions.mark_read", options) : helperMissing.call(depth0, "__", "common.expressions.mark_read", options)))
    + "</a></div>\n      <ul></ul>\n      <a href=\"/notifications\" class=\"dropdown-bottom\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.expressions.see_all", options) : helperMissing.call(depth0, "__", "common.expressions.see_all", options)))
    + "</a>\n    </div>\n  </li>\n  <li id=\"friend-requests\" class=\"dropdown list-item-icon\">\n    <a id=\"fLabel\" data-target=\"#\" data-toggle=\"dropdown\" role=\"menu\" class=\"dropdown-toggle\">\n      <span class=\"glyphicon glyphicon-user\"></span>\n      <span id=\"friend-requests-count\" class=\"badge badge-danger hide\">0</span>\n    </a>\n    <div aria-labelledby=\"fLabel\" role=\"menu\" class=\"dropdown-menu notifications-menu\">\n      <ul></ul>\n      <a href=\"/notifications\" class=\"dropdown-bottom\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.expressions.see_all", options) : helperMissing.call(depth0, "__", "common.expressions.see_all", options)))
    + "</a>\n    </div>\n  </li>\n  <li class=\"dropdown list-item-icon\">\n    <a id=\"pLabel\" data-target=\"#\" data-toggle=\"dropdown\" role=\"menu\" class=\"dropdown-toggle\">\n      <span class=\"glyphicon glyphicon-cog\"></span>\n    </a>\n    <ul aria-labelledby=\"pLabel\" role=\"menu\" class=\"dropdown-menu\">\n      <li><a href=\"/account/settings\"><span class=\"glyphicon glyphicon-user\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.menu.account_settings", options) : helperMissing.call(depth0, "__", "user.menu.account_settings", options)))
    + "</a></li>\n      <li><a href=\"/account/history\"><span class=\"glyphicon glyphicon-file\"></span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.nouns.history", options) : helperMissing.call(depth0, "__", "common.nouns.history", options)))
    + "</a></li>\n      <li class=\"divider\">\n      <li><a id=\"logout\" href=\"#\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.logout", options) : helperMissing.call(depth0, "__", "user.actions.logout", options)))
    + "</a></li>\n    </ul>\n  </li>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  <li><a id=\"login-link\" href=\"#\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.login", options) : helperMissing.call(depth0, "__", "user.actions.login", options)))
    + "</a></li>\n  <li class=\"hidden-xs hidden-sm\"><a id=\"signup-link\" href=\"#\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.signup", options) : helperMissing.call(depth0, "__", "user.actions.signup", options)))
    + "</a></li>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.objectId, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<li class=\"visible-xs list-item-icon\">\n  <a href=\"#\" data-target=\"#search-menu\" data-toggle=\"collapse\"><span class=\"glyphicon glyphicon-search\"></span></a>\n</li>";
  return buffer;
  });

templates["users/reset"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container\">\n  <form id=\"reset-password-modal-form\" class=\"modal-dialog modal-form modal-large\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h3 id=\"reset-password-modal-label\" class=\"modal-title\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.forgot_your_password", options) : helperMissing.call(depth0, "__", "user.actions.forgot_your_password", options)))
    + "</h3>\n      </div>\n      <div class=\"modal-body\">\n        <div id=\"reset-email-group\" class=\"form-group\">\n          <label for=\"email\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + ":</label>\n          <div class=\"controls\">\n            <input type=\"email\" name=\"email\" id=\"reset-modal-email\" class=\"form-control input-lg\" size=\"22\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + "\">\n            <p class=\"help-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.instructions_to_email", options) : helperMissing.call(depth0, "__", "user.form.instructions_to_email", options)))
    + "</p>\n          </div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.reset_password", options) : helperMissing.call(depth0, "__", "user.actions.reset_password", options)))
    + "</button>\n      </div>\n    </div>\n  </form>\n</div>";
  return buffer;
  });

templates["users/settings"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"container\">\n  <h2 class=\"col-sm-offset-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.menu.edit_profile", options) : helperMissing.call(depth0, "__", "user.menu.edit_profile", options)))
    + "</h2>\n  <form class=\"form-horizontal\" enctype=\"multipart/form-data\">\n\n    <fieldset>\n      <div class=\"form-group email-group\">\n        <label for=\"user-email\" class=\"control-label control-label-lg col-sm-2\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.email", options) : helperMissing.call(depth0, "__", "common.fields.email", options)))
    + "</label>\n        <div class=\"col-sm-10 col-md-8\">\n          <input type=\"text\" class=\"form-control input-lg\" name=\"user[email]\" id=\"user-email\" maxlength=\"128\" value=\"";
  if (stack2 = helpers.email) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.email; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.fields.email", options) : helperMissing.call(depth0, "__", "common.fields.email", options)))
    + "\" required=\"required\" />\n        </div>\n      </div>\n    </fieldset>\n    \n    <div class=\"form-actions col-sm-offset-2\">\n      <button type=\"submit\" class=\"save btn btn-primary\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.save", options) : helperMissing.call(depth0, "__", "common.actions.save", options)))
    + "</button>\n      <a href=\"";
  if (stack2 = helpers.cancelPath) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.cancelPath; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"cancel btn btn-default\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "common.actions.cancel", options) : helperMissing.call(depth0, "__", "common.actions.cancel", options)))
    + "</a>\n    </div>\n  </form>\n</div>\n";
  return buffer;
  });

templates["users/signup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"container\">\n  <form id=\"signup-modal-form\" class=\"modal-dialog modal-form modal-large\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h3 id=\"signup-label\" class=\"modal-title inline-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.signup", options) : helperMissing.call(depth0, "__", "user.actions.signup", options)))
    + "</h3>\n        <p class=\"inline-block\">(<a id=\"switch-login\" href=\"/account/login\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.switch_login", options) : helperMissing.call(depth0, "__", "user.actions.switch_login", options)))
    + "</a>)</p>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"alert alert-danger\" style=\"display:none\"></div>\n        <fieldset>\n          <legend class=\"text-center\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.sign_up_with_email", options) : helperMissing.call(depth0, "__", "user.actions.sign_up_with_email", options)))
    + "</legend>\n          <div class=\"form-group username-group\">\n            <label for=\"signup-username\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + ":</label>\n            <div class=\"controls\">\n              <input type=\"email\" name=\"signup-username\" id=\"signup-username\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.email", options) : helperMissing.call(depth0, "__", "user.form.email", options)))
    + "\">\n            </div>\n          </div>\n          <div class=\"form-group password-group\">\n            <label for=\"signup-password\" class=\"control-label element-invisible\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + ":</label>\n            <div class=\"controls\">\n              <input type=\"password\" name=\"signup-password\" id=\"signup-password\" class=\"form-control input-lg\" placeholder=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.form.password", options) : helperMissing.call(depth0, "__", "user.form.password", options)))
    + "\">\n            </div>\n          </div>\n        </fieldset>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-primary btn-lg btn-block\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.__ || depth0.__),stack1 ? stack1.call(depth0, "user.actions.signup", options) : helperMissing.call(depth0, "__", "user.actions.signup", options)))
    + "</button>\n      </div>\n    </div>\n  </form>\n</div>";
  return buffer;
  });

return templates;

};