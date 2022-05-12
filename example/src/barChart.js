import { vis } from '../build'
const dataset = [...new Array(10)].map((v, i) => ({ key: i, value: Math.random() * 100 }))

vis.renderBarChart(
  document.getElementById('root4'),
  {
    dataset,
  },
  {
    horizontal: true,
    color: 'rgb(107, 0, 255)',
    xAccessor: (d) => d.key,
    yAccessor: (d) => d.value,
  },
)
