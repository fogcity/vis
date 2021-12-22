import * as d3 from 'd3'
import { combineDimensions, Dimensions } from './dimensions'
export type VisorOptions = {
  color: string | string[] // Fill color for bars. Should be a valid CSS color string
  xLabel: string // Label for xAxis
  yLabel: string // Label for yAxis
  fontSize: string
  xType: 'quantitative' | 'ordinal' | 'nominal'
  yType: 'quantitative' | 'ordinal' | 'nominal'
} & Dimensions

export type ChartData = { values: { index: number; value: number }[]; series: any[] }

const createVisor = (
  container: HTMLElement,
  renderer: (visor: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => void,
  opts: VisorOptions,
) => {
  const dimensions = combineDimensions({ ...{ width: container.clientWidth, height: container.clientHeight }, ...opts })

  const wrapper = d3.select(container)
  wrapper.selectAll('*').remove()

  // Adding an SVG element
  const svg = wrapper.append('svg')
  svg.attr('width', dimensions.width)
  svg.attr('height', dimensions.height)

  console.log('svg', svg)

  // Creating our bounding box - Visor
  const visor = svg
    .append('g')
    .style('transform', `translate(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`)
    .style('width', dimensions.boundedWidth)
    .style('height', dimensions.boundedHeight)

  renderer?.(visor, dimensions)
}

export default createVisor
