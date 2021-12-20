export type ChartOpts = {
  color: string | string[] // Fill color for bars. Should be a valid CSS color string
  width: number // Width of chart in px
  height: number // Height of chart in px
  xLabel: string // Label for xAxis
  yLabel: string // Label for yAxis
  fontSize: string
  xType: 'quantitative' | 'ordinal' | 'nominal'
  yType: 'quantitative' | 'ordinal' | 'nominal'
}
export type ChartData = { values: { index: number; value: number }[]; series: any[] }
const vis = () => {}
export default vis
