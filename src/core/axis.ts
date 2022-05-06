import * as d3 from 'd3'
import { Dimensions } from './dimensions'
type AxisOptions = Partial<{
  noXLine: boolean
  showXGrid: boolean
  noYLine: boolean
  showYGrid: boolean
  xGridColor: string
  yGridColor: string
  xLabel: string
  yLabel: string
  noXTick: boolean
  noYTick: boolean
  fontSize: string
}>
const defaultOptions = {
  noXLine: false,
  noXTick: false,
  showXGrid: false,
  noYLine: false,
  showYGrid: false,
  xGridColor: 'initial',
  yGridColor: 'red',
  xLabel: '',
  yLabel: '',
  noYTick: false,
  fontSize: '1.2em',
}
export function renderAxis(
  visor: d3.Selection<SVGGElement, unknown, null, undefined>,
  dimensions: Dimensions,
  xScale: d3.AxisScale<d3.AxisDomain>,
  yScale: d3.AxisScale<d3.AxisDomain>,
  opts?: AxisOptions,
) {
  const { boundedHeight, boundedWidth, marginBottom, marginLeft } = dimensions
  const { noXTick, noYTick, noXLine, showXGrid, noYLine, showYGrid, xGridColor, yGridColor, xLabel, yLabel, fontSize } =
    {
      ...defaultOptions,
      ...opts,
    }

  // Draw bottom axis
  const xAxisGenerator = d3.axisBottom(xScale)

  const xAxis = visor.append('g').call(xAxisGenerator).style('transform', `translateY(${boundedHeight}px)`)
  if (noXTick) xAxis.call((g) => g.selectAll('.tick line').remove())
  if (noXLine) xAxis.call((g) => g.select('.domain').remove())
  if (showXGrid) {
    const xGrid = visor
      .append('g')
      .call(d3.axisBottom(xScale).tickSize(boundedHeight))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('.tick text').remove())
      .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', xGridColor))
  }
  if (xLabel) {
    const xAxisLabel = xAxis
      .append('text')
      .attr('x', boundedWidth / 2)
      .attr('y', (marginBottom / 3) * 2)
      .attr('fill', 'black')
      .style('font-size', fontSize)
      .html(xLabel)
  }

  // Draw left axis
  const yAxisGenerator = d3.axisLeft(yScale)

  const yAxis = visor.append('g').call(yAxisGenerator)
  if (noYTick) yAxis.call((g) => g.selectAll('.tick line').remove())
  if (noYLine) yAxis.call((g) => g.select('.domain').remove())

  if (showYGrid) {
    const yGrid = visor
      .append('g')
      .call(d3.axisRight(yScale).tickSize(boundedWidth))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.selectAll('.tick text').remove())
      .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', yGridColor))
  }

  if (yLabel) {
    const yAxisLabel = yAxis
      .append('text')
      .attr('x', -boundedHeight / 2)
      .attr('y', (-marginLeft / 3) * 2)
      .attr('fill', 'black')
      .style('font-size', fontSize)
      .text(yLabel)
      .style('transform', 'rotate(-90deg)')
      .style('text-anchor', 'middle')
  }
}
