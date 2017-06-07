// @flow
import { Sin, Cos, Asin, Deg2Rad, Rad2Deg, PI } from './math'

type AnnularOptions = {
  startAngle: number,
  endAngle: number,
  offsetAngle: number,
  outerRadius: number,
  innerRadius: number,
  cx: number,
  cy: number
}

/**
 * Output a path string of an annulus sector, based on 6 parameters:
 * startAngle, endAngle, outerRadius, innerRadius, centerX, centerY
 * 
 * REPLACE WITH D3.ARC() !
 */
function AnnulusSector(opts: AnnularOptions): string {
  ['startAngle', 'endAngle', 'outerRadius', 'innerRadius', 'cx', 'cy'].forEach(attr => {
    if (opts[attr] == undefined) throw Error('Undefined/Null parameter: ' + attr)
  })
  let { cx, cy, outerRadius, innerRadius, offsetAngle, startAngle, endAngle } = opts
  if ((offsetAngle = Number(offsetAngle))) {
    startAngle += offsetAngle
    endAngle += offsetAngle
  }
  let startRad = Deg2Rad(startAngle)
  let endRad = Deg2Rad(endAngle)
  let points = [
    [cx + outerRadius * Cos(startRad), cy - outerRadius * Sin(startRad)],
    [cx + outerRadius * Cos(endRad), cy - outerRadius * Sin(endRad)],
    [cx + innerRadius * Cos(endRad), cy - innerRadius * Sin(endRad)],
    [cx + innerRadius * Cos(startRad), cy - innerRadius * Sin(startRad)],
  ]

  let angle = endRad - startRad
  let largeArc = (angle % (PI*2)) > PI ? 1 : 0
  let cmds = []
  cmds.push("M" + points[0].join())                                            // Move to P0
  cmds.push("A" +[outerRadius, outerRadius, 1, largeArc, 0, points[1]].join()) // Arc to P1
  cmds.push("L" + points[2].join())                                            // Line to P2
  cmds.push("A" + [innerRadius, innerRadius, 0, largeArc, 1, points[3]].join())// Arc to P3
  cmds.push("z")                                                               // Close path (Line to P0)

  return cmds.join(' ')
}

/**
 * Text around a center point, in a 'clock arm' manner
 * Given a center position, radius & angle, output {xPos, yPos, rotate, textAnchor
 * So <text x={xPos} y={yPos} transform="rotate({...rotate}) text-anchor={textAnchor}> is the final appearance
 * Only left-to-right way, consider to support the opposite
 */
const TEXT_ROTATE_OFFSET_FACTOR = 4.5  // TODO: half the font size, should be calculated realtime
function RadialText(r: number, angle: number, cx: number, cy: number): {
  x: number, y: number, rotate: [number, number, number], textAnchor: string
} {
  let offset = Rad2Deg(Asin(TEXT_ROTATE_OFFSET_FACTOR/r))

  // by default rotate() is clockwise, reverse it to suit our convention
  angle = 360 - (angle % 360) 
  
  let leftHemisphere = angle > 90 && angle < 270
  let x, rotateAngle, textAnchor

  if (leftHemisphere) {
    x = cx - r
    rotateAngle = angle - 180 - offset
    textAnchor = 'end'
  } else {
    x = cx + r
    rotateAngle = angle + offset
    textAnchor = 'start'
  }
  return {
    x: x,
    y: cy,
    rotate: [ rotateAngle, cx, cy ],
    textAnchor: textAnchor,
  }
}
export { AnnulusSector, RadialText }