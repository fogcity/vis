import * as d3 from 'd3'
export type ChartOpts = {
  color: string | string[] // Fill color for bars. Should be a valid CSS color string
  width: number // Width of chart in px
  height: number // Height of chart in px
  xLabel: string // Label for xAxis
  yLabel: string // Label for yAxis
  fontSize: string
  marginTop: number // Margin container top of chart in px
  marginBottom: number // Margin container bottom of chart in px
  marginLeft: number // Margin container left of chart in px
  marginRight: number // Margin container rignt of chart in px
  xType: 'quantitative' | 'ordinal' | 'nominal'
  yType: 'quantitative' | 'ordinal' | 'nominal'
}
export type ChartData = { values: { index: number; value: number }[]; series: any[] }
const createVisor = (container: HTMLElement, data: any[], opts: ChartOpts) => {
  const settings = opts
  let visor: any
  if (container.tagName == 'svg') {
    visor = d3.select(container).data(data).enter().append('g')
  } else {
    visor = d3.select(container).selectAll().data(data).enter().append('g')
  }
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      visor.style('width', function () {
        return Math.max(0, entry.contentRect.width - settings.marginLeft - settings.marginRight) + 'px'
      })
      visor.style('height', function () {
        return Math.max(0, entry.contentRect.height - settings.marginTop - settings.marginBottom) + 'px'
      })
    }
  })
  resizeObserver.observe(container)
}

export default createVisor
