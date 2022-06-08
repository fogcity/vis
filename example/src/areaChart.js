import { vis } from '../build'
import * as d3 from 'd3'
const dataset = [...new Array(10)].map((v, i) => [i, Math.random() * 10])

vis.renderAreaChart(
  document.getElementById('root7'),
  {
    dataset,
  },
  {
    showXAxisGrid: true,
    showYAxisGrid: true,
    color: '#5356FB',
    curve: d3.curveBasis,
    xAccessor: (d) => d[0],
    yAccessor: (d) => d[1],
  },
)
