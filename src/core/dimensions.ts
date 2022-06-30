export type Dimensions = Partial<{
  height: number
  width: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  visorHeight: number
  visorWidth: number
}>

export const combineDimensions = (dimensions: Dimensions & { height: number; width: number }): Required<Dimensions> => {
  const defaultDimensions = {
    marginTop: 50,
    marginRight: 50,
    marginBottom: 50,
    marginLeft: 50,
  }

  const mergedDimensions = {
    ...defaultDimensions,
    ...dimensions,
  }

  return {
    ...mergedDimensions,
    visorHeight: mergedDimensions.height - mergedDimensions.marginTop - mergedDimensions.marginBottom,
    visorWidth: mergedDimensions.width - mergedDimensions.marginLeft - mergedDimensions.marginRight,
  }
}
