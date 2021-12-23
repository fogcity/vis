import { vis } from './build'
const dataset = [...new Array(3)].map((v, i) => ({ key: i + 's', value: Math.random() * 100 }))

vis.render.pieChart(
  document.getElementById('root'),
  {
    colors: ['#386AB6', '#555', '#de4ed3'],
    radius: 100,
    innerRadius: 30,
    padAngle: 0.09,
    dataset,
  },
  { width: 800, height: 400 },
)
