import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'
import createVisor, { VisorOptions } from '../core/visor'

type linePoint = [number, number]
type ScatterPlotParams = { dataset: linePoint[]; series: any[] }
type ScatterPlotOpts = VisorOptions & {
  yAccessor: (d: linePoint) => number
  xAccessor: (d: linePoint) => number
  lineWidth: number
  color: string
  noYDomain: boolean
  noXDomain: boolean
  showXGrid: boolean
  showYGrid: boolean
  yGridColor: string
  xGridColor: string
}
const lineChart = (container: HTMLElement, params: ScatterPlotParams, opts: ScatterPlotOpts) => {
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
    const {
      showXGrid = false,
      showYGrid = false,
      xGridColor = '#eee',
      yGridColor = '#eee',
      yAccessor,
      xAccessor,
      lineWidth = 2,
      color,
      noYDomain = false,
      noXDomain = false,
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
    const drawLines = (dataset: linePoint[], color: string) => {
      const lineGenerator = d3
        .line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)))
      const line = bounds
        .append('path')
        .attr('d', lineGenerator(dataset))
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', lineWidth)
    }

    // Draw bottom axis
    const xAxisGenerator = d3.axisBottom(xScale)

    const xAxis = bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    if (noXDomain) xAxis.call((g) => g.select('.domain').remove())
    if (showXGrid) {
      const xGrid = bounds
        .append('g')
        .call(d3.axisBottom(xScale).tickSize(dimensions.boundedHeight))
        // .style('transform', `translateY(${dimensions.boundedHeight}px)`)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove())
        .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', xGridColor))
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

    if (noYDomain) yAxis.call((g) => g.select('.domain').remove())
    if (showYGrid) {
      const yGrid = bounds
        .append('g')
        .call(d3.axisRight(yScale).tickSize(dimensions.boundedWidth))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove())
        .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', yGridColor))
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

    drawLines(params.dataset, color)
  }

  createVisor(container, renderer, opts)
}
export default lineChart
