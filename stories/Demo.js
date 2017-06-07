/* @flow */
import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import GearListChart from '../src/components/GearListChart'
import { GenerateTeethData } from '../src/utils/helpers.js'

export default class Demo extends Component {

  state = {
    startAngle: 90,
    endAngle: 270,
    outerRadius: 320,
    innerRadius: 250,
    amount: 8,
    margin: 3,
    clockwise: false,
    clockwiseAnimate: false,
    items: null,
  }

  changeMode = evt => {
    let mode = evt.target.textContent.toLowerCase()
    this.setState({ items: GenerateTeethData(this.state.amount, mode.startsWith('Total') ? undefined : mode) })
  }

  changeValue = evt => {
    let prop = evt.target.getAttribute('data-prop')
    let value = +evt.target.value
    if (prop === 'amount') {
      this.setState({ items: GenerateTeethData(value)})
    } else {
      this.setState({ [prop]: value })
    }
  }
  render() {
    let { startAngle, endAngle, outerRadius, innerRadius, margin, amount, items, 
      clockwise, clockwiseAnimate } = this.state
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
          clockwiseAnimate={clockwiseAnimate}
          items={items || GenerateTeethData(amount)}
        />
      </div>
    )
  }
}
