import { vis } from '../build'
const x = [...new Array(20)].map((v, i) => i)
const y = [...new Array(20)].map((v, i) => i)

const dataset = [...new Array(400)].map((v, i) => [
  x[Math.floor(Math.random() * 20)],
  y[Math.floor(Math.random() * 20)],
  Math.max(Math.random() * 400, 1),
])

vis.renderHeatMap(document.getElementById('root6'), dataset, {
  color: ['#5356FB', '#110C2F'],
  paddingInnerX: 0.1,
  paddingInnerY: 0.1,
})
