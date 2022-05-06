import * as d3 from 'd3'
import { combineDimensions, Dimensions } from './dimensions'
import { Layer } from './layer'
export type VisOptions = {
  color?: string | string[] // Fill color for bars. Should be a valid CSS color string
  xLabel?: string // Label for xAxis
  yLabel?: string // Label for yAxis
  fontSize?: string
  xDomain?: any[]
  yDomain?: any[]
  zDomain?: any[]
  noYAxisLine?: boolean
  noXAxisLine?: boolean
  noYAxisTick?: boolean
  noXAxisTick?: boolean
  showXAxisGrid?: boolean
  showYAxisGrid?: boolean
  yAxisGridColor?: string
  xAxisGridColor?: string
  xType?: Function
  yType?: Function
  zType?: Function
  xRange?: any[]
  yRange?: any[]
  xPadding?: number
  noYAxis?: boolean
  noXAxis?: boolean
  xAxisOffset?: number
  yAxisOffset?: number
  yTicks?: number
  xTicks?: number
} & Dimensions

export type ChartData = { values: { index: number; value: number }[]; series?: any[] }

const debounce = (fn: Function, delay: number = 500): Function => {
  let timer: any
  return function (this: any, ...args: any) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      2
      fn.apply(this, args)
    }, delay)
  }
}

export class Visor {
  wrapper!: d3.Selection<HTMLElement, unknown, null, undefined>
  bound!: d3.Selection<SVGGElement, unknown, null, undefined>
  dimensions!: Dimensions
  layers: Layer[] = []
  constructor(container: HTMLElement | string, public options: Dimensions, resize: boolean = true) {
    // Init the container element
    const render = debounce(() => {
      let targetElement
      if (typeof container == 'string') {
        targetElement = document.getElementById(container)
      } else targetElement = container as HTMLElement

      if (targetElement) {
        this.dimensions = combineDimensions({
          ...{ width: targetElement.clientWidth, height: targetElement.clientHeight },
          ...options,
        })
        const { width, height, marginLeft, marginTop, boundedHeight, boundedWidth } = this.dimensions
        // Select the container element
        this.wrapper = d3.select(targetElement)
        this.clear()

        // Adding an SVG element
        const svg = this.wrapper.append('svg')

        // Creating our bounding box - Visor
        this.bound = svg.append('g')

        svg.attr('viewbox', `0 0 ${boundedWidth} ${boundedHeight}`)

        this.bound
          .style('transform', `translate(${marginLeft}px, ${marginTop}px)`)
          .attr('width', boundedWidth)
          .attr('height', boundedHeight)
      } else throw new Error('Ensure the provided element exist!')
    })

    // Render our bounding box and rerender with the window resize
    render()
    if (resize)
      window.addEventListener('resize', () => {
        render()
      })
  }

  add(layer: Layer) {
    this.layers.push(layer)
  }

  render() {
    if (this.layers.length >= 0) {
      this.clear()
      for (const preparedLayer of this.layers) {
        preparedLayer.render(this.bound, this.dimensions)
      }
    }
  }

  clear() {
    if (this.wrapper) this.wrapper.selectAll('*').remove()
  }
}

const createVisor = (
  container: HTMLElement | string,
  renderer?: (visor: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Dimensions) => void,
  opts?: VisOptions,
) => {
  const render = debounce(() => {
    let ct
    if (typeof container == 'string') {
      ct = document.getElementById(container)
    } else ct = container as HTMLElement

    if (ct && opts) {
      const dimensions = combineDimensions({
        ...{ width: ct.clientWidth, height: ct.clientHeight },
        ...opts,
      })

      const wrapper = d3.select(ct)

      wrapper.selectAll('*').remove()

      const svg = wrapper
        .append('svg')
        .attr('viewbox', `0 0 ${dimensions.boundedWidth} ${dimensions.boundedHeight}`)
        .style('min-width', '100%')
        .style('min-height', '100%')

      // Creating our bounding box - Visor
      const visor = svg
        .append('g')
        .style('transform', `translate(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`)
        .attr('width', dimensions.boundedWidth)
        .attr('height', dimensions.boundedHeight)

      renderer?.(visor, dimensions)
    }
  })

  render()
  window.addEventListener('resize', () => {
    render()
  })
}

export const buildVisor = (container: HTMLElement | string, options?: VisOptions) => {
  let computedContainer

  if (typeof container == 'string') {
    computedContainer = document.getElementById(container)
  } else computedContainer = container

  if (computedContainer) {
    let wrapper: d3.Selection<HTMLElement, unknown, null, undefined> | undefined,
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined,
      visor,
      dimensions!: Dimensions

    dimensions = combineDimensions({
      ...{ width: computedContainer.clientWidth, height: computedContainer.clientHeight },
      ...options!,
    })

    const { width, height, boundedHeight, marginLeft, marginTop, boundedWidth } = dimensions
    wrapper = d3.select(computedContainer)

    clearVisor(wrapper)

    svg = wrapper
      .append('svg')
      .attr('viewbox', `0 0 ${width} ${height}`)
      .style('min-width', '100%')
      .style('min-height', '100%')

    // Creating our bounding box - Visor
    visor = svg
      .append('g')
      .style('transform', `translate(${marginLeft}px, ${marginTop}px)`)
      .attr('width', boundedWidth)
      .attr('height', boundedHeight)
    return { wrapper, svg, visor, dimensions }
  }
  return {}
}
function clearVisor(wrapper: d3.Selection<HTMLElement, unknown, null, undefined> | undefined) {
  if (wrapper) wrapper.selectAll('*').remove()
}

export default createVisor
