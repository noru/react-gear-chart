// @flow
import { inRange } from 'lodash-es'

/**
 * Aliases
 */
export const PI = Math.PI
export const SQRT2 = Math.SQRT2
export const SQRT1_2 = Math.SQRT1_2
export const Sin = Math.sin
export const Cos = Math.cos
export const Asin = Math.asin
export const TAU = 2 * PI // http://tauday.com/tau-manifesto

export function Deg2Rad(deg: number): number {
  return deg * PI / 180
}

export function Rad2Deg(rad: number): number {
  return rad * 180 / PI
}

export function Polar2Cartesian(radius: number, angle: number, 
  { degree = true, baseX = 0, baseY = 0 }: {degree: boolean, baseX: number, baseY: number} = {}
): [number, number] {
  if (degree) {
    angle = Deg2Rad(angle)
  }
  return [ baseX + Cos(angle) * radius, baseY + Sin(angle) * radius ]
}

export function NormalizeAngleRange(start, end) {
  let startAngle = start % 360 
  let endAngle = end % 360
  if (startAngle >= endAngle) {
    endAngle += 360
  }
  return [ startAngle, endAngle ]
}
/**
 * Given an annulus with start/end angle and outer/inner radius, calculate a viewport 
 * that can hold it, and a center point relative to the viewport upper-left corner
 * 
 * Algo: get all vertices, calulate greatest difference from there cartesian coordinates,
 * 
 * Use Polar Coordinate System with convention:
 * https://en.wikipedia.org/wiki/Polar_coordinate_system#/media/File:Polar_graph_paper.svg
 * 
 * @param {number} startAngle, degree
 * @param {number} endAngle, degree
 * @param {number} outerR 
 * @param {number} innerR 
 */
export function AnnulusViewport(
  startAngle: number, 
  endAngle: number, 
  outerR: number, 
  innerR: number,
  padding: number = 0
): [number, number, number, number] {

  if (outerR <= innerR) {
    throw Error('Invalid radius, the outer one is smaller than the inner')
  }

  [ startAngle, endAngle ] = NormalizeAngleRange(startAngle, endAngle)

  let p2c = Polar2Cartesian
  let vertice = [ 
    p2c(innerR, startAngle), p2c(innerR, endAngle), 
    p2c(outerR, startAngle), p2c(outerR, endAngle)
  ]

  let _end = startAngle > endAngle ? endAngle + 360 : endAngle
  // polars: East North West South
  ;[0, 90, 180, 270, 360].forEach(p => {
    if (inRange(p, startAngle, _end)) {
      vertice.push(p2c(outerR, p))
    }
  })
  let minX, minY, maxX, maxY
  minX = minY = Infinity
  maxX = maxY = -Infinity
  vertice.forEach(([x, y]) => {
    if (x > maxX) maxX = x
    if (x < minX) minX = x
    if (y > maxY) maxY = y 
    if (y < minY) minY = y
  })
  return [maxX - minX + padding, maxY - minY + padding, -minX + padding / 2, maxY + padding / 2]
}
