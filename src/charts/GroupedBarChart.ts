// import createVisor, { ChartData, VisOptions } from '../core/createVisor'
// import * as d3 from 'd3'
// import { Dimensions } from '../core/dimensions'

// type rect = { key: string; value: number }
// type GroupedBarChartParams = { dataset: rect[]; series: any[] }
// type GroupedBarChartOpts = VisOptions & {
//   yAccessor: (d: rect) => number
//   xAccessor: (d: rect) => string
//   color: string
//   horizontal: boolean
//   gap: number
// }

// const GroupedBarChart = (container: HTMLElement, params: GroupedBarChartParams, opts: GroupedBarChartOpts) => {
//   const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
//     const {
//       showXAxisGrid = false,
//       showYAxisGrid = false,
//       xAxisGridColor = '#eee',
//       yAxisGridColor = '#eee',
//       yAccessor,
//       xAccessor,
//       color,
//       horizontal = false,
//       gap = 4,
//       noYAxisLine = false,
//       noXAxisLine = false,
//     } = opts

//     const xScale = !horizontal
//       ? d3.scaleBand().domain(params.dataset.map(xAccessor)).range([0, dimensions.visorWidth])
//       : d3
//           .scaleLinear()
//           .domain(d3.extent(params.dataset, yAccessor) as number[])
//           .range([0, dimensions.visorWidth])
//           .nice()

//     const yScale = !horizontal
//       ? d3
//           .scaleLinear()
//           .domain(d3.extent(params.dataset, yAccessor) as number[])
//           .range([dimensions.visorHeight, 0])
//           .nice()
//       : d3.scaleBand().domain(params.dataset.map(xAccessor)).range([0, dimensions.visorHeight])

//     const drawAxis = (xScale: d3.AxisScale<d3.AxisDomain>, yScale: d3.AxisScale<d3.AxisDomain>) => {
//       // Draw bottom axis
//       const xAxisGenerator = d3.axisBottom(xScale)

//       const xAxis = bounds
//         .append('g')
//         .call(xAxisGenerator)
//         .style('transform', `translateY(${dimensions.visorHeight}px)`)

//       if (noXAxisLine) xAxis.call((g) => g.select('.domain').remove())
//       if (showXAxisGrid) {
//         const xGrid = bounds
//           .append('g')
//           .call(d3.axisBottom(xScale).tickSize(dimensions.visorHeight))
//           .call((g) => g.select('.domain').remove())
//           .call((g) => g.selectAll('.tick text').remove())
//           .call((g) => g.selectAll('.tick line').attr('stroke', xAxisGridColor))
//       }
//       if (opts.xLabel) {
//         const xAxisLabel = xAxis
//           .append('text')
//           .attr('x', dimensions.visorWidth / 2)
//           .attr('y', (dimensions.marginBottom / 3) * 2)
//           .attr('fill', 'black')
//           .style('font-size', opts?.fontSize || '1.4em')
//           .html(opts.xLabel)
//       }
//       // Draw left axis
//       const yAxisGenerator = d3.axisLeft(yScale)
//       const yAxis = bounds.append('g').call(yAxisGenerator)

//       if (noYAxisLine) yAxis.call((g) => g.select('.domain').remove())
//       if (showYAxisGrid) {
//         const yGrid = bounds
//           .append('g')
//           .call(d3.axisRight(yScale).tickSize(dimensions.visorWidth))
//           .call((g) => g.select('.domain').remove())
//           .call((g) => g.selectAll('.tick text').remove())
//           .call((g) => g.selectAll('.tick line').attr('stroke', yAxisGridColor))
//       }
//       if (opts.yLabel) {
//         const yAxisLabel = yAxis
//           .append('text')
//           .attr('x', -dimensions.visorHeight / 2)
//           .attr('y', (-dimensions.marginLeft / 3) * 2)
//           .attr('fill', 'black')
//           .style('font-size', opts?.fontSize || '1.4em')
//           .text(opts.yLabel)
//           .style('transform', 'rotate(-90deg)')
//           .style('text-anchor', 'middle')
//       }
//     }
//     // Draw data
//     const drawBars = (dataset: rect[], color: string) => {
//       const bar = bounds.selectAll('rect').data(dataset).enter().append('rect').attr('fill', color)
//       if (!horizontal) {
//         const xs = xScale as d3.ScaleBand<string>
//         const ys = yScale as d3.ScaleLinear<number, number, never>

//         bar
//           .attr('x', function (d) {
//             return xs(xAccessor(d) as string) as unknown as string
//           })
//           .attr('y', function (d) {
//             console.log('ys(yAccessor(d))', d)

//             return ys(yAccessor(d))
//           })
//           .attr('width', xs.bandwidth() - 2 * gap)
//           .attr('height', function (d) {
//             return dimensions.visorHeight - ys(yAccessor(d))
//           })
//           .style('transform', function (d) {
//             return `translateX(${gap}px)`
//           })
//           .on('mouseenter', function (d, i) {
//             bounds
//               .append('line')
//               .attr('class', 'align-line')
//               .attr('x1', 0)
//               .attr('y1', ys(yAccessor(d)))
//               .attr('x2', dimensions.visorWidth)
//               .attr('y2', ys(yAccessor(d)))
//               .attr('stroke', '#999')

//             // this is only part of the implementation, check the source code
//           })
//           .on('mouseleave', function (d, i) {
//             bounds.selectAll('.align-line').remove()
//             // this is only part of the implementation, check the source code
//           })
//       } else {
//         const xs = xScale as d3.ScaleLinear<number, number, never>
//         const ys = yScale as d3.ScaleBand<string>

//         bar
//           .attr('x', 0)
//           .attr('y', function (d) {
//             return ys(xAccessor(d)) as unknown as string
//           })
//           .attr('width', function (d) {
//             return dimensions.visorWidth - xs(yAccessor(d))
//           })
//           .attr('height', ys.bandwidth() - 2 * gap)
//           .style('transform', function (d) {
//             return `translateY(${gap}px)`
//           })
//           .on('mouseenter', function (d, i) {
//             bounds
//               .append('line')
//               .attr('class', 'align-line')
//               .attr('x1', dimensions.visorWidth - xs(yAccessor(d)))
//               .attr('y1', 0)
//               .attr('x2', dimensions.visorWidth - xs(yAccessor(d)))
//               .attr('y2', dimensions.visorHeight)
//               .attr('stroke', 'red')

//             // this is only part of the implementation, check the source code
//           })
//           .on('mouseleave', function (d, i) {
//             bounds.selectAll('.align-line').remove()
//             // this is only part of the implementation, check the source code
//           })
//       }
//     }

//     drawAxis(xScale as d3.AxisScale<d3.AxisDomain>, yScale as d3.AxisScale<d3.AxisDomain>)

//     drawBars(params.dataset, color)
//   }

//   createVisor(container, renderer, opts)
// }

// export default GroupedBarChart
