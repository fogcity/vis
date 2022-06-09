import * as d3 from 'd3'
import vars from '../theme/vars'

export const defaultOptions = {
  opacity: 0.2,
  colors: [],
  strokeWidth: 1,
  outerRadius: 120,
  innerRadius: 80,
  cornerRadius: 6,
  padAngle: 0.2,
  max: 4,
  curve: d3.curveMonotoneX,
  anim: true,
}

export type ArcData = [string, number]
export type ArcOptions = Partial<typeof defaultOptions>

export function renderArcs(
  visor: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: ArcData[],
  opts?: ArcOptions,
) {
  const { anim, cornerRadius, max, padAngle, outerRadius, innerRadius, colors } = {
    ...defaultOptions,
    ...opts,
  }
  const combinedDataset =
    data.length > max
      ? data.slice(0, max - 1).concat([
          [
            'other',
            data.slice(max - 1).reduce((a, v, i) => {
              a += v[1]
              return a
            }, 0),
          ],
        ])
      : data

  console.log('combinedDataset', combinedDataset)
  const arcGenerator = d3
    .arc()
    .innerRadius(Math.min(outerRadius, innerRadius)) // set to 0 for a pie chart
    .outerRadius(outerRadius)
    .padAngle(padAngle)
    .cornerRadius(cornerRadius)

  const arcLayoutGenerator = d3
    .pie<ArcData>()
    .sort((a, b) => a[1] - b[1])
    .value((d) => d[1])

  const arcs = arcLayoutGenerator(combinedDataset)

  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(arcs.map((d) => d.data[0]))
    .range(colors)

  visor.style('transform', `translate(50%,50%)`)

  visor
    .selectAll('path')
    .data(arcs)
    .join('path')
    .attr('fill', (d) => (d.data[0] == 'other' ? '#dadadd' : colorScale(d.data[0])))
    .attr('d', arcGenerator as any)
    .join('text')
    .text((d) => d.data[0])
}
