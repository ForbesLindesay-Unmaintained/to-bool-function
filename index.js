var type = require('type-of');

module.exports = toBoolFunction;

/**
 * Convert various possible things into a match function
 * 
 * @param  {Any} [selector]
 * @param  {Any} condition
 * @return {Function}
 */
function toBoolFunction(selector, condition) {
  if (arguments.length == 2) {
    selector = toBoolFunction(selector);
    condition = toBoolFunction(condition);
    return function () {
      return condition(selector.apply(this, arguments));
    };
  } else {
    condition = selector;
  }
  var alternate = false;
  try {
    switch (type(condition)) {
      case 'regexp':
        alternate = regexpToFunction(condition);
        break;
      case 'string':
        alternate = stringToFunction(condition);
        break;
      case 'function':
        alternate = condition;
        break;
      case 'object':
        alternate = objectToFunction(condition);
        break;
    }
  } catch (ex) {
    //ignore things that aren't valid functions
  }
  return function (val) {
    return (val === condition) ||
      (alternate && alternate.apply(this, arguments));
  }
}

/**
 * Convert `regexp` into a match funciton
 * 
 * @param  {Regexp} regexp
 * @return {Function}
 * @api private
 */
function regexpToFunction(regexp) {
  return function (val) {
    return regexp.test(val);
  };
}

/**
 * Convert `obj` into a match function.
 *
 * @param  {Object} obj
 * @return {Function}
 * @api private
 */
function objectToFunction(obj) {
  var fns = Object.keys(obj)
    .map(function (key) {
      return toBoolFunction(key, obj[key]);
    });
  return function(o){
    for (var i = 0; i < fns.length; i++) {
      if (!fns[i](o)) return false;
    }
    return true;
  }
}

/**
 * Convert property `str` to a function.
 *
 * @param {String} str
 * @return {Function}
 * @api private
 */

function stringToFunction(str) {
  // immediate such as "> 20"
  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str);

  // properties such as "name.first" or "age > 18"
  var fn = new Function('_', 'return _.' + str);
  return fn
}