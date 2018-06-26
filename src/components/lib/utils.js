export const getViewportHeight = () =>
  window.innerHeight || document.documentElement.clientHeight

export const isAbove = ({ bottom, offset }) => bottom < 0 - offset
export const isBelow = ({ top, offset }) => top > getViewportHeight() + offset
export const getOffset = loc => {
  return function({ height, threshold, offset }) {
    if (!threshold) {
      return height < Math.abs(offset[loc])
        ? Math.sign(this.offset[loc]) * height
        : this.offset[loc]
    } else {
      return height * -threshold
    }
  }
}
