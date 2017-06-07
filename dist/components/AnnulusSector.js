'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GearListChart = require('./GearListChart');

var _GearListChart2 = _interopRequireDefault(_GearListChart);

var _draw = require('../utils/draw');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnnulusSector = function (_PureComponent) {
  (0, _inherits3.default)(AnnulusSector, _PureComponent);

  function AnnulusSector() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AnnulusSector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AnnulusSector.__proto__ || (0, _getPrototypeOf2.default)(AnnulusSector)).call.apply(_ref, [this].concat(args))), _this), _this._attachDataToEvent = function (evt) {
      evt.persist();
      evt.sectorId = _this.props.id;
    }, _this.mouseEventProxy = function (evt) {
      _this._attachDataToEvent(evt);
      _this.props[_GearListChart2.default.getRegistrationName(evt)](evt);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AnnulusSector, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          fill = _props.fill,
          style = _props.style,
          onMouseMove = _props.onMouseMove,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave,
          onMouseOver = _props.onMouseOver,
          onClick = _props.onClick;


      return _react2.default.createElement('path', { id: id,
        style: (0, _extends3.default)({}, style),
        d: (0, _draw.AnnulusSector)(this.props), fill: fill,
        stroke: fill, strokeWidth: 1 // to eliminate annoying white border line
        , pointerEvents: 'all',
        onMouseEnter: onMouseEnter && this.mouseEventProxy,
        onMouseLeave: onMouseLeave && this.mouseEventProxy,
        onMouseMove: onMouseMove && this.mouseEventProxy,
        onMouseOver: onMouseOver && this.mouseEventProxy,
        onClick: onClick && this.mouseEventProxy
      });
    }
  }]);
  return AnnulusSector;
}(_react.PureComponent);

exports.default = AnnulusSector;


AnnulusSector.defaultProps = {
  cx: 0,
  cy: 0,
  fill: 'none',
  offsetAngle: 0
};

AnnulusSector.propTypes = {
  cx: _propTypes2.default.number,
  cy: _propTypes2.default.number,
  endAngle: _propTypes2.default.number.isRequired,
  innerRadius: _propTypes2.default.number.isRequired,
  outerRadius: _propTypes2.default.number.isRequired,
  startAngle: _propTypes2.default.number.isRequired,
  offsetAngle: _propTypes2.default.number
};