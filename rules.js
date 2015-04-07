var fs = require('fs');
var _ = require('lodash');

var rules = {
  data: {}
};

rules.new = function(name, rule) {
  this.data[name] = rule;
};

rules.load = function (path) {
  var files = fs.readdirSync(path);

  _.forEach(files, function (file) {
    var name = file.split('.').slice(0, -1).join('.');

    rules.new(name, require(path + '/' + file));
  });
};

rules._get = function(name) {
  var rule = this.data[name];

  if (_.isUndefined(rule)) {
    throw new Error('The rule ' + name + ' is not defined');
  }

  return rule;
};

rules.load(__dirname + '/rules');

module.exports = rules;