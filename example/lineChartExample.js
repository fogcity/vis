import { vis } from './build'
const dataset = [...new Array(50)].map((v, i) => [i, Math.random() * 100])

vis.render.lineChart(
  document.getElementById('root'),
  {
    dataset,
  },
  {
    showXGrid: true,
    showYGrid: true,
    color: '#386AB6',
    xAccessor: (d) => d[0],
    yAccessor: (d) => d[1],
    width: 800,
    height: 400,
    xLabel: 'Time',
    yLabel: 'Question',
  },
)
