import { vis } from '../build'
const x = [...new Array(5)].map((v, i) => i)
const y = [...new Array(5)].map((v, i) => i)

const dataset = [...new Array(25)].map((v, i) => ({
  x: x[Math.floor(Math.random() * 5)],
  y: y[Math.floor(Math.random() * 5)],
  value: Math.max(Math.random() * 10, 1),
}))

vis.renderHeatMap(document.getElementById('root6'), dataset, {
  startColor: 'rgb(107, 0, 255)',
  endColor: '#110C2F',
  paddingInnerX: 0.1,
  paddingInnerY: 0.1,
})
