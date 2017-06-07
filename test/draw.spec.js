import { 
  Rad2Deg, 
  Deg2Rad, 
  Polar2Cartesian,
  AnnulusViewport, 
  SQRT2,
  SQRT1_2,
  PI 
} from '../src/utils/math'
import { expect, approxEq } from './testHelper'
import { AnnulusSector, RadialText } from '../src/utils/draw'


describe('Svg drawing Utils', () => {

  describe('annulus sector', () => {
    
    let defaultOpts
    beforeEach(() => {
      defaultOpts = {
        startAngle: 0,
        endAngle: 90,
        outerRadius: 100,
        innerRadius: 90,
        cx: 0,
        cy: 0
      }
    })

    it('the output path should be a string', () => {
      let result = AnnulusSector(defaultOpts)
      expect(result).to.be.a('string')
    })

    it('the output path should contains no NaN', () => {
      let result = AnnulusSector(defaultOpts)
      expect(result).to.not.contains('NaN')
    })

    it('the output path should be correct', () => {
      let result = AnnulusSector(defaultOpts)
      expect(result).to.be.equal('M100,0 A100,100,1,0,0,6.123233995736766e-15,-100 L5.5109105961630896e-15,-90 A90,90,0,0,1,90,0 z')
    })
  })

  describe('radial text', () => {
      
    it('calculate text attribute for Radial(clock arm) Text', () => {
      let r = 100, angle = 45, cx = 0, cy = 0

      let result = RadialText(r, angle, cx, cy)
      expect(result).to.not.be.null
      expect(result.x).to.be.equal(r)
      expect(result.y).to.be.equal(cy)
      expect(result.textAnchor).to.be.equal('start')
      expect(result.rotate).to.almost.eql([317.57918105, cx, cy])

      angle = 150
      result = RadialText(r, angle, cx, cy)
      expect(result).to.not.be.null
      expect(result.x).to.be.equal(-r)
      expect(result.y).to.be.equal(cy)
      expect(result.textAnchor).to.be.equal('end')
      expect(result.rotate).to.almost.eql([27.42081894, cx, cy])
    })
  })
})
