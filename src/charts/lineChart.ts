import * as d3 from 'd3'
import { renderAxis } from '../core/axis'
import { Dimensions } from '../core/dimensions'
import { renderLines } from '../core/line'
import createVisor, { buildVisor, VisOptions } from '../core/visor'

type linePoint = [number, number]
type lineChartParams = { dataset: linePoint[]; series: any[] }
type lineChartOpts = VisOptions & {
  yAccessor: (d: linePoint) => number
  xAccessor: (d: linePoint) => number
  lineWidth: number
  color: string
  curve: d3.CurveFactoryLineOnly | d3.CurveFactory
}
const LineChart = (container: HTMLElement, params: lineChartParams, opts: lineChartOpts) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { yAccessor, xAccessor, color, xDomain, yDomain } = opts
    const xScale = d3
      .scaleLinear()
      .domain(xDomain || (d3.extent(params.dataset, xAccessor) as number[]))
      .range([0, dimensions.boundedWidth])
      .nice()

    const yScale = d3
      .scaleLinear()
      .domain(yDomain || (d3.extent(params.dataset, yAccessor) as number[]))
      .range([dimensions.boundedHeight, 0])
      .nice()

    renderAxis(visor!, dimensions, xScale as d3.AxisScale<d3.AxisDomain>, yScale as d3.AxisScale<d3.AxisDomain>, {
      showXGrid: true,
      xLabel: 'solidy',
      yLabel: 'quora',
      noYTick: true,
    })
    renderLines(visor!, params.dataset, xScale, yScale, { color, curve: d3.curveBumpX })
  }
}
export default LineChart
