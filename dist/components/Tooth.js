'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _lodashEs = require('lodash-es');

var _AnnulusSector = require('./AnnulusSector');

var _AnnulusSector2 = _interopRequireDefault(_AnnulusSector);

var _GearListChart = require('./GearListChart');

var _GearListChart2 = _interopRequireDefault(_GearListChart);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draw = require('../utils/draw');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooth = function (_PureComponent) {
  (0, _inherits3.default)(Tooth, _PureComponent);

  function Tooth() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tooth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tooth.__proto__ || (0, _getPrototypeOf2.default)(Tooth)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focused: false
    }, _this.mouseEventProxy = function (evt) {
      evt.stripData = _this.strips()[evt.sectorId]; //TODO: expose a func 'GetStripById' ?
      evt.stripData.id = evt.sectorId;
      evt.strips = _this.strips();
      var name = _GearListChart2.default.getRegistrationName(evt);
      _this.props[name](evt);
      if (name === 'onClick') {
        var tooth = _this.refs.tooth;

        if (evt.target === tooth || tooth.contains(evt.target)) {
          if (tooth.classList.contains('focused')) {
            tooth.classList.remove('focused');
          } else {
            tooth.classList.add('focused');
          }
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tooth, [{
    key: '_renderLabel',
    value: function _renderLabel() {
      switch (this.props.labelDirection) {
        case 'span':
          return this._renderSpanLabel();
        case 'tangent':
          return this._renderTangentLabel();
        default:
          // 'radial'
          return this._renderRadialLabel();
      }
    }
  }, {
    key: '_renderRadialLabel',
    value: function _renderRadialLabel() {
      var _props = this.props,
          startAngle = _props.startAngle,
          innerRadius = _props.innerRadius,
          label = _props.label,
          cx = _props.cx,
          cy = _props.cy,
          offsetAngle = _props.offsetAngle,
          labelMargin = _props.labelMargin,
          style = _props.style;

      var centerlineAngle = startAngle + offsetAngle + this.toothAngle() / 2;

      var _RadialText = (0, _draw.RadialText)(innerRadius + labelMargin, centerlineAngle, cx, cy),
          x = _RadialText.x,
          y = _RadialText.y,
          textAnchor = _RadialText.textAnchor,
          rotate = _RadialText.rotate;

      return _react2.default.createElement(
        'text',
        {
          style: style,
          className: 'tooth-label',
          ref: 'label',
          pointerEvents: 'none',
          x: x, y: y,
          textAnchor: textAnchor,
          transform: 'rotate(' + rotate.join(',') + ')' },
        label
      );
    }
  }, {
    key: '_renderSpanLabel',
    value: function _renderSpanLabel() {}
  }, {
    key: '_renderTangentLabel',
    value: function _renderTangentLabel() {}
  }, {
    key: '_renderSpokerib',
    value: function _renderSpokerib() {
      var _this2 = this;

      var _props2 = this.props,
          startAngle = _props2.startAngle,
          endAngle = _props2.endAngle,
          innerRadius = _props2.innerRadius,
          outerRadius = _props2.outerRadius;

      var strips = this.strips();
      var divisor = (0, _lodashEs.sumBy)(strips, 'weight');
      var toothAngle = endAngle - startAngle;
      var _startAngle = startAngle;

      return _react2.default.createElement(
        'g',
        { className: (0, _classnames2.default)("tooth-annulus-sector"), ref: 'sector' },
        strips.map(function (_, i) {
          var stripAngle = _.weight / divisor * toothAngle;
          var _id = _.id || i;
          return _this2._commonSector(i, _id, _startAngle, _startAngle += stripAngle, outerRadius, innerRadius, _.color);
        })
      );
    }
  }, {
    key: '_renderLayer',
    value: function _renderLayer() {
      var _this3 = this;

      var _props3 = this.props,
          startAngle = _props3.startAngle,
          endAngle = _props3.endAngle,
          innerRadius = _props3.innerRadius;

      var strips = this.strips();
      var toothHeight = this.toothHeight();
      var _step = 0;
      return _react2.default.createElement(
        'g',
        { className: (0, _classnames2.default)("tooth-annulus-sector"), ref: 'sector' },
        strips.map(function (_, i) {
          var _innerR = innerRadius + _step;
          var _height = _.weight * toothHeight;
          var _outerR = _innerR + _height;
          _step += _height;
          var _id = _.id || i;
          return _this3._commonSector(i, _id, startAngle, endAngle, _outerR, _innerR, _.color);
        })
      );
    }
  }, {
    key: '_renderBar',
    value: function _renderBar() {
      var _this4 = this;

      var _props4 = this.props,
          startAngle = _props4.startAngle,
          innerRadius = _props4.innerRadius;

      var strips = this.strips();
      var toothHeight = this.toothHeight();

      var _perItemAngle = this.toothAngle() / strips.length;
      return _react2.default.createElement(
        'g',
        { className: (0, _classnames2.default)("tooth-annulus-sector"), ref: 'sector' },
        strips.map(function (_, i) {
          var _start = startAngle + i * _perItemAngle;
          var _end = _start + _perItemAngle;
          var _height = _.weight * toothHeight;
          var _id = _.id || i;
          var _outerR = innerRadius + _height;
          return _this4._commonSector(i, _id, _start, _end, _outerR, innerRadius, _.color);
        })
      );
    }
  }, {
    key: '_commonSector',
    value: function _commonSector(key, id, startAngle, endAngle, outerR, innerR, color) {
      var _props5 = this.props,
          cx = _props5.cx,
          cy = _props5.cy,
          offsetAngle = _props5.offsetAngle,
          style = _props5.style,
          onMouseMove = _props5.onMouseMove,
          onMouseEnter = _props5.onMouseEnter,
          onMouseLeave = _props5.onMouseLeave,
          onMouseOver = _props5.onMouseOver,
          onClick = _props5.onClick;

      return _react2.default.createElement(_AnnulusSector2.default, {
        key: key,
        id: id,
        className: 'tooth-annulus-sector-path',
        style: this.strips()[key].type !== 'placeholder' && style,
        startAngle: startAngle, endAngle: endAngle,
        outerRadius: outerR, innerRadius: innerR,
        offsetAngle: offsetAngle,
        cx: cx, cy: cy,
        fill: color,
        onMouseMove: onMouseMove && this.mouseEventProxy.bind(this),
        onMouseOver: onMouseOver && this.mouseEventProxy.bind(this),
        onMouseEnter: onMouseEnter && this.mouseEventProxy.bind(this),
        onMouseLeave: onMouseLeave && this.mouseEventProxy.bind(this),
        onClick: onClick && this.mouseEventProxy.bind(this)
      });
    }
  }, {
    key: 'strips',
    value: function strips() {
      var strips = this.props.strips;
      return Array.isArray(strips) ? strips : [strips];
    }
  }, {
    key: 'toothAngle',
    value: function toothAngle() {
      return this.props.endAngle - this.props.startAngle;
    }
  }, {
    key: 'toothHeight',
    value: function toothHeight() {
      return this.props.outerRadius - this.props.innerRadius;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          label = _props6.label,
          mode = _props6.mode,
          style = _props6.style,
          extra = _props6.extra,
          offsetAngle = _props6.offsetAngle,
          clockwiseAnimate = _props6.clockwiseAnimate;

      var props = (0, _lodashEs.clone)(this.props);
      var factor = clockwiseAnimate ? -1 : 1;
      props.startAngle += offsetAngle * factor;
      props.endAngle += offsetAngle * factor;
      var tooth = void 0;
      switch (mode) {
        case 'layer':
          tooth = this._renderLayer();
          break;
        case 'bar':
          tooth = this._renderBar();
          break;
        default:
          // 'spokerib'
          tooth = this._renderSpokerib();
      }
      return _react2.default.createElement(
        'g',
        { className: 'tooth', ref: 'tooth', style: style },
        tooth,
        label && this._renderLabel(),
        extra && extra(props)
      );
    }
  }]);
  return Tooth;
}(_react.PureComponent);

exports.default = Tooth;


Tooth.defaultProps = {
  cx: 0,
  cy: 0,
  labelDirection: 'radial',
  labelMargin: 10,
  offsetAngle: 0
};

Tooth.propTypes = {
  innerRadius: _propTypes2.default.number.isRequired,
  outerRadius: _propTypes2.default.number.isRequired,
  startAngle: _propTypes2.default.number.isRequired,
  endAngle: _propTypes2.default.number.isRequired,
  strips: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired
};