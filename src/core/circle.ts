import * as d3 from 'd3'
import vars from '../theme/vars'

export const defaultOptions = {
  color: '#5356FB',
  xAccessor: (d: CircleData) => d[0],
  yAccessor: (d: CircleData) => d[1],
  rAccessor: (d: CircleData) => 2,
  hollow: true,
}

export type CircleData = [number, number]
export type CircleOptions = Partial<typeof defaultOptions>

export function renderCircles(
  visor: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: CircleData[],
  xScale: d3.ScaleLinear<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  opts?: CircleOptions,
) {
  const { color, xAccessor, hollow, yAccessor, rAccessor } = {
    ...defaultOptions,
    ...opts,
  }
  const dots = visor.selectAll('circle').data(data)
  const positionedDots = dots
    .join('circle')
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .attr('r', (d) => rAccessor(d))

  if (!hollow) {
    positionedDots.attr('fill', color)
  } else {
    positionedDots.attr('fill', 'transparent').attr('stroke', color)
  }
}
