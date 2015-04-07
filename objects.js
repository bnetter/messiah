var _ = require('lodash');
var fs = require('fs');

var objects = {
  data: {}
};

objects.new = function(name, rules) {
  var object = {};

  _.forIn(rules, function(value, key) {
    object[key] = {};

    _.forIn(value, function(options, name) {
      if (_.isString(options)) {
        options = {
          message: options
        };
      }
      object[key][name] = options;
    });
  });

  this.data[name] = object;
};

objects.load = function (path) {
  var files = fs.readdirSync(path);

  _.forEach(files, function (file) {
    var name = file.split('.').slice(0, -1).join('.');

    objects.new(name, require(path + '/' + file));
  });
};


objects._get = function (name) {
  var object = this.data[name];

  if (_.isUndefined(object)) {
    throw new Error('The object type ' + name + ' is not defined');
  }

  return object;
}

module.exports = objects;