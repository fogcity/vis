export type Dimensions = Partial<{
  height: number
  width: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  boundedHeight: number
  boundedWidth: number
}>

export const combineDimensions = (dim: Dimensions & { height: number; width: number }): Required<Dimensions> => {
  const defaultDim = {
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50,
  }

  const mergedDim = {
    ...defaultDim,
    ...dim,
  }

  return {
    ...mergedDim,
    boundedHeight: mergedDim.height - mergedDim.marginTop - mergedDim.marginBottom,
    boundedWidth: mergedDim.width - mergedDim.marginLeft - mergedDim.marginRight,
  }
}
