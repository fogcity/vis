import { vis } from '../build'

vis.renderScatterPlot(
  document.getElementById('root3'),
  {
    dataset: [...new Array(200)].map((v) => ({
      x: Math.ceil(Math.random() * 100),
      y: Math.ceil(Math.random() * 40),
    })),
  },
  {
    xDomain: [-2, 12],
    noXAxisLine: true,
    noYAxisLine: true,
    noYAxisTick: true,
    color: '#5356FB',
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
    rAccessor: (d) => Math.min(d.y, 10),
    hollow: true,
    noXAxisTick: true,
  },
)
