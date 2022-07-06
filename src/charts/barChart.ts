import { AxisDomain, AxisScale, extent } from 'd3'
import { renderAxis } from '../core/axis'
import { scaleBand, scaleLinear } from '../core/scales'
import { buildVisor, VisOptions } from '../core/visor'
import { renderBars, BarData, defaultOptions } from '../core/bar'

type BarChartOptions = VisOptions & {
  yAccessor: (d: BarData) => number
  xAccessor: (d: BarData) => string
  color: string
  horizontal: boolean
  gap: number
}

const BarChart = (container: HTMLElement, dataset: BarData[], options: BarChartOptions) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const ops = { ...defaultOptions, ...options }
    const { horizontal, yAccessor, xAccessor, ...rest } = ops

    const xScale = !horizontal
      ? scaleBand(dataset.map(xAccessor), [0, dimensions.visorWidth])
      : scaleLinear(extent(dataset, yAccessor) as [number, number], [0, dimensions.visorWidth]).nice()

    const yScale = !horizontal
      ? scaleLinear(extent(dataset, yAccessor) as [number, number], [dimensions.visorHeight, 0]).nice()
      : scaleBand(dataset.map(xAccessor), [0, dimensions.visorHeight])

    const xAxis = renderAxis('x', visor, dimensions, xScale as AxisScale<AxisDomain>, rest)
    const yAxis = renderAxis('y', visor, dimensions, yScale as AxisScale<AxisDomain>, rest)
    renderBars(visor, dimensions, dataset, xScale, yScale, ops)
  }
}
export default BarChart
