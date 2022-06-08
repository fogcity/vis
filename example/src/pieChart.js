import { vis } from '../build'
const dataset = [...new Array(3)].map((v, i) => ({ key: i + 's', value: Math.random() * 100 }))

vis.renderPieChart(document.getElementById('root5-1'), dataset, {
  colors: ['#DE834D', '#A3423C', '#5356FB'],
  radius: 80,
  innerRadius: 30,
  padAngle: 0.09,
})
vis.renderPieChart(document.getElementById('root5-2'), dataset, {
  colors: ['#DE834D', '#A3423C', '#5356FB'],
  radius: 90,
  innerRadius: 80,
  padAngle: 0.09,
})
vis.renderPieChart(document.getElementById('root5-3'), dataset, {
  colors: ['#DE834D', '#A3423C', '#5356FB'],
  radius: 80,
  innerRadius: 0,
  padAngle: 0.0,
})
