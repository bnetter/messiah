# MessiahJS

Messiah is an extended NodeJS object validator.

## Installation
With [npm](http://npmjs.org/) installed, run:
```sh
npm install messiah
```

## Getting started

### Default rules

#### `isString`
Checks if the value is a string.

#### `isNumber`
Checks if the value is a number.

#### `isArray`
Checks if the value is an array.

#### `isBoolean`
Checks if the value is either `true` or `false`.

#### `isDate`
Checks if the value is a `Date`.

#### `contains`
Checks if the `str` is contained in the value.

#### `equals`
Checks if the value equals `str`.

#### `matches`
Checks if the value matches the regular expression `pattern`.

#### `isIn`
Checks if the value is in the array `arr`.

#### `isLength`
Checks if the value length is between `min` and `max`.

#### `isEmail`
Checks if the value length is a valid e-mail address.

#### `isMongoId`
Checks if the value length is a valid Mongo Object ID.

#### `isURL`
Checks if the value is a valid URL.


### Options
To edit options, use the `options` property:
```js
var messiah = require('messiah');

messiah.options.breaks = false;
```

#### `breaks`
Decides whether the script breaks on first encountered error. Default is `true`.

## Examples
```js
var messiah = require('messiah');

// Create an object User
messiah.objects.new('user', {
  name: {
    isRequired: 'The name is required',
    isLength: {
      message: 'The name has to be at least 5 characters',
      min: 5
    }
  },
  email: {
    isEmail: 'The e-mail address is not valid'
  }
});

var user = {
  "email": "netter@lendix.com",
  "name": "Benjamin Netter"
};

// Check 
messiah.check('user', user, function(err) {
  if (err) {
    // Errors
  }
});
```
