'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _reactMotion = require('react-motion');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Tooth = require('./Tooth');

var _Tooth2 = _interopRequireDefault(_Tooth);

var _math = require('../utils/math');

var _shouldUpdate = require('should-update');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shouldUpdateProps = ['id', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'margin', 'limit', 'clockwise', 'items', 'extra'];


var Styles = {
  container: {
    display: 'inline-block',
    padding: '1em'
  },
  pointer: {
    cursor: 'pointer'
  }
};
/**
 * Use Polar Coordinate System with convention:
 * https://en.wikipedia.org/wiki/Polar_coordinate_system#/media/File:Polar_graph_paper.svg
 */

var GearListChart = function (_PureComponent) {
  (0, _inherits3.default)(GearListChart, _PureComponent);

  function GearListChart() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, GearListChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = GearListChart.__proto__ || (0, _getPrototypeOf2.default)(GearListChart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      childFocused: false
    }, _this.mouseEventProxy = function (evt) {
      var name = GearListChart.getRegistrationName(evt);
      _this.props[name](evt);
      if (name === 'onClick') {
        var self = _this.refs.chart;
        var teeth = self.querySelectorAll('.tooth');
        var focusedTooth = self.querySelector('.tooth.focused');
        if (focusedTooth && focusedTooth.contains(evt.target) && _this.state.childFocused) {
          _this.setState({ childFocused: false });
        } else {
          _this.setState({ childFocused: true });
        }
        teeth.forEach(function (t) {
          return t.classList.remove('focused');
        });
      }
    }, _this.motionWillEnter = function () {
      var clockwiseAnimate = _this.props.clockwiseAnimate;

      var totalAnagle = _this.totalAnagle();
      var style = {
        offsetAngle: clockwiseAnimate ? -totalAnagle : totalAnagle,
        opacity: 0
      };
      return style;
    }, _this.motionWillLeave = function () {
      var _this$props = _this.props,
          clockwiseAnimate = _this$props.clockwiseAnimate,
          motionConfig = _this$props.motionConfig;

      var totalAnagle = _this.totalAnagle();
      var style = {
        offsetAngle: (0, _reactMotion.spring)(clockwiseAnimate ? totalAnagle : -totalAnagle, motionConfig),
        opacity: (0, _reactMotion.spring)(0, motionConfig)
      };
      return style;
    }, _this.clearFocus = function () {
      var focused = _this.refs.chart.querySelector('.tooth.focused');
      focused && focused.classList.remove('focused');
      _this.setState({ childFocused: false });
    }, _this.isFocused = function () {
      return _this.refs.chart.classList.contains('child-focused');
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(GearListChart, [{
    key: 'totalAnagle',
    value: function totalAnagle() {
      var _props = this.props,
          endAngle = _props.endAngle,
          startAngle = _props.startAngle;

      var _NormalizeAngleRange = (0, _math.NormalizeAngleRange)(startAngle, endAngle),
          _NormalizeAngleRange2 = (0, _slicedToArray3.default)(_NormalizeAngleRange, 2),
          _startAngle = _NormalizeAngleRange2[0],
          _endAngle = _NormalizeAngleRange2[1];

      return _endAngle - _startAngle;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return (0, _shouldUpdate.shouldUpdate)(shouldUpdateProps, this.props, nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          id = _props2.id,
          innerRadius = _props2.innerRadius,
          outerRadius = _props2.outerRadius,
          items = _props2.items,
          margin = _props2.margin,
          limit = _props2.limit,
          startAngle = _props2.startAngle,
          endAngle = _props2.endAngle,
          clockwise = _props2.clockwise,
          clockwiseAnimate = _props2.clockwiseAnimate,
          motionConfig = _props2.motionConfig,
          className = _props2.className,
          style = _props2.style,
          extra = _props2.extra,
          onMouseMove = _props2.onMouseMove,
          onMouseEnter = _props2.onMouseEnter,
          onMouseLeave = _props2.onMouseLeave,
          onMouseOver = _props2.onMouseOver,
          onClick = _props2.onClick,
          restProps = (0, _objectWithoutProperties3.default)(_props2, ['id', 'innerRadius', 'outerRadius', 'items', 'margin', 'limit', 'startAngle', 'endAngle', 'clockwise', 'clockwiseAnimate', 'motionConfig', 'className', 'style', 'extra', 'onMouseMove', 'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onClick']);


      if (!items || !items.length) return null;

      var childFocused = this.state.childFocused;

      var _NormalizeAngleRange3 = (0, _math.NormalizeAngleRange)(startAngle, endAngle),
          _NormalizeAngleRange4 = (0, _slicedToArray3.default)(_NormalizeAngleRange3, 2),
          _startAngle = _NormalizeAngleRange4[0],
          _endAngle = _NormalizeAngleRange4[1];

      var _AnnulusViewport = (0, _math.AnnulusViewport)(startAngle, endAngle, outerRadius, innerRadius, 10),
          _AnnulusViewport2 = (0, _slicedToArray3.default)(_AnnulusViewport, 4),
          width = _AnnulusViewport2[0],
          height = _AnnulusViewport2[1],
          cx = _AnnulusViewport2[2],
          cy = _AnnulusViewport2[3];

      var _perItemAngle = this.totalAnagle() / items.length;
      if (_perItemAngle > limit) _perItemAngle = limit;
      if (clockwise) {
        /* shift half of the margin to centerize teeth */
        _startAngle = _endAngle - margin / 2;
      } else {
        _startAngle = _startAngle + margin / 2;
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ id: id, ref: 'chart', className: (0, _classnames2.default)('gear-list-chart', className, childFocused ? 'child-focused' : ''),
          style: [Styles.container, style] }, restProps),
        _react2.default.createElement(
          'svg',
          { width: width, height: height },
          _react2.default.createElement(
            _reactMotion.TransitionMotion,
            {
              willEnter: this.motionWillEnter,
              willLeave: this.motionWillLeave,
              defaultStyles: items.map(function (item, i) {
                return {
                  key: item.id || String(i),
                  data: item,
                  style: {
                    offsetAngle: _this2.totalAnagle() * (clockwiseAnimate ? -1 : 1),
                    opacity: 1
                  }
                };
              }),
              styles: items.map(function (item, i) {
                return {
                  key: item.id || String(i),
                  data: item,
                  style: {
                    offsetAngle: (0, _reactMotion.spring)(0, motionConfig),
                    opacity: 1
                  }
                };
              })
            },
            function (interpolated) {
              return _react2.default.createElement(
                'g',
                { transform: 'translate(' + cx + ', ' + cy + ')' },
                interpolated.map(function (conf, i) {
                  var item = conf.data;
                  // before item's leave it stays in interpolated array, have to get correct position
                  var leaveItemsCount = interpolated.length - items.length;
                  if (i >= leaveItemsCount) {
                    i -= leaveItemsCount;
                  }

                  var _GearListChart$getToo = GearListChart.getToothParam(i, _perItemAngle, margin, _startAngle, clockwise),
                      _GearListChart$getToo2 = (0, _slicedToArray3.default)(_GearListChart$getToo, 2),
                      start = _GearListChart$getToo2[0],
                      end = _GearListChart$getToo2[1];

                  return _react2.default.createElement(
                    'g',
                    { key: conf.key || i },
                    _react2.default.createElement(_Tooth2.default, {
                      style: { cursor: onClick ? 'pointer' : 'inherit', opacity: conf.style.opacity },
                      startAngle: start,
                      endAngle: end,
                      offsetAngle: +conf.style.offsetAngle,
                      cx: 0,
                      cy: 0,
                      outerRadius: outerRadius,
                      innerRadius: innerRadius,
                      index: i,
                      data: item,
                      mode: item.mode,
                      label: item.label,
                      strips: item.strips,
                      onMouseMove: onMouseMove && _this2.mouseEventProxy,
                      onMouseLeave: onMouseLeave && _this2.mouseEventProxy,
                      onMouseEnter: onMouseEnter && _this2.mouseEventProxy,
                      onMouseOver: onMouseOver && _this2.mouseEventProxy,
                      onClick: onClick && _this2.mouseEventProxy,
                      extra: extra
                    })
                  );
                })
              );
            }
          )
        )
      );
    }
  }], [{
    key: 'getToothParam',
    value: function getToothParam(index, angle, margin, baseAngle) {
      var clockwise = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var _factor = clockwise ? -1 : 1;
      var start = baseAngle + index * angle * _factor;
      var end = start + angle * _factor - margin * _factor;
      return [start, end].sort(function (a, b) {
        return a - b;
      });
    }
  }, {
    key: 'getRegistrationName',
    value: function getRegistrationName(evt) {
      return evt.dispatchConfig.registrationName || evt.dispatchConfig.phasedRegistrationNames.bubbled;
    }
    /** willEnter for react-motion */


    /** willLeave for react-motion */


    /** Clear focus status if need to */

  }]);
  return GearListChart;
}(_react.PureComponent);

exports.default = GearListChart;


GearListChart.defaultProps = {
  limit: 90,
  startAngle: 0,
  endAngle: 0,
  margin: 0,
  clockwise: true,
  clockwiseAnimate: true,
  motionConfig: {}
};

GearListChart.propTypes = {
  startAngle: _propTypes2.default.number.isRequired,
  endAngle: _propTypes2.default.number.isRequired,
  innerRadius: _propTypes2.default.number.isRequired,
  outerRadius: _propTypes2.default.number.isRequired,
  margin: _propTypes2.default.number,
  limit: _propTypes2.default.number
};