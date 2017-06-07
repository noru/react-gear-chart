'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TODO = TODO;
exports.Random = Random;
exports.RandomInt = RandomInt;
exports.RandomDivide = RandomDivide;
exports.ToPrecentage = ToPrecentage;
exports.GenerateTeethData = GenerateTeethData;

var _lodashEs = require('lodash-es');

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _catNames = require('cat-names');

var _catNames2 = _interopRequireDefault(_catNames);

var _logger = require('./logger');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TODO() {
  throw Error('TODO');
}

function Random() {

  if ((arguments.length <= 0 ? undefined : arguments[0]) === undefined) {
    return Math.random();
  }
  if (arguments.length === 1) {
    return Math.random() * (arguments.length <= 0 ? undefined : arguments[0]);
  }
  if (arguments.length > 1) {
    return Math.random() * ((arguments.length <= 1 ? undefined : arguments[1]) - (arguments.length <= 0 ? undefined : arguments[0])) + (arguments.length <= 0 ? undefined : arguments[0]);
  }
}

function RandomInt() {
  return Math.round(Random.apply(undefined, arguments));
}

function RandomDivide(count) {
  var arr = ArrayGen(count)(function (_) {
    return Random();
  });
  var _sum = (0, _lodashEs.sum)(arr);
  return arr.map(function (_) {
    return _ / _sum;
  });
}

function ToPrecentage(number) {
  var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  return (number * 100).toFixed(decimal) + '%';
}

function GenerateTeethData(count, mode, stripCount) {
  var colors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];


  var colours = (0, _lodashEs.values)(_colors2.default);
  var modes = ['spokerib', 'layer', 'bar'];
  mode = modes.find(function (_) {
    return _ === mode;
  });

  function getRandomStrips() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

    var weights = void 0;
    if (mode === 'spokerib') {
      weights = RandomDivide(count);
    } else if (mode === 'bar') {
      weights = ArrayGen(count)(Random);
    } else {
      // layer
      weights = RandomDivide(count).map(function (_) {
        return _ + Random(-.2, .2);
      });
    }
    return ArrayGen(count)(function (_, i) {
      var c = colors.length === 0 ? colours : colors;
      return {
        color: c[RandomInt(c.length - 1)],
        weight: weights[i]
      };
    });
  }

  var result = ArrayGen(count)(function (i) {
    return {
      mode: mode || modes[RandomInt(2)],
      label: i + ': ' + _catNames2.default.random(),
      id: _shortid2.default.generate(),
      strips: getRandomStrips(stripCount || RandomInt(1, 4))
    };
  });
  (0, _logger.log)(result);
  return result;
}

function ArrayGen(times) {
  return function (iteratee) {
    var t = times;
    var arr = Array(t);
    for (var i = 0; i < t; i++) {
      arr[i] = iteratee(i, i);
    }
    return arr;
  };
}