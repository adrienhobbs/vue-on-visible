const Observer = (function() {
  const items = []
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
      return this.entry.rootBounds.bottom + this.offsets.bottom
    },
    get topThreshold() {
      return this.entry.rootBounds.top - this.offsets.top
    },
    get isAbove() {
      return this.bottom < this.topThreshold
    },
    get isBelow() {
      return this.top > this.bottomThreshold
    }
  }

  const handleUpdate = entries => {
    entries.forEach(entry => {
      const item = items.filter(item => item.elm === entry.target)[0]
      item.entry = entry
      const { isAbove, isBelow } = item
      item.cb({ isAbove, isBelow })

      // item.cb(entry.intersectionRatio)
      // item.el.style.opacity = entry.intersectionRatio
      // console.log(item, entry.target, entry.intersectionRatio)
    })
  }

  const Observer = new IntersectionObserver(handleUpdate, {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList(60)
  })

  const observe = item => {
    const newItem = Object.create(Item)
    newItem.elm = item.elm
    newItem.cb = item.cb
    newItem.offsets = { top: 0, bottom: 0 }
    items.push(newItem)

    Observer.observe(newItem.elm)
  }

  return {
    observe
  }
})()

export default Observer
