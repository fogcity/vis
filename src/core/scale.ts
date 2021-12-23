import d3 from 'd3'

const getColorScale = (datas: any[], colors: string[]) => {
  return d3.scaleOrdinal().domain(datas).range(colors)
}

export { getColorScale }
