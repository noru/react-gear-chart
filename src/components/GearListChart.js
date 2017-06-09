// @flow
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import classnames from 'classnames'
import Tooth from './Tooth'
import { AnnulusViewport, NormalizeAngleRange } from '../utils/math'

type Strip = {
  color: string,
  weight: number,
}

type ToothItem = {
  mode: string,
  label: string,
  strips: Strip | Array<Strip>
}

type GearListProps = {
  id: string,
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
  margin: number,
  limit: number,
  clockwise: boolean, // items line-up direction
  clockwiseAnimate: boolean,
  motionConfig: object,
  items: Array<ToothItem>,
  extra: React$Element
}

const Styles = {
  container: {
    display: 'inline-block',
    padding: '1em',
  },
  pointer: {
    cursor: 'pointer',
  }
}
/**
 * Use Polar Coordinate System with convention:
 * https://en.wikipedia.org/wiki/Polar_coordinate_system#/media/File:Polar_graph_paper.svg
 */
export default class GearListChart extends PureComponent<void, GearListProps, void> {

  static getToothParam(index, angle, margin, baseAngle, clockwise = false) {
    let _factor = clockwise ? -1 : 1
    let start = baseAngle + index * angle * _factor
    let end = start + angle * _factor - margin * _factor
    return [ start, end ].sort((a, b) => a - b)
  }

  static getRegistrationName(evt) {
    return evt.dispatchConfig.registrationName || 
           evt.dispatchConfig.phasedRegistrationNames.bubbled
  }

  state = {
    childFocused: false,
  }

  mouseEventProxy = (evt) => {
    let name = GearListChart.getRegistrationName(evt)
    this.props[name](evt)
    if (name === 'onClick') {
      let self = this.refs.chart
      let teeth = self.querySelectorAll('.tooth')
      let focusedTooth = self.querySelector('.tooth.focused')
      if (focusedTooth && focusedTooth.contains(evt.target) && this.state.childFocused) {
        this.setState({ childFocused: false })
      } else {
        this.setState({ childFocused: true })
      }
      teeth.forEach(t => t.classList.remove('focused'))
    }
  }
  /** willEnter for react-motion */
  motionWillEnter = () => {
    let { clockwiseAnimate } = this.props
    let totalAnagle = this.totalAnagle()
    let style = {
      offsetAngle: clockwiseAnimate ? -totalAnagle : totalAnagle, 
      opacity: 0
    }
    return style
  }

  /** willLeave for react-motion */
  motionWillLeave = () => {
    let { clockwiseAnimate, motionConfig } = this.props
    let totalAnagle = this.totalAnagle()
    let style = {
      offsetAngle: spring(clockwiseAnimate ? totalAnagle : -totalAnagle, motionConfig), 
      opacity: spring(0, { stiffness: 80 })
    }
    return style
  }

  /** Clear focus status if need to */
  clearFocus = () => { 
    let focused = this.refs.chart.querySelector('.tooth.focused')
    focused && focused.classList.remove('focused')
    this.setState({ childFocused: false })
  }

  isFocused = () => this.refs.chart.classList.contains('child-focused')

  totalAnagle() {
    let { endAngle, startAngle } = this.props
    let [ _startAngle, _endAngle ] = NormalizeAngleRange(startAngle, endAngle)
    return _endAngle - _startAngle
  }

  render() {
    let { id, innerRadius, outerRadius, items, margin, limit, startAngle, endAngle, 
      clockwise, clockwiseAnimate, motionConfig, className, style, extra,
      onMouseMove, onMouseEnter, onMouseLeave, onMouseOver, onClick, ...restProps } = this.props

    if(!items || !items.length ) return null

    let { childFocused } = this.state
    let [ _startAngle, _endAngle ] = NormalizeAngleRange(startAngle, endAngle)
    let [ width, height, cx, cy ] = AnnulusViewport(startAngle, endAngle, outerRadius, innerRadius, 10)
    let _perItemAngle = this.totalAnagle() / items.length
    if (_perItemAngle > limit) _perItemAngle = limit
    if (clockwise) {
      /* shift half of the margin to centerize teeth */
      _startAngle = _endAngle - margin / 2
    } else {
      _startAngle = _startAngle + margin / 2 
    }

    return (
      <div id={id} ref="chart" className={classnames('gear-list-chart', className, childFocused ? 'child-focused' : '')} 
        style={[Styles.container, style]} {...restProps}>

        <svg width={width} height={height}>
          <TransitionMotion
            willEnter={this.motionWillEnter}
            willLeave={this.motionWillLeave}
            defaultStyles={items.map((item, i) => ({
              key: item.id || String(i),
              data: item,
              style: {
                offsetAngle: this.totalAnagle() * (clockwiseAnimate ? -1 : 1),
                opacity: 1
              }
            }))}
            styles={items.map((item, i) => ({
              key: item.id || String(i),
              data: item,
              style: {
                offsetAngle: spring(0, motionConfig),
                opacity: 1
              }
            }))}
          >
            { interpolated =>
                (<g transform={`translate(${cx}, ${cy})`}>{
                  interpolated.map((conf, i) => {
                    let item = conf.data
                    // before item's leave it stays in interpolated array, "i % items.length" to get correct position
                    i = i % items.length
                    let [ start, end ] = GearListChart.getToothParam(i, _perItemAngle , margin, _startAngle, clockwise)
                    return (
                      <g key={conf.key || i}>
                        <Tooth
                          style={{ cursor: onClick ? 'pointer': 'inherit', opacity: conf.style.opacity }}
                          startAngle={start}
                          endAngle={end}
                          offsetAngle={+conf.style.offsetAngle}
                          cx={0}
                          cy={0}
                          outerRadius={outerRadius}
                          innerRadius={innerRadius}
                          index={i}
                          data={item}
                          mode={item.mode}
                          label={item.label}
                          strips={item.strips}
                          onMouseMove={onMouseMove && this.mouseEventProxy}
                          onMouseLeave={onMouseLeave && this.mouseEventProxy}
                          onMouseEnter={onMouseEnter && this.mouseEventProxy}
                          onMouseOver={onMouseOver && this.mouseEventProxy}
                          onClick={onClick && this.mouseEventProxy}
                          extra={extra}
                        />
                      </g>
                    )
                  })
                }</g>)
            }
          </TransitionMotion>
        </svg>
      </div>
    )
  }
}

GearListChart.defaultProps = {
  limit: 90,
  startAngle: 0,
  endAngle: 0,
  margin: 0,
  clockwise: true,
  clockwiseAnimate: true,
  motionConfig: {},
}

GearListChart.propTypes = {
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  margin: PropTypes.number,
  limit: PropTypes.number,
}
