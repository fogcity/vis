// Really easy to use api
// Nice but easy to reproduce style
// Small but beautiful intrusion
import { StackedBarChart, PieChart, ScatterPlot, LineChart, BarChart } from './charts'
import map from './map'
const vis = {
  renderMap: map,
  renderScatterPlot: ScatterPlot,
  renderLineChart: LineChart,
  renderBarChart: BarChart,
  renderPieChart: PieChart,
  renderStackedBarChart: StackedBarChart,
}

export { vis }
