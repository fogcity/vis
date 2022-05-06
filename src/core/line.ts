import * as d3 from 'd3'
import { Dimensions } from './dimensions'

type linePoint = [number, number]
type LineOptions = Partial<{
  yAccessor: (d: linePoint) => number
  xAccessor: (d: linePoint) => number
  lineWidth: number
  color: string
  curve: d3.CurveFactoryLineOnly | d3.CurveFactory
  anim: boolean
}>
const defaultOptions = {
  yAccessor: (d: linePoint) => d[1],
  xAccessor: (d: linePoint) => d[0],
  lineWidth: 2,
  color: 'black',
  curve: d3.curveLinear,
  anim: true,
}
export function drawLines(
  visor: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: linePoint[],
  xScale: d3.ScaleLinear<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  opts?: LineOptions,
) {
  const { anim, curve, xAccessor, yAccessor, color, lineWidth } = { ...defaultOptions, ...opts }
  const lineGenerator = d3
    .line()
    .curve(curve)
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))

  const path = visor
    .append('path')
    .attr('d', lineGenerator(data))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', lineWidth)

  if (anim) {
    const length = path.node()!.getTotalLength()
    path
      .attr('stroke-dasharray', length + ' ' + length)
      .attr('stroke-dashoffset', length)
      .transition()
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0)
      .duration(6000)
  }
}
