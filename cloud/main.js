(function() {
  Parse.Cloud.beforeSave("Issue", function(req, res) {
    return res.success();
  });

}).call(this);
