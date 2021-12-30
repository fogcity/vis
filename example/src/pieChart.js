import { vis } from '../build'
const dataset = [...new Array(3)].map((v, i) => ({ key: i + 's', value: Math.random() * 100 }))

vis.renderPieChart(document.getElementById('root5'), dataset, {
  colors: ['#DE834D', '#A3423C', '#781D42'],
  radius: 80,
  innerRadius: 30,
  padAngle: 0.09,
})
