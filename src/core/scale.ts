import d3 from 'd3'

const useColorScale = (datas: string[], colors: string[]) => {
  return d3.scaleOrdinal().domain(datas).range(colors)
}

export { useColorScale }
