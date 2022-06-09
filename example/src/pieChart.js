import { vis } from '../build'
const dataset = [...new Array(5)].map((v, i) => [i + 's', Math.random() * 100])

vis.renderPieChart(document.getElementById('root3'), dataset, {
  colors: ['#DE834D', '#A3423C', '#5356FB'],
})
