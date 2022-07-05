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
  const { xAccessor, yAccessor, zAccessor, x, y, width, height, color } = { ...defaultOptions, ...options }

  const colorScale = scaleLinear(extent(data.map(zAccessor)) as [number, number], color)

  visor
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr(
      'x',
      x ||
        ((d: HeatMapData) => {
          const v = xAccessor(d)
          return xScale(v) || 0
        }),
    )
    .attr(
      'y',
      y ||
        ((d: HeatMapData) => {
          const v = yAccessor(d)
          return yScale(v) || 0
        }),
    )
    .attr('width', width || xScale.bandwidth())
    .attr('height', height || yScale.bandwidth())
    .style('fill', (d) => {
      return colorScale(zAccessor(d))
    })
}
