export default {
  get isPartiallyBelow() {
    return this.bottom > this.bottomThreshold && this.top < this.bottomThreshold
  },
  get isVisible() {
    return this.intersectionRatio > 0
  },
  get isPartiallyAbove() {
    return this.top < this.topThreshold && this.bottom > this.topThreshold
  },
  get bottom() {
    return this.rect.bottom
  },
  get top() {
    return this.rect.top
  },
  get rect() {
    return this.entry.boundingClientRect || this.elm.getBoundingClientRect()
  },
  get bottomThreshold() {
    return this.entry.rootBounds.bottom
  },
  get topThreshold() {
    return this.entry.rootBounds.top
  },
  get isAbove() {
    return this.bottom < this.topThreshold
  },
  get isBelow() {
    return this.top > this.bottomThreshold
  },
  get intersectionRatio() {
    return this.entry.intersectionRatio
  },
  update(entry) {
    this.entry = entry
    // trigger update function on component instance
    this.onUpdate(this)

    if (entry.intersectionRatio > 0 && !this.repeat) {
      this.observer.unobserve(this.elm)
    }
  }
}
