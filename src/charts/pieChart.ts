import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'
import createVisor, { VisOptions } from '../core/visor'

// Each slice's data struct
type PieChartItem = { key: string; value: number }

// All params and visor settings

type pieChartOpts = VisOptions & {
  padAngle: number // Spacing angle between each block
  innerRadius: number // Inner ring radius
  radius: number
  colors: string[]
}

/**
 * Pie Chart - angle of a slice represents a continuous or discrete metric
 * @param container
 * @param params
 * @param options
 */
const pieChart = (container: HTMLElement, data: PieChartItem[], options: pieChartOpts) => {
  /**
   *
   * A few tips for making effective pie charts:
   *  1. Restrict the number of slices to five or fewer.
   *      Note that we combined the last few slices into
   *      an 'other' category to keep the focus on the larger slices.
   *  2. Order the slices by size.
   *  3. Label each slice directly.
   */
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => {
    const { padAngle, radius = 40, innerRadius = radius * 0.7, colors } = options

    const combinedDataset =
      data.length > 5
        ? [
            ...data.slice(0, 4),
            {
              key: 'other',
              value: data.slice(4).reduce((a, v, i) => {
                a += v.value
                return a
              }, 0),
            },
          ]
        : data

    // Draw data
    const drawPie = () => {
      const arcGenerator = d3
        .pie<PieChartItem>()
        .sort((a, b) => a.value - b.value)
        .padAngle(padAngle)
        .value((d) => d.value)

      const arcs = arcGenerator(combinedDataset)

      const colorScale = d3
        .scaleOrdinal<string>()
        .domain(arcs.map((d) => d.data.key))
        .range(colors)

      const arc = d3
        .arc()
        .innerRadius(Math.min(radius, innerRadius)) // set to 0 for a pie chart
        .outerRadius(radius)

      bounds.style('transform', `translate(50%,50%)`)

      bounds
        .selectAll('path')
        .data(arcs)
        .enter()
        .append('path')
        .attr('fill', (d) => (d.data.key == 'other' ? '#dadadd' : colorScale(d.data.key)))
        .attr('d', arc as any)
        .append('title')
        .text((d) => d.data.key)
    }

    drawPie()
  }

  createVisor(container, renderer, options)
}
export default pieChart
