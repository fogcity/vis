import * as d3 from 'd3'
import { renderAxis } from '../core/axis'
import { renderAreas, AreaData, AreaOptions, defaultOptions } from '../core/area'
import { scaleLinear } from '../core/scales'
import { buildVisor, VisOptions } from '../core/visor'

type AreaChartOpts = VisOptions & AreaOptions

const AreaChart = (container: HTMLElement, dataset: AreaData[], options: AreaChartOpts) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { visorWidth, visorHeight } = dimensions
    const { y1Accessor, xAccessor, color, xDomain, yDomain, curve, ...rest } = { ...defaultOptions, ...options }

    const xScale = scaleLinear(xDomain || d3.extent(dataset, xAccessor), [0, visorWidth]).nice()
    const yScale = scaleLinear(yDomain || [0, d3.max(dataset, y1Accessor)], [visorHeight, 0]).nice()

    const xAxis = renderAxis('x', visor, dimensions, xScale as d3.AxisScale<d3.AxisDomain>, rest)
    const yAxis = renderAxis('y', visor, dimensions, yScale as d3.AxisScale<d3.AxisDomain>, rest)
    renderAreas(visor!, dataset, xScale, yScale, rest)
  }
}
export default AreaChart
