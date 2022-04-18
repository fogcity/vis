import { vis } from '../build'
const x = [...new Array(70)].map((v, i) => i)
const y = [...new Array(20)].map((v, i) => i)

const dataset = [...new Array(1000)].map((v, i) => ({
  x: x[Math.floor(Math.random() * 70)],
  y: y[Math.floor(Math.random() * 20)],
  value: Math.max(Math.random() * 400, 1),
}))

vis.renderHeatMap(document.getElementById('root6'), dataset, {
  startColor: '#EF5D5E',
  endColor: '#110C2F',
  paddingInnerX: 0.1,
  paddingInnerY: 0.1,
})
