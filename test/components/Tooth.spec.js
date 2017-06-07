import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount, shallow, render } from 'enzyme'
import Perf from 'react-addons-perf'
import Tooth from '../../src/components/Tooth'


describe('<Tooth />', () => {

  const strip1 = { color: 'red', weight: 1}
  const strip2 = { color: 'blue', weight: .5}

  const strips = [ strip1, strip2 ]
  
  beforeEach(() => {
    Perf.start()
  })

  afterEach(function() {
    Perf.stop()
    console.info('Perf: '.green + this.currentTest.title.blue + ': ' )
    Perf.printInclusive(Perf.getLastMeasurements())
  })

  it('performance benchmark',function(done) {
    this.timeout(30)
    let wrapper = render(<Tooth
      innerRadius={100}
      outerRadius={120}
      startAngle={0}
      endAngle={10}
      strips={strips}
    ></Tooth>)
    expect(wrapper.html()).to.not.be.null
    done()
  })

  it('should contains 1 root <g>, 1 strips container <g>', function() {
    let wrapper = shallow(<Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
    ></Tooth>)
    expect(wrapper.find('g').length).to.equal(2)
    expect(wrapper.find('g > g').length).to.equal(1)
  })

  it('should contains 1 <text> when label is supplied, none when not', function() {
    let wrapper = shallow(<Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
      label="label text"
    ></Tooth>)

    expect(wrapper.find('text').length).to.equal(1)
    expect(wrapper.find('text').text()).to.equal('label text')

    wrapper.setProps({label: null})
    expect(wrapper.find('text').length).to.equal(0)
  })

  it('should selectively call render method by mode', function() {

    ['_renderSpokerib', '_renderLayer', '_renderBar']
      .forEach(method => sinon.spy(Tooth.prototype, method))

    shallow(<Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
    />)
    expect(Tooth.prototype._renderSpokerib.calledOnce).to.equal(true)

    shallow(<Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
      mode="layer"
    />)
    expect(Tooth.prototype._renderLayer.calledOnce).to.equal(true)

    shallow(<Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
      mode="bar"
    />)
    expect(Tooth.prototype._renderBar.calledOnce).to.equal(true)

    shallow(<Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
      mode="spokerib"
    />)
    expect(Tooth.prototype._renderSpokerib.calledTwice).to.equal(true)

  })

  it('should contains correct amount of strips', function() {
    let wrapper = shallow(<Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
    ></Tooth>)
    expect(wrapper.find('AnnulusSector')).to.have.length(1)

    wrapper.setProps({ strips: strips })
    expect(wrapper.find('AnnulusSector')).to.have.length(2)

  })

  it('should have correct strip colors', function() {
    let wrapper = render(<Tooth
      innerRadius={100}
      outerRadius={120}
      startAngle={0}
      endAngle={10}
      strips={strip1}
    ></Tooth>)
    expect(wrapper.find('path').prop('fill')).to.equal('red')

    wrapper = render(<Tooth
      innerRadius={100}
      outerRadius={120}
      startAngle={0}
      endAngle={10}
      strips={strips}
    ></Tooth>)
    expect(wrapper.find('path').eq(0).prop('fill')).to.equal('red')
    expect(wrapper.find('path').eq(0).prop('stroke')).to.equal('red')
    expect(wrapper.find('path').eq(1).prop('fill')).to.equal('blue')
    expect(wrapper.find('path').eq(1).prop('stroke')).to.equal('blue')
  })

  it('should not set onMouseMove to AnnulusSectors if no hanlder supplied', function() {
    let tooth = <Tooth
      innerRadius={100}
      outerRadius={120}
      strips={strip1}
    ></Tooth>
    let wrapper = shallow(tooth)
    expect(wrapper.find('AnnulusSector').prop('onMouseMove')).to.be.undefined
  })

  it('should propogate `mousemove` event properly, id is attached to event obj', function() {
    let evt = null
    let mouseMoveSpy = sinon.spy(e => evt = e)
    let tooth = <Tooth
      innerRadius={100}
      outerRadius={120}
      startAngle={0}
      endAngle={10}
      strips={strip1}
      onMouseMove={mouseMoveSpy}
    ></Tooth>
    let wrapper = shallow(tooth)
    let hanlder = wrapper.find('AnnulusSector').prop('onMouseMove')

    expect(hanlder).to.not.be.undefined
    hanlder({ sectorId: '0', dispatchConfig: { phasedRegistrationNames: { bubbled: 'onMouseMove'} } })
    expect(mouseMoveSpy.calledOnce).to.be.true
    expect(evt).to.not.be.null
  })
})
