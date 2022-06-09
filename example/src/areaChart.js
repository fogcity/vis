import { vis } from '../build'
import * as d3 from 'd3'
const dataset = [...new Array(40)].map((v, i) => [i, Math.random() * 9, Math.max(Math.random() * 10, 9)])

vis.renderAreaChart(
  document.getElementById('root'),

  dataset,
  { fillColor: '#5356FB', strokeColor: '#5356FB' },
)
