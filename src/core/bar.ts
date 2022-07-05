import { ScaleLinear, Selection } from 'd3'

export const defaultOptions = {
  yAccessor: (d: BarData) => d[1],
  xAccessor: (d: BarData) => d[0],
  color: 'black',
  horizontal: true,
  anim: false,
}
export type BarData = [number, number]
export type BarsOptions = Partial<typeof defaultOptions>

export function renderBars(
  visor: Selection<SVGGElement, unknown, null, undefined>,
  data: BarData[],
  xScale: d3.ScaleBand<string>,
  yScale: d3.ScaleLinear<number, number, never>,
  options?: BarsOptions,
) {
  const { anim, horizontal, xAccessor, yAccessor, color } = { ...defaultOptions, ...options }
  const bar = visor.selectAll('rect').data(data).join('rect').attr('fill', color)
  if (!horizontal) {
    const xs = xScale as d3.ScaleBand<string>
    const ys = yScale

    bar
      .attr('x', function (d) {
        return xs(xAccessor(d) as string) as unknown as string
      })
      .attr('y', function (d) {
        return ys(yAccessor(d))
      })
      .attr('width', xs.bandwidth() - 2 * gap)
      .attr('height', function (d) {
        return dimensions.visorHeight - ys(yAccessor(d))
      })
      .style('transform', function (d) {
        return `translateX(${gap}px)`
      })
      .on('mouseenter', function (d, i) {
        bounds
          .append('line')
          .attr('class', 'align-line')
          .attr('x1', 0)
          .attr('y1', ys(yAccessor(d)))
          .attr('x2', dimensions.visorWidth)
          .attr('y2', ys(yAccessor(d)))
          .attr('stroke', '#999')

        // this is only part of the implementation, check the source code
      })
      .on('mouseleave', function (d, i) {
        bounds.selectAll('.align-line').remove()
        // this is only part of the implementation, check the source code
      })
  } else {
    const xs = xScale as d3.ScaleLinear<number, number, never>
    const ys = yScale as d3.ScaleBand<string>

    bar
      .attr('x', 0)
      .attr('y', function (d) {
        return ys(xAccessor(d)) as unknown as string
      })
      .attr('width', function (d) {
        return dimensions.visorWidth - xs(yAccessor(d))
      })
      .attr('height', ys.bandwidth() - 2 * gap)
      .style('transform', function (d) {
        return `translateY(${gap}px)`
      })
      .on('mouseenter', function (d, i) {
        bounds
          .append('line')
          .attr('class', 'align-line')
          .attr('x1', dimensions.visorWidth - xs(yAccessor(d)))
          .attr('y1', 0)
          .attr('x2', dimensions.visorWidth - xs(yAccessor(d)))
          .attr('y2', dimensions.visorHeight)
          .attr('stroke', 'red')

        // this is only part of the implementation, check the source code
      })
      .on('mouseleave', function (d, i) {
        bounds.selectAll('.align-line').remove()
        // this is only part of the implementation, check the source code
      })
    if (anim) {
    }
  }
}
