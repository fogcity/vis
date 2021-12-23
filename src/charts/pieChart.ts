import * as d3 from 'd3'
import { Dimensions } from '../core/dimensions'
import createVisor, { VisorOptions } from '../core/visor'

// Each slice's data struct
type Datum = { key: string; value: number }

// All params and visor settings
type pieChartParams = { radius: number; colors: string[]; dataset: Datum[]; series: any[] }
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
    const { radius, colors, dataset } = params
    console.log('dataset', dataset)
    console.log(colors)

    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(dataset.map((v) => v.key))
      .range(colors)

    console.log('colorScale', colorScale)

    // Draw data
    const drawPie = () => {
      const pie = d3
        .pie<Datum>()
        .sort(null)
        .value(function (d) {
          return d.value
        })

      const path = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0)

      console.log('pie(dataset)', pie(dataset))

      const label = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 80)

      const arc = bounds
        .selectAll('arc')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', path as any)
        .attr('fill', function (d) {
          return colorScale(d.data.key)
        })
    }

    drawPie()
  }

  createVisor(container, renderer, opts)
}
export default pieChart
