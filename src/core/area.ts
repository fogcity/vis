import * as d3 from 'd3'
import vars from '../theme/vars'

export const defaultOptions = {
  y1Accessor: (d: AreaData) => d[2],
  y0Accessor: (d: AreaData) => d[1],
  xAccessor: (d: AreaData) => d[0],
  opacity: 0.2,
  strokeColor: vars.color.black,
  fillColor: vars.color.grey,
  strokeWidth: 1,
  curve: d3.curveMonotoneX,
  anim: true,
}

export type AreaData = [number, number, number]
export type AreaOptions = Partial<typeof defaultOptions>

export function renderAreas(
  visor: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: AreaData[],
  xScale: d3.ScaleLinear<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  opts?: AreaOptions,
) {
  const {  xAccessor, y0Accessor, y1Accessor, opacity, strokeColor, fillColor, strokeWidth } = {
    ...defaultOptions,
    ...opts,
  }
  const areaGenerator = d3
    .area<AreaData>()
    .x((d) => xScale(xAccessor(d)))
    .y0((d) => yScale(y0Accessor(d)))
    .y1((d) => yScale(y1Accessor(d)))
  const path = visor
    .append('path')
    .attr('d', areaGenerator(data))
    .attr('fill', fillColor)
    .attr('stroke', strokeColor)
    .attr('stroke-width', strokeWidth)
    .attr('fill-opacity', opacity)
}
