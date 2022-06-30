import { line, ScaleLinear, Selection, curveLinear, easeLinear } from 'd3'

export const defaultOptions = {
  yAccessor: (d: LineData) => d[1],
  xAccessor: (d: LineData) => d[0],
  lineWidth: 2,
  color: 'black',
  curve: curveLinear,
  anim: false,
}
export type LineData = [number, number]
export type LineOptions = Partial<typeof defaultOptions>

export function renderLines(
  visor: Selection<SVGGElement, unknown, null, undefined>,
  data: LineData[],
  xScale: ScaleLinear<number, number, never>,
  yScale: ScaleLinear<number, number, never>,
  options?: LineOptions,
) {
  const { anim, curve, xAccessor, yAccessor, color, lineWidth } = { ...defaultOptions, ...options }
  const lineGenerator = line<LineData>()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))
    .curve(curve)

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
      .ease(easeLinear)
      .attr('stroke-dashoffset', 0)
      .duration(6000)
  }
}
