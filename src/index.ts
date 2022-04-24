// Really easy to use api
// Nice but easy to reproduce style
// Small but beautiful intrusion
import { HeatMap, AreaChart, Tree, StackedBarChart, PieChart, ScatterPlot, LineChart, BarChart } from './charts'

const vis = {
  renderHeatMap: HeatMap,
  renderScatterPlot: ScatterPlot,
  renderLineChart: LineChart,
  renderBarChart: BarChart,
  renderPieChart: PieChart,
  renderTree: Tree,
  renderAreaChart: AreaChart,
  renderStackedBarChart: StackedBarChart,
}

export { vis }
