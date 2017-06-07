'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TAU = exports.Asin = exports.Cos = exports.Sin = exports.SQRT1_2 = exports.SQRT2 = exports.PI = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.Deg2Rad = Deg2Rad;
exports.Rad2Deg = Rad2Deg;
exports.Polar2Cartesian = Polar2Cartesian;
exports.NormalizeAngleRange = NormalizeAngleRange;
exports.AnnulusViewport = AnnulusViewport;

var _lodashEs = require('lodash-es');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Aliases
 */
var PI = exports.PI = Math.PI;
var SQRT2 = exports.SQRT2 = Math.SQRT2;
var SQRT1_2 = exports.SQRT1_2 = Math.SQRT1_2;
var Sin = exports.Sin = Math.sin;
var Cos = exports.Cos = Math.cos;
var Asin = exports.Asin = Math.asin;
var TAU = exports.TAU = 2 * PI; // http://tauday.com/tau-manifesto

function Deg2Rad(deg) {
  return deg * PI / 180;
}

function Rad2Deg(rad) {
  return rad * 180 / PI;
}

function Polar2Cartesian(radius, angle) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$degree = _ref.degree,
      degree = _ref$degree === undefined ? true : _ref$degree,
      _ref$baseX = _ref.baseX,
      baseX = _ref$baseX === undefined ? 0 : _ref$baseX,
      _ref$baseY = _ref.baseY,
      baseY = _ref$baseY === undefined ? 0 : _ref$baseY;

  if (degree) {
    angle = Deg2Rad(angle);
  }
  return [baseX + Cos(angle) * radius, baseY + Sin(angle) * radius];
}

function NormalizeAngleRange(start, end) {
  var startAngle = start % 360;
  var endAngle = end % 360;
  if (startAngle >= endAngle) {
    endAngle += 360;
  }
  return [startAngle, endAngle];
}
/**
 * Given an annulus with start/end angle and outer/inner radius, calculate a viewport 
 * that can hold it, and a center point relative to the viewport upper-left corner
 * 
 * Algo: get all vertices, calulate greatest difference from there cartesian coordinates,
 * 
 * Use Polar Coordinate System with convention:
 * https://en.wikipedia.org/wiki/Polar_coordinate_system#/media/File:Polar_graph_paper.svg
 * 
 * @param {number} startAngle, degree
 * @param {number} endAngle, degree
 * @param {number} outerR 
 * @param {number} innerR 
 */
function AnnulusViewport(startAngle, endAngle, outerR, innerR) {
  var padding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;


  if (outerR <= innerR) {
    throw Error('Invalid radius, the outer one is smaller than the inner');
  }

  var _NormalizeAngleRange = NormalizeAngleRange(startAngle, endAngle);

  var _NormalizeAngleRange2 = (0, _slicedToArray3.default)(_NormalizeAngleRange, 2);

  startAngle = _NormalizeAngleRange2[0];
  endAngle = _NormalizeAngleRange2[1];


  var p2c = Polar2Cartesian;
  var vertice = [p2c(innerR, startAngle), p2c(innerR, endAngle), p2c(outerR, startAngle), p2c(outerR, endAngle)];

  var _end = startAngle > endAngle ? endAngle + 360 : endAngle
  // polars: East North West South
  ;[0, 90, 180, 270, 360].forEach(function (p) {
    if ((0, _lodashEs.inRange)(p, startAngle, _end)) {
      vertice.push(p2c(outerR, p));
    }
  });
  var minX = void 0,
      minY = void 0,
      maxX = void 0,
      maxY = void 0;
  minX = minY = Infinity;
  maxX = maxY = -Infinity;
  vertice.forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
        x = _ref3[0],
        y = _ref3[1];

    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
  });
  return [maxX - minX + padding, maxY - minY + padding, -minX + padding / 2, maxY + padding / 2];
}