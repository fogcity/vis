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
