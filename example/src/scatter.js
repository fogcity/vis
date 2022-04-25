import { vis } from '../build'

vis.renderScatterPlot(
  document.getElementById('root3'),
  {
    dataset: [...new Array(50)].map((v) => ({
      x: Math.ceil(Math.random() * 10),
      y: Math.ceil(Math.random() * 10),
    })),
  },
  {
    xDomain: [-2, 12],
    showXAxisGrid: true,
    showYAxisGrid: true,
    noXAxisLine: true,
    noYAxisLine: true,
    noYAxisTick: true,
    color: '#781D42',
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
    rAccessor: (d) => Math.min(d.y, 10),
    hollow: true,
    noXAxisTick: true,
  },
)
