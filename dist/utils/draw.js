'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadialText = exports.AnnulusSector = undefined;

var _math = require('./math');

/**
 * Output a path string of an annulus sector, based on 6 parameters:
 * startAngle, endAngle, outerRadius, innerRadius, centerX, centerY
 * 
 * REPLACE WITH D3.ARC() !
 */
function AnnulusSector(opts) {
  ['startAngle', 'endAngle', 'outerRadius', 'innerRadius', 'cx', 'cy'].forEach(function (attr) {
    if (opts[attr] == undefined) throw Error('Undefined/Null parameter: ' + attr);
  });
  var cx = opts.cx,
      cy = opts.cy,
      outerRadius = opts.outerRadius,
      innerRadius = opts.innerRadius,
      offsetAngle = opts.offsetAngle,
      startAngle = opts.startAngle,
      endAngle = opts.endAngle;

  if (offsetAngle = Number(offsetAngle)) {
    startAngle += offsetAngle;
    endAngle += offsetAngle;
  }
  var startRad = (0, _math.Deg2Rad)(startAngle);
  var endRad = (0, _math.Deg2Rad)(endAngle);
  var points = [[cx + outerRadius * (0, _math.Cos)(startRad), cy - outerRadius * (0, _math.Sin)(startRad)], [cx + outerRadius * (0, _math.Cos)(endRad), cy - outerRadius * (0, _math.Sin)(endRad)], [cx + innerRadius * (0, _math.Cos)(endRad), cy - innerRadius * (0, _math.Sin)(endRad)], [cx + innerRadius * (0, _math.Cos)(startRad), cy - innerRadius * (0, _math.Sin)(startRad)]];

  var angle = endRad - startRad;
  var largeArc = angle % (_math.PI * 2) > _math.PI ? 1 : 0;
  var cmds = [];
  cmds.push("M" + points[0].join()); // Move to P0
  cmds.push("A" + [outerRadius, outerRadius, 1, largeArc, 0, points[1]].join()); // Arc to P1
  cmds.push("L" + points[2].join()); // Line to P2
  cmds.push("A" + [innerRadius, innerRadius, 0, largeArc, 1, points[3]].join()); // Arc to P3
  cmds.push("z"); // Close path (Line to P0)

  return cmds.join(' ');
}

/**
 * Text around a center point, in a 'clock arm' manner
 * Given a center position, radius & angle, output {xPos, yPos, rotate, textAnchor
 * So <text x={xPos} y={yPos} transform="rotate({...rotate}) text-anchor={textAnchor}> is the final appearance
 * Only left-to-right way, consider to support the opposite
 */

var TEXT_ROTATE_OFFSET_FACTOR = 4.5; // TODO: half the font size, should be calculated realtime
function RadialText(r, angle, cx, cy) {
  var offset = (0, _math.Rad2Deg)((0, _math.Asin)(TEXT_ROTATE_OFFSET_FACTOR / r));

  // by default rotate() is clockwise, reverse it to suit our convention
  angle = 360 - angle % 360;

  var leftHemisphere = angle > 90 && angle < 270;
  var x = void 0,
      rotateAngle = void 0,
      textAnchor = void 0;

  if (leftHemisphere) {
    x = cx - r;
    rotateAngle = angle - 180 - offset;
    textAnchor = 'end';
  } else {
    x = cx + r;
    rotateAngle = angle + offset;
    textAnchor = 'start';
  }
  return {
    x: x,
    y: cy,
    rotate: [rotateAngle, cx, cy],
    textAnchor: textAnchor
  };
}
exports.AnnulusSector = AnnulusSector;
exports.RadialText = RadialText;