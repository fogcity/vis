import { AxisDomain, AxisScale, extent } from 'd3'
import { renderAxis } from '../core/axis'
import { renderHeatMap, HeatMapData, HeatMapOptions, defaultOptions } from '../core/heatMap'
import { scaleBand, scaleLinear } from '../core/scales'
import { buildVisor, VisOptions } from '../core/visor'

const HeatMap = (container: HTMLElement, dataset: HeatMapData[], options: VisOptions & HeatMapOptions) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { visorWidth, visorHeight } = dimensions
    const { yAccessor, xAccessor, color, xDomain, yDomain, ...rest } = { ...defaultOptions, ...options }

    const xScale = scaleBand(xDomain || extent(dataset, xAccessor), [0, visorWidth])
    const yScale = scaleBand(yDomain || extent(dataset, yAccessor), [visorHeight, 0])

    renderAxis('x', visor, dimensions, xScale as AxisScale<AxisDomain>, rest)
    renderAxis('y', visor, dimensions, yScale as AxisScale<AxisDomain>, rest)
    renderHeatMap(visor, dataset, xScale, yScale, { color })
  }
}
export default HeatMap
