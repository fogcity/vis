import { vis } from '../build'
const dataset = [...new Array(50)].map((v, i) => [i, Math.random() * 100])

vis.renderLineChart(
  document.getElementById('root2'),
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
