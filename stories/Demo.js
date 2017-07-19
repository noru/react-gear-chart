import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import GearListChart from '../src/components/GearListChart'
import { GenerateTeethData } from '../src/utils/helpers.js'
import { NormalizeAngleRange, Polar2Cartesian } from '../src/utils/math'
import './demo.css'

const ExtraComponent = props => {
  let { startAngle, endAngle, innerRadius } = props
  let [ _startAngle, _endAngle ] = NormalizeAngleRange(startAngle, endAngle)
  let [x, y] = Polar2Cartesian(innerRadius - 13, (_endAngle + _startAngle) / 2)

  // y-axis has opposite direction in browser
  return <text x={x} y={-y}>❤️</text>
}

export default class Demo extends Component {

  state = {
    startAngle: 90,
    endAngle: 270,
    outerRadius: 320,
    innerRadius: 250,
    amount: 8,
    margin: 3,
    clockwise: false,
    animate: true,
    clockwiseAnimate: false,
    showExtra: true,
    items: GenerateTeethData(8),
  }

  changeMode = evt => {
    let mode = evt.target.textContent.toLowerCase()
    this.setState({ items: GenerateTeethData(this.state.amount, mode.startsWith('Total') ? undefined : mode) })
  }

  changeValue = evt => {
    let prop = evt.target.getAttribute('data-prop')
    let value = +evt.target.value
    if (prop === 'amount') {
      this.setState({ items: GenerateTeethData(value), amount: value })
    } else {
      this.setState({ [prop]: value })
    }
  }
  render() {
    let { startAngle, endAngle, outerRadius, innerRadius, margin, amount, items,
      animate, clockwise, clockwiseAnimate, showExtra } = this.state
    return (
      <div className="app">
        <label>Start Angle</label>
        <DebounceInput
          data-prop="startAngle"
          value={startAngle}
          debounceTimeout={800}
          onChange={this.changeValue} />
        <label>End Angle</label>
        <DebounceInput
          data-prop="endAngle"
          value={endAngle}
          debounceTimeout={800}
          onChange={this.changeValue} />
        <br/>
        <label>Outer Radius</label>
        <DebounceInput
          data-prop="outerRadius"
          value={outerRadius}
          debounceTimeout={800}
          onChange={this.changeValue} />
        <label>Inner Radius</label>
        <DebounceInput
          data-prop="innerRadius"
          value={innerRadius}
          debounceTimeout={800}
          onChange={this.changeValue} />
        <br/>
        <label>Margin</label>
        <DebounceInput
          data-prop="margin"
          value={margin}
          debounceTimeout={800}
          onChange={this.changeValue} />
        <label>Teeth amount</label>
        <DebounceInput
          data-prop="amount"
          value={amount}
          debounceTimeout={800}
          onChange={this.changeValue} />

        <br/>
        <label htmlFor="animate-on-off">
          <input name="animate-on-off" type="checkbox" onChange={() => this.setState({animate: !animate})} checked={animate}/>
          Animate On
        </label>
        <br/>

        <label htmlFor="clockwise">
          <input name="clockwise" type="checkbox" onChange={() => this.setState({clockwise: !clockwise})} checked={clockwise}/>
          Clockwise
        </label>
        <br/>

        <label htmlFor="clockwise-anim">
          <input name="clockwise-anim" type="checkbox" onChange={() => this.setState({clockwiseAnimate: !clockwiseAnimate})} checked={clockwiseAnimate}/>
          Clockwise Animate
        </label>
        <br/>

        <label htmlFor="extra-component">
          <input name="extra-component" type="checkbox" onChange={() => this.setState({showExtra: !showExtra})} checked={showExtra}/>
          Render extra component
        </label>
        <br/>

        <button onClick={this.changeMode}>Total Chaos!</button>
        <button onClick={this.changeMode}>Spokerib</button>
        <button onClick={this.changeMode}>Layer</button>
        <button onClick={this.changeMode}>Bar</button>
        <br/>

        <GearListChart
          id="demo"
          startAngle={startAngle} endAngle={endAngle}
          outerRadius={outerRadius} innerRadius={innerRadius}
          margin={margin}
          clockwise={clockwise}
          animate={animate}
          clockwiseAnimate={clockwiseAnimate}
          items={items}
          extra={showExtra && ExtraComponent}
          onClick={ evt => console.log(evt) }
        />
      </div>
    )
  }
}
