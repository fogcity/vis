export type Dimensions = {
  height: number
  width: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  boundedHeight: number
  boundedWidth: number
}
export const combineDimensions = (dim: Dimensions) => {
  const defaultDim = {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 60,
    marginLeft: 60,
  }

  const mergedDim = {
    ...defaultDim,
    ...dim,
  }

  return {
    ...mergedDim,
    boundedHeight: Math.max(mergedDim?.height - mergedDim.marginTop - mergedDim.marginBottom, 0),
    boundedWidth: Math.max(mergedDim?.width - mergedDim.marginLeft - mergedDim.marginRight, 0),
  }
}

export const useDimensions = (dim: Dimensions) => {
  const combinedDim = combineDimensions(dim)
  return [combinedDim, combineDimensions]
}
