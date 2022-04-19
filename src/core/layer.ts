import { Dimensions } from './dimensions'

export abstract class Layer {
  abstract render(bound: d3.Selection<SVGGElement, unknown, null, undefined>, dimension: Dimensions): void
}
