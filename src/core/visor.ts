import * as d3 from 'd3'
import { combineDimensions, Dimensions } from './dimensions'
export type VisOptions = {
  color: string | string[] // Fill color for bars. Should be a valid CSS color string
  xLabel?: string // Label for xAxis
  yLabel?: string // Label for yAxis
  fontSize?: string
  xDomain?: []
  yDomain?: []
  zDomain?: []
  noYAxisLine?: boolean
  noXAxisLine?: boolean
  noYAxisTick?: boolean
  noXAxisTick?: boolean
  showXAxisGrid?: boolean
  showYAxisGrid?: boolean
  yAxisGridColor?: string
  xAxisGridColor?: string
  xType: Function
  yType: Function
  zType: Function
  xRange: []
  yRange: []
  xPadding: number
  noYAxis?: boolean
  noXAxis?: boolean
  xAxisOffset?: number
  yAxisOffset?: number
  yTicks?: number
  xTicks?: number
} & Dimensions

export type ChartData = { values: { index: number; value: number }[]; series: any[] }

const debounce = (fn: Function, delay: number = 500): Function => {
  let timer: any
  return function (this: any, ...args: any) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const createVisor = (
  container: HTMLElement | string,
  renderer: (visor: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => void,
  opts: VisOptions,
) => {
  const render = debounce(() => {
    let ct
    if (typeof container == 'string') {
      ct = document.getElementById(container)
    } else ct = container as HTMLElement

    if (ct) {
      const dimensions = combineDimensions({
        ...{ width: ct.clientWidth, height: ct.clientHeight },
        ...opts,
      })

      const wrapper = d3.select(ct)
      wrapper.selectAll('*').remove()

      // Adding an SVG element
      const svg = wrapper.append('svg')
      console.log(svg)

      // Creating our bounding box - Visor
      const visor = svg.append('g')

      svg
        // .transition()
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
      visor
        .style('transform', `translate(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`)
        .attr('width', dimensions.boundedWidth)
        .attr('height', dimensions.boundedHeight)

      console.log(dimensions)

      renderer?.(visor, dimensions)
    }
  })

  render()
  window.addEventListener('resize', () => {
    render()
  })
}

export default createVisor
