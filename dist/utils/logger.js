'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-console */
var TAG = '[Gear List Chart] ';

function warn(msg) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  _call.apply(undefined, ['warn', msg].concat(args));
}

function error(msg) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  _call.apply(undefined, ['error', msg].concat(args));
}

function info(msg) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  _call.apply(undefined, ['info', msg].concat(args));
}

function log(msg) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  _call.apply(undefined, ['log', msg].concat(args));
}

function _call(name, msg) {
  if (typeof msg === 'string') {
    var _console;

    for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
      args[_key5 - 2] = arguments[_key5];
    }

    (_console = console)[name].apply(_console, [TAG + msg].concat(args));
  } else {
    console[name](TAG);
    console[name](msg);
  }
}

exports.error = error;
exports.warn = warn;
exports.info = info;
exports.log = log;