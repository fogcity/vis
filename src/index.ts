import { scatterPlot, lineChart, barChart } from './charts'
import map from './map'
import createVisor from './core'
const vis = {
  render: {
    map,
    scatterPlot,
    lineChart,
    barChart,
  },
  visor: createVisor,
}

export { vis }
