import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount, shallow, render } from 'enzyme'
import Perf from 'react-addons-perf'
import AnnulusSector from '../../src/components/AnnulusSector'


describe('<AnnulusSector />', () => {

  const annulusSector = <AnnulusSector 
    startAngle={0}
    endAngle={45}
    outerRadius={10}
    innerRadius={20}
    cx={0}
    cy={0}
    fill="red"
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
    this.timeout(20)
    let wrapper = render(annulusSector)
    expect(wrapper.html()).to.not.be.null
    done()
  })

  it('renders correct d, fill, stroke, stroke-width', function() {
    let wrapper = shallow(annulusSector)
    expect(wrapper.prop('d')).to.startsWith('M')
    expect(wrapper.prop('d')).to.endsWith('z')
    expect(wrapper.prop('fill')).to.equal('red')
    expect(wrapper.prop('stroke')).to.equal('red')
    expect(wrapper.prop('strokeWidth')).to.equal(1)
  })

  it('should not listen to `mousemove` if no hanlder supplied', function() {
    let wrapper = shallow(annulusSector)
    expect(wrapper.prop('onMouseMove')).to.be.undefined
  })

  it('should propogate `mousemove` event properly, id is attached to event obj', function() {
    let wrapper = shallow(annulusSector)
    let evt = null
    let mouseMoveSpy = sinon.spy(e => evt = e)
    let persistSpy = sinon.spy()
    wrapper.setProps({onMouseMove: mouseMoveSpy, id: 'id-str'})
    let hanlder = wrapper.find('path').prop('onMouseMove')

    expect(hanlder).to.not.be.undefined
    hanlder({ persist: persistSpy, dispatchConfig: { phasedRegistrationNames: { bubbled: 'onMouseMove'} } })
    expect(mouseMoveSpy.calledOnce).to.be.true
    expect(persistSpy.calledOnce).to.be.true
    expect(evt).to.not.be.null
    expect(evt.sectorId).to.equal('id-str')
  })
})
