import { vis } from '../build'
const x = [...new Array(20)].map((v, i) => i)
const y = [...new Array(20)].map((v, i) => i)

const dataset = [...new Array(400)].map((v, i) => ({
  x: x[Math.floor(Math.random() * 20)],
  y: y[Math.floor(Math.random() * 20)],
  value: Math.max(Math.random() * 400, 1),
}))

vis.renderHeatMap(document.getElementById('root6'), dataset, {
  startColor: 'rgb(107, 0, 255)',
  endColor: '#110C2F',
  paddingInnerX: 0.1,
  paddingInnerY: 0.1,
})
