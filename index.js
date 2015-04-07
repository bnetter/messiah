var _ = require('lodash');
var async = require('async');

var messiah = {};

/**
 * Load rules methods and a set of default rules
 */

messiah.rules = require(__dirname + '/rules.js');

/**
 * Load object methods
 */

messiah.objects = require(__dirname + '/objects.js');

/**
 * Load default options
 */

messiah.options = require(__dirname + '/options.js');

/**
 * Compiles the message, aggregating variables from the object
 */

messiah._compileErrors = function (errors, object) {
  if (errors) {
    if (_.isArray(errors)) {
      return _.map(errors, function (error) {
        var message  = _.template(error);

        return message(object);
      });
    } else {
      _.forEach(_.keys(errors), function (key) {
        errors[key] = _.map(errors[key], function (error) {
          var message  = _.template(error);

          return message(object);
        });
      });
    }
  }

  return errors;
};

/**
 * Checks the property and returns the errors
 */

messiah._checkValue = function (value, rules, context, callback) {
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
    return callback(err);
  });
};

messiah.check = function (type, object, context, next) {
  var errors = {};

  // `context` is optional
  if (_.isFunction(context)) {
    next = context;
    context = null;
  }

  var properties = messiah.objects._get(type);

  async.eachSeries(_.keys(properties), function(property, callback) {
    var rules = properties[property];
    var value = object[property];

    if (property === '_pre') {
      value = object;
    }

    return messiah._checkValue(value, rules, context, function(err) {
      if (err.length > 0) {
        if (property === '_pre') {
          errors = err;
        } else {
          errors[property] = err;
        }

        if (messiah.options.breaks || property === '_pre') {
          return callback(true); // stops the current execution right away
        }
      }

      return callback(null);
    });
  }, function () {
    if (_.isEmpty(errors)) {
      errors = null;
    }

    return next(messiah._compileErrors(errors, object));
  });
};

module.exports = messiah;