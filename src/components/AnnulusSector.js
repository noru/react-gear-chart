import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import GLC from './GearListChart'
import { AnnulusSector as AsPath } from '../utils/draw'

export default class AnnulusSector extends PureComponent {
  
  _attachDataToEvent = (evt) => {
    evt.persist()
    evt.sectorId = this.props.id
  }

  mouseEventProxy = (evt) => {
    this._attachDataToEvent(evt)
    this.props[GLC.getRegistrationName(evt)](evt)
  }

  render() {
    let { id, fill, style,
      onMouseMove, onMouseEnter, onMouseLeave, onMouseOver, onClick } = this.props
    
    return (<path id={id}
      style={{...style}}
      d={AsPath(this.props)} fill={fill}
      stroke={fill} strokeWidth={1}  // to eliminate annoying white border line
      pointerEvents="all" 
      onMouseEnter={onMouseEnter && this.mouseEventProxy}
      onMouseLeave={onMouseLeave && this.mouseEventProxy}
      onMouseMove={onMouseMove && this.mouseEventProxy}
      onMouseOver={onMouseOver && this.mouseEventProxy}
      onClick={onClick && this.mouseEventProxy}
    />)
  }
}

AnnulusSector.defaultProps = {
  cx: 0,
  cy: 0,
  fill: 'none',
  offsetAngle: 0,
}

AnnulusSector.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  endAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  offsetAngle: PropTypes.number,
}