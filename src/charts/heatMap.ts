import { VisOptions } from '../core/createVisor'
/**
 * HeatMap - vertical position of a square represents the day of the week (discrete) - horizontal position of a square represents the week of the year (discrete) - color of
 * a square represents a continuous or discrete metric value (often using a sequential
 * color scale)
 * @param container
 * @param data
 * @param opts
 */
const HeatMap = (
  container: HTMLElement,
  data: { values: number[][]; xTickLabels: string; yTickLabels: string },
  opts: VisOptions,
) => {}
export default HeatMap
