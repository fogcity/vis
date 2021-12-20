import { histogram, lineChart, barChart, scatterPlot, heatMap } from './charts'

const render = {
  lineChart,
  scatterPlot,
  heatMap,
  barChart,
  histogram,
}

const visPrototype = {
  render,
  visor: () => {},
}

const target = Object.create(visPrototype)
const handler = {
  get(target: object, prop: PropertyKey, receiver: any) {
    return Reflect.get(target, prop, receiver)
  },
  set(target: object, prop: PropertyKey, val: any, receiver: any) {
    return Reflect.set(target, prop, val, receiver)
  },
}
const vis = new Proxy(target, handler)
export default vis
