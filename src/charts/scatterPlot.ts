import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'
import createVisor, { VisOptions } from '../core/visor'

type ScatterPoint = { x: number; y: number }
type ScatterPlotParams = { dataset: ScatterPoint[]; series: any[] }
type ScatterPlotOpts = VisOptions & {
  yAccessor: (d: ScatterPoint) => number
  xAccessor: (d: ScatterPoint) => number
  rAccessor: (d: ScatterPoint) => number
  color: string
  hollow: boolean
}
const ScatterPlot = (container: HTMLElement, params: ScatterPlotParams, opts: ScatterPlotOpts) => {
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
    const {
      showXAxisGrid = false,
      showYAxisGrid = false,
      xAxisGridColor = '#eee',
      yAxisGridColor = '#eee',
      hollow = false,
      yAccessor,
      xAccessor,
      rAccessor,
      color,
      noYAxisLine = false,
      noXAxisLine = false,
    } = opts

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(params.dataset, xAccessor) as number[])
      .range([0, dimensions.boundedWidth])
      .nice()

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(params.dataset, yAccessor) as number[])
      .range([dimensions.boundedHeight, 0])
      .nice()

    // Draw data
    const drawDots = (dataset: any[], color: string) => {
      const dots = bounds.selectAll('circle').data(dataset)
      const positionedDots = dots
        .join('circle')
        .attr('cx', (d) => xScale(xAccessor(d)))
        .attr('cy', (d) => yScale(yAccessor(d)))
        .attr('r', (d) => rAccessor(d))

      if (!hollow) {
        positionedDots.attr('fill', color)
      } else {
        positionedDots.attr('fill', 'transparent').attr('stroke', color)
      }
    }

    // Draw bottom axis
    const xAxisGenerator = d3.axisBottom(xScale)

    const xAxis = bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    if (noXAxisLine) xAxis.call((g) => g.select('.domain').remove())
    if (showXAxisGrid) {
      const xGrid = bounds
        .append('g')
        .call(d3.axisBottom(xScale).tickSize(dimensions.boundedHeight))
        // .style('transform', `translateY(${dimensions.boundedHeight}px)`)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove())
        .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', xAxisGridColor))
    }
    if (opts.xLabel) {
      const xAxisLabel = xAxis
        .append('text')
        .attr('x', dimensions.boundedWidth / 2)
        .attr('y', (dimensions.marginBottom / 3) * 2)
        .attr('fill', 'black')
        .style('font-size', opts?.fontSize || '1.4em')
        .html(opts.xLabel)
    }
    // Draw left axis
    const yAxisGenerator = d3.axisLeft(yScale)
    const yAxis = bounds.append('g').call(yAxisGenerator)

    if (noYAxisLine) yAxis.call((g) => g.select('.domain').remove())
    if (showYAxisGrid) {
      const yGrid = bounds
        .append('g')
        .call(d3.axisRight(yScale).tickSize(dimensions.boundedWidth))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove())
        .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', yAxisGridColor))
    }
    if (opts.yLabel) {
      const yAxisLabel = yAxis
        .append('text')
        .attr('x', -dimensions.boundedHeight / 2)
        .attr('y', (-dimensions.marginLeft / 3) * 2)
        .attr('fill', 'black')
        .style('font-size', opts?.fontSize || '1.4em')
        .text(opts.yLabel)
        .style('transform', 'rotate(-90deg)')
        .style('text-anchor', 'middle')
    }

    drawDots(params.dataset, color)
  }

  createVisor(container, renderer, opts)
}
export default ScatterPlot
