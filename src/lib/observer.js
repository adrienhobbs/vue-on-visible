import ObserverItem from './observer-item'

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
    onUpdate,
    offsets = { top: 0, bottom: 0 },
    yoyo = false
  }) => {
    const newItem = Object.create(ObserverItem)
    const rootMargin = `${offsets.top} 0px ${offsets.bottom} 0px`

    // if an observer with the same root margin exists, use it, otherwise create a new one.
    Observers[rootMargin] = Observers[rootMargin] || createObserver(rootMargin)
    Observers[rootMargin].observe(elm)

    newItem.elm = elm
    newItem.onUpdate = onUpdate
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
