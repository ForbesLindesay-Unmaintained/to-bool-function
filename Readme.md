# to-bool-function

[![Greenkeeper badge](https://badges.greenkeeper.io/ForbesLindesay/to-bool-function.svg)](https://greenkeeper.io/)

  Convert things to functions for use in some/filter/every etc.

[![Build Status](https://secure.travis-ci.org/ForbesLindesay/to-bool-function.png?branch=master)](https://travis-ci.org/ForbesLindesay/to-bool-function)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/to-bool-function.svg)](https://david-dm.org/ForbesLindesay/to-bool-function)
[![NPM version](https://img.shields.io/npm/v/to-bool-function.svg)](https://www.npmjs.com/package/to-bool-function)

## Installation

    $ npm install to-bool-function

## API

```javascript
var fun = require('to-bool-function');

fun('isAdmin')({isAdmin: true})
// => true

fun('isAdmin', false)({isAdmin: true})
// => false

fun('name', 'Forbes')({name: 'Forbes'})
// => true

fun(/^\S+@\S+\.\S+$/)('forbes@component.io')
// => true

fun(/^\S+@\S+\.\S+$/)('forbescomponent.io')
// => false

fun('contact.email', /^\S+@\S+\.\S+$/)({contact: {email: 'forbes@component.io'}})
// => true

fun({contact: {realName: /\w+/,    email: /^\S+@\S+\.\S+$/}})
   ({contact: {realName: 'Forbes', email: 'forbes@component.io'}})
// => true
```

## License

  MIT

