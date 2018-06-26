export const getViewportHeight = () =>
  window.innerHeight || document.documentElement.clientHeight

export const isAbove = ({ bottom, offset }) => bottom < 0 - offset
export const isBelow = ({ top, offset }) => top > getViewportHeight() + offset
export const getOffset = loc => {
  return function({ height, threshold, offset }) {
    if (!threshold) {
      return height < Math.abs(offset[loc])
        ? Math.sign(offset[loc]) * height
        : offset[loc]
    } else {
      return height * -threshold
    }
  }
}
export const getTopOffset = getOffset('top')
export const getBottomOffset = getOffset('bottom')
