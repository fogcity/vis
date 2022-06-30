import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'
import createVisor, { VisOptions } from '../core/visor'
type SeriesDataItem = {
  [key: string]: number
}

type StackedBarChartOptions = VisOptions & {
  xAccessor: (d: SeriesDataItem, i: number) => string
  yAccessor: (d: SeriesDataItem) => number
  zAccessor: (d: SeriesDataItem) => any
  normalized: boolean
  horizental: boolean
  diverging: boolean
  colors: string[]
  offset: Function
  order: Function
  yFormat: string
}

const StackedBarChart = (container: HTMLElement, data: SeriesDataItem[], options: StackedBarChartOptions) => {
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Required<Dimensions>) => {
    const {
      showXAxisGrid = false,
      showYAxisGrid = false,
      xAxisGridColor = '#eee',
      yAxisGridColor = '#eee',
      xAccessor,
      colors,
      noYAxisLine = false,
      noXAxisLine = false,
      xDomain = data.map(xAccessor),
      zDomain = Object.keys(data[0]).slice(1),
      normalized = false,
      horizental = false,
      diverging = false,
      offset = d3.stackOffsetDiverging,
      order = d3.stackOrderNone,
      yFormat,
      xPadding = 0.4,
      xType = d3.scaleBand,
      yType = d3.scaleLinear,
      zType = d3.scaleOrdinal,
      xRange = [0, dimensions.visorWidth],
      yRange = [dimensions.visorHeight, 0],
      noXAxisTick,
      noYAxisTick,
    } = options

    const xScale = xType(xDomain, xRange).padding(xPadding)
    const series = d3.stack().keys(zDomain).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(data)

    const yDomain = options.yDomain || [0, d3.max(series, (d) => d3.max(d, (d) => d[1]))]

    const yScale = yType(yDomain, yRange).nice()
    const colorScale = zType(zDomain, colors)

    // Draw bottom axis

    if (showXAxisGrid) {
      const xGrid = bounds
        .append('g')
        .call(d3.axisBottom(xScale).tickSize(dimensions.visorHeight + 2))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove())
        .call((g) => g.selectAll('.tick line').attr('stroke', xAxisGridColor))
    }
    const xAxisGenerator = d3.axisBottom(xScale)
    const xAxis = bounds.append('g').call(xAxisGenerator).style('transform', `translateY(${dimensions.visorHeight}px)`)

    if (noXAxisTick) xAxis.call((g) => g.selectAll('.tick line').remove())
    if (noXAxisLine)
      xAxis.call((g) => {
        g.select('.domain').remove()
      })
    if (options.xLabel) {
      const xAxisLabel = xAxis
        .append('text')
        .attr('x', dimensions.visorWidth / 2)
        .attr('y', (dimensions.marginBottom / 3) * 2)
        .attr('fill', 'black')
        .style('font-size', options?.fontSize || '1.4em')
        .html(options.xLabel)
    }
    //Draw left axis

    if (showYAxisGrid) {
      const yGrid = bounds
        .append('g')
        .call(d3.axisRight(yScale).tickSize(dimensions.visorWidth))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick text').remove())
        .call((g) =>
          g.selectAll(`.tick${!noXAxisLine ? ':not(:first-of-type)' : ''} line`).attr('stroke', yAxisGridColor),
        )
    }
    const yAxisGenerator = d3.axisLeft(yScale)
    const yAxis = bounds.append('g').call(yAxisGenerator)
    if (noYAxisTick) yAxis.call((g) => g.selectAll('.tick line').remove())
    if (noYAxisLine) yAxis.call((g) => g.select('.domain').remove())
    if (options.yLabel) {
      const yAxisLabel = yAxis
        .append('text')
        .attr('x', -dimensions.visorHeight / 2)
        .attr('y', (-dimensions.marginLeft / 3) * 2)
        .attr('fill', 'black')
        .style('font-size', options?.fontSize || '1.4em')
        .text(options.yLabel)
        .style('transform', 'rotate(-90deg)')
        .style('text-anchor', 'middle')
    }

    const bar = bounds.selectAll('.bargroup').data(series)

    const mergedBar = bar
      .enter()
      .append('g')
      .merge(bar as any)
      .classed('bargroup', true)
      .attr('fill', function (d) {
        return colorScale(d.key)
      })

    const bars = mergedBar.selectAll('rect').data(function (d) {
      return d
    })

    // if()
    const rect = bars
      .enter()
      .append('rect')
      .merge(bars as any)
      .attr('x', function (d) {
        return xScale(d.data.group)
      })
      .attr('y', function ([y1, y2]) {
        return Math.min(yScale(y1), yScale(y2))
      })
      .attr('height', function ([y1, y2]) {
        return Math.abs(yScale(y1) - yScale(y2))
      })
      .attr('width', xScale.bandwidth())

    // const rect = bars
    // .enter()
    // .append('rect')
    // .merge(bars as any)
    // .attr('x', function (d) {
    //   return xScale(d.data.group)
    // })
    // .attr('y', function (d) {
    //   return yScale(d[1])
    // })
    // .attr('width', function ([x1,x2]) {
    //   return  Math.abs(xScale(x1) - xScale(x2))
    // })
    // .attr('height', yScale.bandwidth())

    rect.exit().remove()
  }

  createVisor(container, renderer, options)
}
export default StackedBarChart
