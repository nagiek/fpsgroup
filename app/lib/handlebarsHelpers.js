
/*
We inject the Handlebars instance, because this module doesn't know where
the actual Handlebars instance will come from.
 */

(function() {
  var moment;

  moment = require("moment");

  module.exports = function(Handlebars) {
    return {
      copyright: function(year) {
        return new Handlebars.SafeString("&copy;" + year);
      },
      __: function(key, options) {
        return Handlebars.polyglot.t(key, options);
      },
      moment: function(context, format) {
        if (typeof format !== "String") {
          format = "LL";
        }
        return moment(context.iso).format(format);
      },
      duration: function(context, format) {
        if (typeof format !== "String") {
          format = "LL";
        }
        return moment.duration(context.iso).format(format);
      },
      datepicker: function(context) {
        var format;
        if (context != null) {
          format = Handlebars.polyglot.t("common.dates.formats.output");
          return moment(context.iso).format(format);
        } else {
          return "";
        }
      },
      log: function(variable) {
        return console.log(variable);
      }
    };
  };

}).call(this);
