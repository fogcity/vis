import * as d3 from 'd3'
import { renderAxis } from '../core/axis'
import { renderLines } from '../core/line'
import { scaleLinear } from '../core/scales'
import { buildVisor, VisOptions } from '../core/visor'

type linePoint = [number, number]
type lineChartOpts = VisOptions & {
  yAccessor: (d: linePoint) => number
  xAccessor: (d: linePoint) => number
  lineWidth: number
  color: string
  curve: d3.CurveFactoryLineOnly | d3.CurveFactory
}

const LineChart = (container: HTMLElement, dataset: linePoint[], opts: lineChartOpts) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { boundedWidth, boundedHeight } = dimensions
    const { yAccessor, xAccessor, color, xDomain, yDomain, curve, ...rest } = opts

    const xScale = scaleLinear((xDomain as [number, number]) || d3.extent(dataset, xAccessor), [0, boundedWidth]).nice()
    const yScale = scaleLinear((yDomain as [number, number]) || (d3.extent(dataset, yAccessor) as number[]), [
      boundedHeight,
      0,
    ]).nice()

    const xAxis = renderAxis('x', visor!, dimensions, xScale as d3.AxisScale<d3.AxisDomain>, rest)
    const yAxis = renderAxis('y', visor!, dimensions, yScale as d3.AxisScale<d3.AxisDomain>, rest)
    renderLines(visor!, dataset, xScale, yScale, { color, curve })
  }
}
export default LineChart
