import { Selection, ScaleLinear } from 'd3'
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
  visor: Selection<SVGGElement, unknown, null, undefined>,
  data: CircleData[],
  xScale: ScaleLinear<number, number, never>,
  yScale: ScaleLinear<number, number, never>,
  opts?: CircleOptions,
) {
  const { color, xAccessor, hollow, yAccessor, rAccessor } = {
    ...defaultOptions,
    ...opts,
  }

  const positionedDots = visor
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .attr('r', (d) => d[0] / 10)

  if (!hollow) {
    positionedDots.attr('fill', color)
  } else {
    positionedDots.attr('fill', 'transparent').attr('stroke', color)
  }
}
