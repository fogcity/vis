import { vis } from '../build'

vis.renderScatterPlot(
  document.getElementById('root3'),
  {
    dataset: [...new Array(100)].map((v) => ({
      x: Math.max(Math.ceil(Math.random() * 100), 3),
      y: Math.ceil(Math.random() * 100),
    })),
  },
  {
    showXAxisGrid: true,
    showYAxisGrid: true,
    color: '#781D42',
    xAccessor: (d) => d.x,
    yAccessor: (d) => d.y,
    rAccessor: (d) => 3,

    noXAxisTick: true,
  },
)
