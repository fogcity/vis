import { vis } from './build'
const dataset = [...new Array(30)].map((v, i) => ({ key: i + 's', value: Math.random() * 100 }))

vis.render.barChart(
  document.getElementById('root'),
  {
    dataset,
  },
  {
    showYGrid: true,
    showXGrid: true,
    horizontal: false,
    color: '#386AB6',
    xAccessor: (d) => d.key,
    yAccessor: (d) => d.value,
    width: 800,
    height: 400,
    xLabel: 'Time',
    yLabel: 'Question',
  },
)
