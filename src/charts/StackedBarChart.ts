import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'
import createVisor, { VisOptions } from '../core/createVisor'

type StackedBarChartOptions<T> = VisOptions & {
  xAccessor: (d: T, i: number) => string
  yAccessor: (d: T) => number
  zAccessor: (d: T) => any
  normalized: boolean
  horizental: boolean
  diverging: boolean
  colors: string[]
  offset: Function
  order: Function
  yFormat: string
}

const StackedBarChart = <T>(container: HTMLElement, data: T[], options: StackedBarChartOptions<T>) => {
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
    const {
      showXAxisGrid = false,
      showYAxisGrid = false,
      xAxisGridColor = '#eee',
      yAxisGridColor = '#eee',
      yAccessor,
      xAccessor,
      zAccessor,
      colors,
      noYAxisLine = false,
      noXAxisLine = false,
      xDomain: xDm,
      yDomain: yDm,
      zDomain: zDm,
      normalized = false,
      horizental = false,
      diverging = false,
      offset = d3.stackOffsetDiverging,
      order = d3.stackOrderNone,
      yFormat,
      xType = d3.scaleBand,
      yType = d3.scaleLinear,
      zType = d3.scaleOrdinal,
      xRange = [0, dimensions.boundedWidth],
      yRange = [dimensions.boundedHeight, 0],
    } = options
    // 各自数据的数组
    const X = d3.map(data, xAccessor)
    const Y = d3.map(data, yAccessor)
    const Z = d3.map(data, zAccessor)

    let xDomain: any, yDomain: any, zDomain: any
    if (xDm === undefined) xDomain = X
    if (zDm === undefined) zDomain = Z
    xDomain = new d3.InternSet(xDomain)
    zDomain = new d3.InternSet(zDomain)
    // Compute values.

    const xScale = xType(xDm, xRange)
    const I = d3.range(xDomain.length).filter((i) => xDomain.has(xDomain[i]) && zDomain.has(zDomain[i]))
    const series = d3
      .stack()
      .keys(zDomain)
      .value(([x, I], z) => Y[I.get(z)])
      .order(order)
      .offset(offset)(
        d3.rollup(
          I,
          ([i]) => i,
          (i) => xDomain[i],
          (i) => zDomain[i],
        ),
      )
      .map((s: any) => s.map((d: any) => Object.assign(d, { i: d.data[1].get(s.key) })))

    if (yDm === undefined) yDomain = d3.extent(series.flat(2))
    const yScale = yType(yDomain, yRange).nice()
    const colorScale = d3.scaleOrdinal(zDomain, colors)
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
        .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', xGridColor))
    }
    if (options.xLabel) {
      const xAxisLabel = xAxis
        .append('text')
        .attr('x', dimensions.boundedWidth / 2)
        .attr('y', (dimensions.marginBottom / 3) * 2)
        .attr('fill', 'black')
        .style('font-size', options?.fontSize || '1.4em')
        .html(options.xLabel)
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
        .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', yGridColor))
    }
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

    const bar = bounds
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', ([{ i }]) => colorScale(zDomain[i]))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', ({ i }) => xScale(X[i]))
      .attr('y', ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
      .attr('height', ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
      .attr('width', xScale.bandwidth())
  }

  createVisor(container, renderer, options)
}
export default StackedBarChart
