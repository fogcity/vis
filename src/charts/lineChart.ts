import * as d3 from 'd3'
import { renderAxis } from '../core/axis'
import { Dimensions } from '../core/dimensions'
import { drawLines } from '../core/line'
import createVisor, { VisOptions } from '../core/visor'

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
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
    const {
      showXAxisGrid = false,
      showYAxisGrid = false,
      xAxisGridColor = '#eee',
      yAxisGridColor = '#eee',
      yAccessor,
      xAccessor,
      lineWidth = 2,
      curve = d3.curveLinear,
      color,
      noYAxisLine = false,
      noXAxisLine = false,
      xDomain,
      yDomain,
    } = opts

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

    drawLines(bounds, params.dataset, xScale, yScale, { color, curve: d3.curveBumpX })

    renderAxis(bounds, dimensions, xScale as d3.AxisScale<d3.AxisDomain>, yScale as d3.AxisScale<d3.AxisDomain>, {
      showXGrid: true,
      xLabel: 'solidy',
      yLabel: 'quora',
      noYTick: true,
    })
  }

  createVisor(container, renderer, opts)
}
export default LineChart
