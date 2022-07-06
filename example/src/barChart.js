import { vis } from '../build'
const dataset = [...new Array(10)].map((v, i) => [i, Math.random() * 100])

vis.renderBarChart(document.getElementById('root5'), dataset, {
  horizontal: false,
})
