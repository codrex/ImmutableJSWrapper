"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = require("immutable");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This a simple proxy wrapper around immutable js collections.
 * It makes getting values from an immutable js collections behave the same
 * way as javascript objects.
 */

/* eslint-disable class-methods-use-this */
var Handler =
/*#__PURE__*/
function () {
  function Handler() {
    _classCallCheck(this, Handler);
  }

  _createClass(Handler, [{
    key: "get",
    value: function get(target, name) {
      if (_typeof(name) === 'symbol') {
        return target[name];
      } // checking that value store in the immutable collections


      var isValue = target.has(name);

      if (isValue) {
        var value = target.get(name);
        return createImmutableProxy(value);
      } // when targeting attribute and method attached to an immutable collections


      var attribute = target[name]; // when attribute is a method call the method and pass in any argument passed

      if (typeof attribute === 'function') {
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var value = attribute.apply(target, args); // if value return is an immutable collections return the value as a proxy

          return createImmutableProxy(value);
        };
      }

      return attribute;
    }
  }, {
    key: "getOwnPropertyDescriptor",
    value: function getOwnPropertyDescriptor(target, name) {
      var hasProperty = target.has(name);

      if (hasProperty) {
        return {
          configurable: true,
          enumerable: true,
          value: target.get(name)
        };
      }
    }
  }, {
    key: "ownKeys",
    value: function ownKeys(target) {
      var keys = [];
      target.map(function (value, key) {
        keys.push(key);
      });
      return keys;
    }
  }]);

  return Handler;
}(); // wraps a value in a proxy when value is an immutable collections


function createImmutableProxy(value) {
  var throwError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(0, _immutable.isImmutable)(value)) {
    if (throwError) throw new Error('Expected an immutable object');
    return value;
  }

  var handler = new Handler();
  return new Proxy(value, handler);
}

var _default = createImmutableProxy;
exports.default = _default;
//# sourceMappingURL=index.js.map