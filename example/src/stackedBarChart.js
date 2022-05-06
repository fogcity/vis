import { vis } from '../build'
import * as d3 from 'd3'
d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv').then((d) => {
  vis.renderStackedBarChart('root', d, {
    colors: ['#DE834D', '#A3423C', 'rgb(107, 0, 255)'],
    // xPadding: 1,
    // width: 300,
    // height: 200,
    // showXAxisGrid: true,
    showYAxisGrid: true,
    noXAxisLine: true,
    noYAxisLine: true,
    // noXAxisTick: true,
    // noYAxisTick: true,
    xAccessor: (d) => d.group,
  })
})
