import { vis } from './build'
const dataset = [...new Array(3)].map((v, i) => ({ key: i + 's', value: Math.random() * 100 }))

vis.renderPieChart(
  document.getElementById('root5'),
  {
    colors: ['#386AB6', '#555', '#de4ed3'],
    radius: 50,
    innerRadius: 30,
    padAngle: 0.09,
    dataset,
  },
  { width: 300, height: 200 },
)
