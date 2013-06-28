var fun = require('../');
var assert = require('better-assert');

it('should match readme', function () {
  assert(fun('isAdmin')({isAdmin: true}));

  assert(!fun('isAdmin', false)({isAdmin: true}))

  assert(fun('name', 'Forbes')({name: 'Forbes'}))

  assert(fun(/^\S+@\S+\.\S+$/)('forbes@component.io'))

  assert(!fun(/^\S+@\S+\.\S+$/)('forbescomponent.io'))

  assert(fun('contact.email', /^\S+@\S+\.\S+$/)({contact: {email: 'forbes@component.io'}}))

  assert(fun({contact: {realName: /\w+/,    email: /^\S+@\S+\.\S+$/}})
            ({contact: {realName: 'Forbes', email: 'forbes@component.io'}}))
});

it('works with strings that aren\'t valid functions', function () {
  assert(fun('')(''));
});