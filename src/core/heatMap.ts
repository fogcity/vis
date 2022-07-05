import { line, scaleLinear, Selection, curveLinear, easeLinear, ScaleBand, extent } from 'd3'
// import { scaleLinear } from './scales'

export const defaultOptions = {
  zAccessor: (d: HeatMapData) => d[2],
  yAccessor: (d: HeatMapData) => d[1],
  xAccessor: (d: HeatMapData) => d[0],
  color: ['black', 'black'] as [string, string],
  curve: curveLinear,
  anim: false,
  width: '',
  height: '',
  x: 0,
  y: 0,
}
export type HeatMapData = [string, string, number]
export type HeatMapOptions = Partial<typeof defaultOptions>

export function renderHeatMap(
  visor: Selection<SVGGElement, unknown, null, undefined>,
  data: HeatMapData[],
  xScale: ScaleBand<string>,
  yScale: ScaleBand<string>,
  options?: HeatMapOptions,
) {
  const {
    width = xScale.bandwidth(),
    height = yScale.bandwidth(),
    xAccessor,
    yAccessor,
    zAccessor,
    x = function (d: HeatMapData) {
      const v = xAccessor(d)
      return xScale(v) || 0
    },
    y = function (d: HeatMapData) {
      const v = yAccessor(d)
      return yScale(v) || 0
    },
    color,
  } = { ...defaultOptions, ...options }
  const zDomain = data.map(zAccessor)
  const colorScale = scaleLinear(extent(zDomain) as [number, number], color)

  visor
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', width)
    .attr('height', height)
    .style('fill', (d) => {
      return colorScale(zAccessor(d))
    })
}
