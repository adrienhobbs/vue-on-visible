export const getViewportHeight = function getVpHeight() {
  return window.innerHeight || document.documentElement.clientHeight
}
export const isAbove = ({ bottom, offset }) => bottom < 0 - offset
export const isBelow = ({ top, offset }) => top > getViewportHeight() + offset
