import * as d3 from 'd3'

/**
 * continuous => continuous
 */
const scaleLinear = (domian: [number, number], range: [number, number]) => d3.scaleLinear().domain(domian).range(range)

/**
 * discrete => continuous
 */
const scaleBand = (domian: string[], range: [number, number]) => d3.scaleBand().domain(domian).range(range)

/**
 * discrete => discrete
 */
const scaleOrdinal = (domian: string[], range: string[]) => d3.scaleOrdinal().domain(domian).range(range)

export { scaleOrdinal, scaleLinear, scaleBand }
