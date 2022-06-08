import * as d3 from 'd3-scale'

const useColorScale = (datas: string[], colors: string[]) => {
  return d3.scaleOrdinal().domain(datas).range(colors)
}

/**
 * continuous => continuous
 */
const scaleLinear = (domian: [number, number], range: [number, number]) => d3.scaleLinear().domain(domian).range(range)
const b = scaleLinear([0, 10], [0, 100])
console.log(b(1))

/**
 * discrete => continuous
 */
const scaleBand = (domian: string[], range: [number, number]) => d3.scaleBand().domain(domian).range(range)

export { useColorScale, scaleLinear, scaleBand }
