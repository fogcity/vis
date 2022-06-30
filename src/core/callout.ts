import * as d3 from 'd3'
import { Dimensions } from './dimensions'
type CalloutOptions = Partial<{
  noXLine: boolean
  showXGrid: boolean
  noYLine: boolean
  showYGrid: boolean
  xGridColor: string
  yGridColor: string
  xLabel: string
  yLabel: string
  noXTick: boolean
  noYTick: boolean
  fontSize: string
}>
const defaultOptions = {
  noXLine: false,
  noXTick: false,
  showXGrid: false,
  noYLine: false,
  showYGrid: false,
  xGridColor: 'initial',
  yGridColor: 'red',
  xLabel: '',
  yLabel: '',
  noYTick: false,
  fontSize: '1.2em',
}
class Callout {
  constructor(public identifier: string) {}

  getIdentifier = () => {
    return this.identifier
  }
}
export function renderCallout(
  visor: d3.Selection<SVGGElement, unknown, null, undefined>,
  dimensions: Dimensions,
  opts?: CalloutOptions,
) {
  const { visorHeight, visorWidth, marginBottom, marginLeft } = dimensions
}
