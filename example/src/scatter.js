import { vis } from '../build'

vis.renderScatterPlot(
  document.getElementById('root4'),
  [...new Array(200)].map((v) => [Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 40)]),
)
