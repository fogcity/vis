import { vis } from '../dist'
console.log(
  new Array(100).map((v) => ({
    x: Math.ceil(Math.random() * 100),
    y: Math.random() * 100,
  })),
)
vis.render.lineChart(
  document.getElementById('root'),
  {
    dataset: [...new Array(100)].map((v, i) => [i, Math.ceil(Math.random() * 100)]),
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
