import { AxisDomain, AxisScale, extent } from 'd3'
import { renderAxis } from '../core/axis'
import { renderHeatMap, HeatMapData, HeatMapOptions, defaultOptions } from '../core/heatMap'
import { scaleBand, scaleLinear } from '../core/scales'
import { buildVisor, VisOptions } from '../core/visor'

type lineChartOpts = VisOptions & HeatMapOptions

const HeatMap = (container: HTMLElement, dataset: HeatMapData[], opts: lineChartOpts) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { visorWidth, visorHeight } = dimensions
    const { yAccessor, xAccessor, color, xDomain, yDomain, ...rest } = { ...defaultOptions, ...opts }

    const xScale = scaleBand(xDomain || extent(dataset, xAccessor), [0, visorWidth])
    const yScale = scaleBand(yDomain || extent(dataset, yAccessor), [visorHeight, 0])

    const xAxis = renderAxis('x', visor, dimensions, xScale as AxisScale<AxisDomain>, rest)
    const yAxis = renderAxis('y', visor, dimensions, yScale as AxisScale<AxisDomain>, rest)
    renderHeatMap(visor, dataset, xScale, yScale, { color })
  }
}
export default HeatMap
