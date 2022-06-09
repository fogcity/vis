import { renderArcs, ArcData, ArcOptions, defaultOptions } from '../core/arc'
import { buildVisor, VisOptions } from '../core/visor'

type ArcChartOpts = VisOptions & ArcOptions

const PieChart = (container: HTMLElement, dataset: ArcData[], opts: ArcChartOpts) => {
  const { visor, dimensions } = buildVisor(container)
  if (visor && dimensions) {
    const { xDomain, yDomain, ...rest } = { ...defaultOptions, ...opts }
    renderArcs(visor, dataset)
  }
}
export default PieChart
