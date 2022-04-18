import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'

import createVisor, { VisOptions } from '../core/visor'
type HeatMapData = { x: string; y: string; value: number }
type HeatMapOptions = VisOptions & {
  xAccessor: (d: HeatMapData, i?: number) => string
  yAccessor: (d: HeatMapData, i?: number) => string
  zAccessor: (d: HeatMapData, i?: number) => number
  startColor: string
  endColor: string
  paddingInnerX: number
  paddingInnerY: number
}

const HeatMap = (container: HTMLElement, data: HeatMapData[], options: HeatMapOptions) => {
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
    const {
      xAccessor = (d) => d.x,
      yAccessor = (d) => d.y,
      zAccessor = (d) => d.value,
      startColor = '#fff',
      endColor = '#fff',
      xDomain = data.map(xAccessor),
      yDomain = data.map(yAccessor),
      zDomain = data.map(zAccessor),
      xType = d3.scaleBand,
      yType = d3.scaleBand,
      zType = d3.scaleLinear,
      xRange = [0, dimensions.boundedWidth],
      yRange = [dimensions.boundedHeight, 0],
      noXAxisTick = true,
      noYAxisTick = true,
      noYAxisLine = true,
      noXAxisLine = true,
      paddingInnerX = 0,
      paddingInnerY = 0,
    } = options

    const xScale = xType(new Set(xDomain), xRange).paddingInner(paddingInnerX)
    const yScale = yType(new Set(yDomain), yRange).paddingInner(paddingInnerY)
    const colorScale = zType(d3.extent(zDomain), [startColor, endColor])

    // Draw bottom axis

    const xAxisGenerator = d3.axisBottom(xScale)
    const xAxis = bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    if (noXAxisTick) xAxis.call((g) => g.selectAll('.tick line').remove())
    if (noXAxisLine)
      xAxis.call((g) => {
        g.select('.domain').remove()
      })

    if (options.xLabel) {
      const xAxisLabel = xAxis
        .append('text')
        .attr('x', dimensions.boundedWidth / 2)
        .attr('y', (dimensions.marginBottom / 3) * 2)
        .attr('fill', 'black')
        .style('font-size', options?.fontSize || '1.4em')
        .html(options.xLabel)
    }
    //Draw left axis
    const yAxisGenerator = d3.axisLeft(yScale)
    const yAxis = bounds.append('g').call(yAxisGenerator)
    if (noYAxisTick) yAxis.call((g) => g.selectAll('.tick line').remove())
    if (noYAxisLine) yAxis.call((g) => g.select('.domain').remove())

    if (options.yLabel) {
      const yAxisLabel = yAxis
        .append('text')
        .attr('x', -dimensions.boundedHeight / 2)
        .attr('y', (-dimensions.marginLeft / 3) * 2)
        .attr('fill', 'black')
        .style('font-size', options?.fontSize || '1.4em')
        .text(options.yLabel)
        .style('transform', 'rotate(-90deg)')
        .style('text-anchor', 'middle')
    }

    bounds
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return xScale(xAccessor(d))
      })
      .attr('y', function (d) {
        return yScale(yAccessor(d))
      })
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', (d) => {
        return colorScale(d.value)
      })
  }

  createVisor(container, renderer, options)
}

export default HeatMap
