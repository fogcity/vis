import { vis } from '../build'
const dataset = [...new Array(10)].map((v, i) => ({ key: i + 's', value: Math.random() * 100 }))

vis.renderBarChart(
  document.getElementById('root4'),
  {
    dataset,
  },
  {
    showYAxisGrid: true,
    horizontal: false,
    color: '#781D42',
    xAccessor: (d) => d.key,
    yAccessor: (d) => d.value,
  },
)
