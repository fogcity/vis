import { vis } from '../build'
import * as d3 from 'd3'
const dataset = [...new Array(50)].map((v, i) => [i, Math.random() * 100])

vis.renderAreaChart(
  document.getElementById('root7'),
  {
    dataset,
  },
  {
    showXAxisGrid: true,
    showYAxisGrid: true,
    color: '#781D42',

    xAccessor: (d) => d[0],
    yAccessor: (d) => d[1],
  },
)
