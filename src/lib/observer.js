const Observer = (function() {
  const items = []
  const Observers = {}
  const buildThresholdList = numSteps => {
    var thresholds = []
    for (var i = 1.0; i <= numSteps; i++) {
      var ratio = i / numSteps
      thresholds.push(ratio)
    }
    thresholds.push(0)
    return thresholds
  }
  const Item = {
    get isPartiallyBelow() {
      return (
        this.bottom > this.bottomThreshold && this.top < this.bottomThreshold
      )
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
      this.callback(this)
      if (entry.intersectionRatio === 1 && !this.yoyo) {
        this.observer.unobserve(this.elm)
      }
    }
  }

  const handleUpdate = entries => {
    entries.forEach(entry => {
      const item = items.filter(item => item.elm === entry.target)[0]
      item.update(entry)
    })
  }

  const createObserver = rootMargin => {
    return new IntersectionObserver(handleUpdate, {
      root: null,
      rootMargin,
      threshold: buildThresholdList(100)
    })
  }

  const observe = ({
    elm,
    callback,
    offsets = { top: 0, bottom: 0 },
    yoyo = false
  }) => {
    const newItem = Object.create(Item)
    const rootMargin = `${offsets.top} 0px ${offsets.bottom} 0px`
    Observers[rootMargin] = Observers[rootMargin] || createObserver(rootMargin)
    Observers[rootMargin].observe(elm)

    newItem.elm = elm
    newItem.callback = callback
    newItem.offsets = offsets
    newItem.yoyo = yoyo
    newItem.rootMargin = rootMargin
    newItem.observer = Observers[rootMargin]

    items.push(newItem)
  }

  return {
    observe
  }
})()

export default Observer
