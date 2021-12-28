import { vis } from './build'
// import './lineChartExample'
// import './barChart'
import './scatterExample'
// import './pieChart'
import * as d3 from 'd3'
d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv').then((d) => {
  vis.renderStackedBarChart('root', d, {
    colors: ['#e41a1c', '#377eb8', '#4daf4a'],
    // xPadding: 1,
    // width: 300,
    // height: 200,
    // showXAxisGrid: true,
    showYAxisGrid: true,
    // noXAxisLine: true,
    noYAxisLine: true,
    // noXAxisTick: true,
    noYAxisTick: true,
    xAccessor: (d) => d.group,
  })
})
