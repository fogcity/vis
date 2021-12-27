// import * as d3 from 'd3'
// import { Dimensions } from '../core/dimensions'
// import createVisor, { VisOptions } from '../core/visor'

// type StackedAreaChartParams = { dataset: number[][]; time: Date[]; series: string[] }
// type StackedAreaChartOpts = VisOptions & {
//   yAccessor: (d: any) => number
//   xAccessor: (d: any) => Date
//   lineWidth: number
//   colors: string[]
//   noYDomain: boolean
//   noXDomain: boolean
//   showXGrid: boolean
//   showYGrid: boolean
//   yGridColor: string
//   xGridColor: string
//   curve: d3.CurveFactoryLineOnly | d3.CurveFactory
// }
// const StackedAreaChart = (container: HTMLElement, params: StackedAreaChartParams, opts: StackedAreaChartOpts) => {
//   const { dataset, time, series } = params
//   const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
//     const {
//       showXGrid = false,
//       showYGrid = false,
//       xGridColor = '#eee',
//       yGridColor = '#eee',
//       yAccessor = (d: any) => d.time,
//       xAccessor = (d: any) => d.time,
//       lineWidth = 2,
//       curve = d3.curveLinear,
//       colors,
//       noYDomain = false,
//       noXDomain = false,
//     } = opts

//     const xScale = d3
//       .scaleTime()
//       .domain(d3.extent(time, xAccessor) as Date[])
//       .range([0, dimensions.boundedWidth])
//       .nice()

//     const flattenValues: number[] = []
//     for (const iterator of dataset) {
//       for (const key in iterator) {
//         if (Object.prototype.hasOwnProperty.call(iterator, key)) {
//           const element = iterator[key]
//           if (typeof element == 'number') flattenValues.push(element)
//         }
//       }
//     }
//     const yScale = d3
//       .scaleLinear()
//       .domain(d3.extent(flattenValues) as [number, number])
//       .range([dimensions.boundedHeight, 0])
//       .nice()

//     // Draw data
//     const drawStack = (dataset: number[][], color: string) => {
//       const stackGenerator = d3.stack().keys(series)
//       const stackedSeries = stackGenerator()
//       const colorScale = d3.scaleOrdinal().domain(series).range(colors)

//       const areaGen = d3
//         .area()
//         .x((d) => xScale(d.data.month))
//         .y0((d) => yScale(d[0]))
//         .y1((d) => yScale(d[1]))

//       d3.select('#demo1')
//         .selectAll('.areas')
//         .data(stackedSeries)
//         .join('path')
//         .attr('d', areaGen)
//         .attr('fill', (d) => colorScale(d.key))
//     }

//     // Draw bottom axis
//     const xAxisGenerator = d3.axisBottom(xScale)

//     const xAxis = bounds
//       .append('g')
//       .call(xAxisGenerator)
//       .style('transform', `translateY(${dimensions.boundedHeight}px)`)

//     if (noXDomain) xAxis.call((g) => g.select('.domain').remove())
//     if (showXGrid) {
//       const xGrid = bounds
//         .append('g')
//         .call(d3.axisBottom(xScale).tickSize(dimensions.boundedHeight))
//         // .style('transform', `translateY(${dimensions.boundedHeight}px)`)
//         .call((g) => g.select('.domain').remove())
//         .call((g) => g.selectAll('.tick text').remove())
//         .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', xGridColor))
//     }
//     if (opts.xLabel) {
//       const xAxisLabel = xAxis
//         .append('text')
//         .attr('x', dimensions.boundedWidth / 2)
//         .attr('y', (dimensions.marginBottom / 3) * 2)
//         .attr('fill', 'black')
//         .style('font-size', opts?.fontSize || '1.4em')
//         .html(opts.xLabel)
//     }
//     // Draw left axis
//     const yAxisGenerator = d3.axisLeft(yScale)
//     const yAxis = bounds.append('g').call(yAxisGenerator)

//     if (noYDomain) yAxis.call((g) => g.select('.domain').remove())
//     if (showYGrid) {
//       const yGrid = bounds
//         .append('g')
//         .call(d3.axisRight(yScale).tickSize(dimensions.boundedWidth))
//         .call((g) => g.select('.domain').remove())
//         .call((g) => g.selectAll('.tick text').remove())
//         .call((g) => g.selectAll('.tick:not(:first-of-type) line').attr('stroke', yGridColor))
//     }
//     if (opts.yLabel) {
//       const yAxisLabel = yAxis
//         .append('text')
//         .attr('x', -dimensions.boundedHeight / 2)
//         .attr('y', (-dimensions.marginLeft / 3) * 2)
//         .attr('fill', 'black')
//         .style('font-size', opts?.fontSize || '1.4em')
//         .text(opts.yLabel)
//         .style('transform', 'rotate(-90deg)')
//         .style('text-anchor', 'middle')
//     }

//     drawStack(params.dataset, color)
//   }

//   createVisor(container, renderer, { type: 'StackedAreaChart', ...opts })
// }
// export default StackedAreaChart
