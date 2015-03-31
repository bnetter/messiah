var _ = require('lodash');
var async = require('async');

var messiah = {};

messiah.rules = require(__dirname + '/rules.js');
messiah.objects = require(__dirname + '/objects.js');
messiah.options = require(__dirname + '/options.js');

messiah.check = function (type, object, context, next) {
  var errors = {};

  if (_.isFunction(context)) {
    next = context;
    context = null;
  }

  var properties = messiah.objects._get(type);

  async.eachSeries(_.keys(properties), function (property, callback) {
    var value = object[property];
    var rules = properties[property];
    var err = [];

    if ((value === null || _.isUndefined(value)) && !_.isUndefined(rules.isRequired)) {
      err.push(rules.isRequired.message);
    }

    async.each(_.keys(rules), function (rule, cb) {
      if (rule !== 'isRequired') {
        var options = rules[rule];
        var validator = messiah.rules._get(rule);

        return validator(value, options, context, function(result) {
          if (!result) {
            err.push(options.message);
          }

          return cb(null);
        });
      }

      return cb(null);
    }, function() {
      if (err.length > 0) {
        errors[property] = err;

        if (messiah.options.stopped) {
          return callback(true); // stops the current execution right away
        }
      }

      return callback(null);
    });
  }, function () {
    if (_.isEmpty(errors)) {
      errors = null;
    }

    return next(errors);
  });
};

module.exports = messiah;