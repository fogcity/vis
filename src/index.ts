import { histogram, lineChart, barChart, scatterPlot, heatMap } from './charts'
import { createVisor } from './core'

const render = {
  lineChart,
  scatterPlot,
  heatMap,
  barChart,
  histogram,
}

const visPrototype = {
  render,
  visor: createVisor,
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
