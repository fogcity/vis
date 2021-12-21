import { scatterPlot, lineChart } from './charts'
import createVisor from './core'
const vis = {
  render: {
    scatterPlot,
    lineChart,
  },
  visor: createVisor,
}

export { vis }
