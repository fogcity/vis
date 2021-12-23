import { vis } from './build'
const dataset = [...new Array(3)].map((v, i) => ({ key: i + 's', value: Math.random() * 100 }))

vis.render.pieChart(document.getElementById('root'), {
  color: ['#386AB6', '#555', '#de4ed3'],
  radius: 40,
  dataset,
})
