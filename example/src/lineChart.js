import { vis } from '../build'
import * as d3 from 'd3'
function randn() {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}
const dataset = [...new Array(50)].map((v, i) => {
  const n = randn()
  return [i, n]
})

vis.renderLineChart(document.getElementById('root2'), dataset, { color: '#5356FB' })
