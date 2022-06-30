import * as d3 from 'd3'
import { renderAxis } from '../core/axis'
import { renderCircles, CircleData, CircleOptions, defaultOptions } from '../core/circle'
import { scaleLinear } from '../core/scales'
import { buildVisor, VisOptions } from '../core/visor'

type CircleChartOpts = VisOptions & CircleOptions

const LineChart = (container: HTMLElement, dataset: CircleData[], opts: CircleChartOpts) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { visorWidth, visorHeight } = dimensions
    const { yAccessor, xAccessor, color, xDomain, yDomain, ...rest } = { ...defaultOptions, ...opts }

    const xScale = scaleLinear(xDomain || d3.extent(dataset, xAccessor), [0, visorWidth]).nice()
    const yScale = scaleLinear(yDomain || d3.extent(dataset, yAccessor), [visorHeight, 0]).nice()

    const xAxis = renderAxis('x', visor!, dimensions, xScale as d3.AxisScale<d3.AxisDomain>, rest)
    const yAxis = renderAxis('y', visor!, dimensions, yScale as d3.AxisScale<d3.AxisDomain>, rest)
    renderCircles(visor, dataset, xScale, yScale, { color })
  }
}
export default LineChart
