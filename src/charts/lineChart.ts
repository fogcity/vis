import * as d3 from 'd3'
import { renderAxis } from '../core/axis'
import { renderLines, LineData, LineOptions, defaultOptions } from '../core/line'
import { scaleLinear } from '../core/scales'
import { buildVisor, VisOptions } from '../core/visor'

type lineChartOpts = VisOptions & LineOptions

const LineChart = (container: HTMLElement, dataset: LineData[], opts: lineChartOpts) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { visorWidth, visorHeight } = dimensions
    const { yAccessor, xAccessor, color, xDomain, yDomain, curve, ...rest } = { ...defaultOptions, ...opts }

    const xScale = scaleLinear(xDomain || d3.extent(dataset, xAccessor), [0, visorWidth]).nice()
    const yScale = scaleLinear(yDomain || d3.extent(dataset, yAccessor), [visorHeight, 0]).nice()

    const xAxis = renderAxis('x', visor!, dimensions, xScale as d3.AxisScale<d3.AxisDomain>, rest)
    const yAxis = renderAxis('y', visor!, dimensions, yScale as d3.AxisScale<d3.AxisDomain>, rest)
    renderLines(visor, dataset, xScale, yScale, { color, curve })
  }
}
export default LineChart
