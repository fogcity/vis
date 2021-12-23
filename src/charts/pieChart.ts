import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'
import createVisor, { VisorOptions } from '../core/visor'

// Each slice's data struct
type Datum = { key: string; value: number }

// All params and visor settings
type pieChartParams = {
  padAngle: number // Spacing angle between each block
  innerRadius: number // Inner ring radius
  radius: number
  colors: string[]
  dataset: Datum[]
}
type pieChartOpts = VisorOptions & {}

/**
 * Pie Chart - angle of a slice represents a continuous or discrete metric
 * @param container
 * @param params
 * @param opts
 */
const pieChart = (container: HTMLElement, params: pieChartParams, opts: pieChartOpts) => {
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
    const { padAngle, radius = 40, innerRadius = radius * 0.7, colors, dataset } = params

    const combinedDataset =
      dataset.length > 5
        ? [
            ...dataset.slice(0, 4),
            {
              key: 'other',
              value: dataset.slice(4).reduce((a, v, i) => {
                a += v.value
                return a
              }, 0),
            },
          ]
        : dataset

    // Draw data
    const drawPie = () => {
      const arcGenerator = d3
        .pie<Datum>()
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

      bounds.style('transform', `translate(${dimensions.boundedWidth / 2}px,${dimensions.boundedHeight / 2}px)`)

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

  createVisor(container, renderer, opts)
}
export default pieChart
