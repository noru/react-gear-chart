import { 
  Rad2Deg, 
  Deg2Rad, 
  Polar2Cartesian,
  AnnulusViewport, 
  NormalizeAngleRange,
  SQRT2,
  SQRT1_2,
  PI } from '../src/utils/math'
import { expect, approxEq } from './testHelper'


describe('Math Utils', () => {

  describe('conversions', () => {
    
    it('radians to degrees', () => {
      expect(Rad2Deg(PI)).to.equal(180)
    })

    it('degrees to radians', () => {
      expect(Deg2Rad(180)).to.equal(PI)
    })

    it('polar coords to cartesian coords', () => {
      expect(Polar2Cartesian(1, PI, { degree: false })).to.almost.eql([-1, 0])
      expect(Polar2Cartesian(1, 2 * PI, { degree: false })).to.almost.eql([1, 0])
      expect(Polar2Cartesian(1, .5 * PI, { degree: false })).to.almost.eql([0, 1])
      expect(Polar2Cartesian(1, 1.5 * PI, { degree: false })).to.almost.eql([0, -1])
      expect(Polar2Cartesian(1, .25 * PI, { degree: false })).to.almost.eql([SQRT2 / 2, SQRT2 / 2])
      expect(Polar2Cartesian(1, 1.25 * PI, { degree: false })).to.almost.eql([-SQRT2 / 2, -SQRT2 / 2])

      expect(Polar2Cartesian(1, 180)).to.almost.eql([-1, 0])
      expect(Polar2Cartesian(1, 360)).to.almost.eql([1, 0])
      expect(Polar2Cartesian(1, 90)).to.almost.eql([0, 1])
      expect(Polar2Cartesian(1, 270)).to.almost.eql([0, -1])
      expect(Polar2Cartesian(1, 45)).to.almost.eql([SQRT2 / 2, SQRT2 / 2])
      expect(Polar2Cartesian(1, 225)).to.almost.eql([-SQRT2 / 2, -SQRT2 / 2])

      expect(Polar2Cartesian(1, 225, {baseX: 1, baseY: 2})).to.almost.eql([-SQRT2 / 2 + 1, -SQRT2 / 2 + 2])
    })

    it('normalize start/end angle (within 0 - 360)', () => {
      expect(NormalizeAngleRange(35, 45)).to.be.deep.equal([35, 45])
      expect(NormalizeAngleRange(0, 360)).to.be.deep.equal([0, 360])
      expect(NormalizeAngleRange(360, 0)).to.be.deep.equal([0, 360])
      expect(NormalizeAngleRange(380, 45)).to.be.deep.equal([20, 45])
      expect(NormalizeAngleRange(380, 790)).to.be.deep.equal([20, 70])
    })

  })

  it('calculate annulus viewport`s height,width, center x & center y', () => {
    let outerR = 2, innerR = 1
    
    expect(AnnulusViewport(0, 90, outerR, innerR)).to.almost.eql([2, 2, 0, 2])
    expect(AnnulusViewport(0, 180, outerR, innerR)).to.almost.eql([4, 2, 2, 2])
    expect(AnnulusViewport(0, 270, outerR, innerR)).to.almost.eql([4, 4, 2, 2])
    expect(AnnulusViewport(90, 180, outerR, innerR)).to.almost.eql([2, 2, 2, 2])

    expect(AnnulusViewport(45, 135, outerR, innerR)).to.almost.eql([SQRT2 * 2, 2 - SQRT1_2, SQRT2 ,2])
    expect(AnnulusViewport(135, 225, outerR, innerR)).to.almost.eql([2 - SQRT1_2, SQRT2 * 2, 2, SQRT2])
    expect(AnnulusViewport(225, 315, outerR, innerR)).to.almost.eql([SQRT2 * 2, 2 - SQRT1_2, SQRT2, -SQRT1_2])
    expect(AnnulusViewport(315, 45, outerR, innerR)).to.almost.eql([2 - SQRT1_2, SQRT2 * 2, -SQRT1_2, SQRT2])

    expect(AnnulusViewport(100, 200, outerR, innerR)).to.almost.eql([1.8263518223330, 2.6536557926757536, 2, 1.969615506])
     
  })

})
