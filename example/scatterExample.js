import { vis } from '../dist'
console.log(
  new Array(100).map((v) => ({
    x: Math.ceil(Math.random() * 100),
    y: Math.random() * 100,
  })),
)
vis.render.scatterPlot(
  document.getElementById('root'),
  {
    dataset: [...new Array(100)].map((v) => ({
      x: Math.max(Math.ceil(Math.random() * 100), 3),
      y: Math.ceil(Math.random() * 100),
    })),
  },
  {
    showXGrid: true,
    showYGrid: true,
    color: '#386AB6',
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
    rAccessor: (d) => 3,
    width: 800,
    height: 400,
    xLabel: 'Time',
    yLabel: 'Question',
  },
)
