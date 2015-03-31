# messiah
Node object validators

# Examples
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