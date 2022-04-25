import { vis } from '../build'
import * as d3 from 'd3'
const dataset = [...new Array(10)].map((v, i) => [i, Math.random() * 100])

vis.renderLineChart(
  document.getElementById('root2'),
  {
    dataset,
  },
  {
    showXAxisGrid: true,
    showYAxisGrid: true,
    color: '#781D42',
    lineWidth: 2.5,
    curve: d3.curveNatural,
    xAccessor: (d) => d[0],
    yAccessor: (d) => d[1],
  },
)
