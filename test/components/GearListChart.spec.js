import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount, shallow, render } from 'enzyme'
import Perf from 'react-addons-perf'
import GearListChart from '../../src/components/GearListChart'
import { GenerateTeethData } from '../../src/utils/helpers'


describe('<GearListChart />', () => {

  const items = GenerateTeethData(15)
  const gearList = <GearListChart
    startAngle={0}
    endAngle={360}
    outerRadius={500}
    innerRadius={400}
    margin={3}
    items={items}
  />
  
  beforeEach(() => {
    Perf.start()
  })

  afterEach(function() {
    Perf.stop()
    console.info('Perf: '.green + this.currentTest.title.blue + ': ' )
    Perf.printInclusive(Perf.getLastMeasurements())
  })

  it('performance benchmark',function(done) {
    this.timeout(60)
    let wrapper = render(gearList)
    expect(wrapper.html()).to.not.be.null
    done()
  })

  it('should contains 1 <div>, 1 <svg>, 15 <Tooth>', function() {
    let wrapper = mount(gearList)
    expect(wrapper.find('div')).to.have.length(1)
    expect(wrapper.find('div > svg')).to.have.length(1)
    expect(wrapper.find('Tooth')).to.have.length(15)
  })

  it('should have valid width/height', function() {
    let wrapper = shallow(gearList).find('svg')
    expect(wrapper.prop('width')).to.be.equal(1010)
    expect(wrapper.prop('height')).to.be.equal(1010)
  })

  it('should not set onMouseMove to Teeth if no hanlder supplied', function() {
    let wrapper = shallow(gearList)
    wrapper.find('Tooth').forEach(node => expect(node.prop('onMouseMove')).to.be.undefined)
  })

  it('should propogate `mousemove` event properly, id is attached to event obj', function() {
    let evts = []
    let mouseMoveSpy = sinon.spy(e => evts.push(e))
    let wrapper = mount(gearList)
    wrapper.setProps({ onMouseMove: mouseMoveSpy })
    let handlers = []
    wrapper.find('Tooth').forEach(node => {
      handlers.push(node.prop('onMouseMove'))
    })

    expect(handlers).to.have.length(15)
    expect(handlers.every(h => h !== undefined)).to.be.true
    handlers.forEach(h => h({ dispatchConfig: { phasedRegistrationNames: { bubbled: 'onMouseMove'} } }))
    expect(evts).to.have.length(15)
    expect(mouseMoveSpy.callCount).to.be.equal(15)
  })

})
