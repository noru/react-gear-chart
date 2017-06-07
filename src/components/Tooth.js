// @flow
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { sumBy } from 'lodash-es'
import AnnulusSector from './AnnulusSector'
import GLC from './GearListChart'
import classnames from 'classnames'
import { RadialText } from '../utils/draw'

type Strip = {
  color: string,
  weight: number,
}

type ToothProps = {
  startAngle: number,
  endAngle: number,
  offsetAngle: number,
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  mode: 'layer' | 'spokerib' | 'bar',
  strips: Strip | Array<Strip>,
  label: string,
  labelMargin: number,
  labelDirection: 'radial' | 'span' | 'tangent',
}

export default class Tooth extends PureComponent<void, ToothProps, void> {

  state = {
    focused: false,
  }

  _renderLabel() {
    switch (this.props.labelDirection) {
      case 'span':
        return this._renderSpanLabel()
      case 'tangent':
        return this._renderTangentLabel()
      default: // 'radial'
        return this._renderRadialLabel()
    }
  }

  _renderRadialLabel() {
    let { startAngle, innerRadius, label, cx, cy, offsetAngle, labelMargin } = this.props
    let centerlineAngle = startAngle + offsetAngle + this.toothAngle() / 2
    let { x, y, textAnchor, rotate } = RadialText(innerRadius + labelMargin , centerlineAngle, cx, cy)
    return (<text
      className="tooth-label"
      ref="label"
      pointerEvents="none"
      x={x} y={y} 
      textAnchor={textAnchor}
      transform={`rotate(${rotate.join(',')})`}>{label}</text>)
  }

  _renderSpanLabel() {
  }

  _renderTangentLabel() {
  }

   _renderSpokerib() {

    let { startAngle, endAngle, innerRadius, outerRadius } = this.props
    let strips = this.strips()
    let divisor = sumBy(strips, 'weight')
    let toothAngle = endAngle - startAngle
    let _startAngle = startAngle

    return (<g className={classnames("tooth-annulus-sector")} ref="sector">
      { strips.map((_, i) => {
        let stripAngle = (_.weight / divisor) * toothAngle
        let _id = _.id || i
        return this._commonSector(i, _id, _startAngle, _startAngle += stripAngle, outerRadius, innerRadius, _.color)
      }) }
    </g>)
  }
  _renderLayer() {
    let { startAngle, endAngle, innerRadius } = this.props
    let strips = this.strips()
    let toothHeight = this.toothHeight()
    let _step = 0
    return (<g className={classnames("tooth-annulus-sector")} ref="sector">
      { strips.map((_, i) => {
          let _innerR = innerRadius + _step
          let _height = _.weight * toothHeight
          let _outerR = _innerR + _height
          _step += _height
          let _id = _.id || i
          return this._commonSector(i, _id, startAngle, endAngle, _outerR, _innerR, _.color)
      }) }
    </g>)
  }

  _renderBar() {
    let { startAngle, innerRadius } = this.props
    let strips = this.strips()
    let toothHeight = this.toothHeight()

    let _perItemAngle = this.toothAngle() / strips.length
    return (
      <g className={classnames("tooth-annulus-sector")}  ref="sector">
        { strips.map((_, i) => {
            let _start = startAngle + i * _perItemAngle
            let _end = _start+ _perItemAngle
            let _height = _.weight * toothHeight
            let _id = _.id || i
            let _outerR = innerRadius + _height
            return this._commonSector(i, _id, _start, _end, _outerR, innerRadius, _.color)
        })}
      </g>
    )
  }

  _commonSector(key, id, startAngle, endAngle, outerR, innerR, color) {
    let { cx, cy, offsetAngle, style, 
      onMouseMove, onMouseEnter, onMouseLeave, onMouseOver, onClick } = this.props
    return (
      <AnnulusSector 
        key={key}
        id={id}
        className="tooth-annulus-sector-path"
        style={this.strips()[key].type !== 'placeholder' && style}
        startAngle={startAngle} endAngle={endAngle}
        outerRadius={outerR} innerRadius={innerR}
        offsetAngle={offsetAngle}
        cx={cx} cy={cy}
        fill={color}
        onMouseMove={onMouseMove && this.mouseEventProxy.bind(this)}
        onMouseOver={onMouseOver && this.mouseEventProxy.bind(this)}
        onMouseEnter={onMouseEnter && this.mouseEventProxy.bind(this)}
        onMouseLeave={onMouseLeave && this.mouseEventProxy.bind(this)}
        onClick={onClick && this.mouseEventProxy.bind(this)}
      />
    )
  }

  mouseEventProxy = (evt) => {
    evt.stripData = this.strips()[evt.sectorId] //TODO: expose a func 'GetStripById' ?
    evt.stripData.id = evt.sectorId
    evt.strips = this.strips()
    let name = GLC.getRegistrationName(evt)
    this.props[name](evt)
    if (name === 'onClick') {
      let { tooth } = this.refs
      if (evt.target === tooth || tooth.contains(evt.target)) {
        if (tooth.classList.contains('focused')) {
          tooth.classList.remove('focused')
        } else {
          tooth.classList.add('focused')
        }
      }
    }
  }

  strips() {
    let strips = this.props.strips
    return Array.isArray(strips) ? strips : [ strips ]
  }

  toothAngle() {
    return this.props.endAngle - this.props.startAngle
  }

  toothHeight() {
    return this.props.outerRadius -this.props.innerRadius
  }  

  render() {
    let { label, mode } = this.props
    let tooth
    switch (mode) {
      case 'layer':
        tooth = this._renderLayer()
        break
      case 'bar':
        tooth = this._renderBar()
        break
      default: // 'spokerib'
        tooth = this._renderSpokerib()
    }
    return (
      <g className="tooth" ref="tooth">
        { tooth }
        { label && this._renderLabel() }
      </g>
    )
  }
}

Tooth.defaultProps = {
  cx: 0,
  cy: 0,
  labelDirection: 'radial',
  labelMargin: 10,
  offsetAngle: 0
}

Tooth.propTypes = {
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  strips: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
}