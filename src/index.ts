// Really easy to use api
// Nice but easy to reproduce style
// Small but beautiful intrusion
import { HeatMap, Area, Tree, StackedBarChart, PieChart, ScatterPlot, LineChart, BarChart } from './charts'
import map from './map'
const vis = {
  renderHeatMap: HeatMap,
  renderMap: map,
  renderScatterPlot: ScatterPlot,
  renderLineChart: LineChart,
  renderBarChart: BarChart,
  renderPieChart: PieChart,
  renderTree: Tree,
  renderAreaChart: Area,
  renderStackedBarChart: StackedBarChart,
}

export { vis }
