import * as d3 from 'd3'
import createVisor, { Dimensions, VisOptions } from '../core'
export type TreeData = {
  children: TreeData[]
  name: string
}

export type TreeOptions = VisOptions & {
  path: []
  id: string | null // if tabular data, given a d in data, returns a unique identifier (string)
  parentId: string | null // if tabular data, given a node d, returns its parent’s identifier
  children: any // if hierarchical data, given a d in data, returns its children
  tree: d3.TreeLayout<TreeData> // layout algorithm (typically d3.tree or d3.cluster)
  sort: any // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
  label: (d: TreeData) => string // given a node d, returns the display name
  title: any // given a node d, returns its hover text
  link: any // given a node d, its link (if any)
  r: number // radius of nodes
  padding: number // horizontal padding for first and last column
  fill: string // fill for nodes
  fillOpacity: number // fill opacity for nodes
  stroke: string // stroke for links
  strokeWidth: number // stroke width for links
  strokeOpacity: number // stroke opacity for links
  strokeLinejoin: string // stroke line join for links
  strokeLinecap: string // stroke line cap for links
  halo: string // color of label halo
  haloWidth: number // padding around the labels
}
const Tree = (container: HTMLElement, data: TreeData, options: TreeOptions) => {
  const renderer = (bounds: d3.Selection<SVGGElement, unknown, null, undefined>, dimensions: Required<Dimensions>) => {
    const { visorHeight, visorWidth } = dimensions
    const {
      path,
      id = Array.isArray(data) ? (d: { id: string }) => d.id : null,
      parentId = Array.isArray(data) ? (d: { parentId: string }) => d.parentId : null,
      children,
      tree = d3.tree,
      sort,
      label,
      title,
      link,
      r = 3,
      padding = 1,
      fill = '#999',
      fillOpacity,
      stroke = '#555',
      strokeWidth = 1.5,
      strokeOpacity = 0.4,
      strokeLinejoin,
      strokeLinecap,
      halo = '#fff',
      haloWidth = 3,
    } = options

    const treemap = d3.tree<TreeData>().size([visorWidth, visorHeight])
    let nodes = d3.hierarchy(data, (d) => d.children)
    nodes = treemap(nodes)

    //Adding the Nodes
    const node = bounds
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('g')
      .attr('class', (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
      .attr('transform', (d) => {
        const td = d as d3.HierarchyPointNode<TreeData>
        return 'translate(' + td.y + ',' + td.x + ')'
      })

    //Adding the Circle to Each Node
    node
      .append('circle')
      .attr('r', r)
      .style('stroke', (d: any) => 'red')
      .style('fill', (d: any) => 'red')

    // Linking the Nodes
    const _link =
      link ||
      bounds
        .selectAll('.link')
        .data(nodes.descendants().slice(1))
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('class', 'link')
        //   .style('stroke', (d) => d.data.level)
        .style('stroke', (d: any) => '#eee')
        .attr('stroke-width', 2)
        .attr(
          'd',
          d3
            .linkHorizontal()
            .x((d: any) => d.y)
            .y((d: any) => d.x) as any,
        )

    // Adding Node Labels
    node
      .append('text')
      .attr('dy', r)
      // .attr('x', (d: any) => (d.children ? (d.data.value + 5) * -1 : d.data.value + 5))
      // .attr('y', (d: any) => (d.children && d.depth !== 0 ? -(d.data.value + 5) : d))
      .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
      .text((d: { data: { name: any } }) => d.data.name)
  }
  createVisor(container, renderer, options)
}
export default Tree
