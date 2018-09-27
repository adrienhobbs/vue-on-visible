import ObserverItem from './observer-item'

const Observer = (function() {
  const items = []
  const Observers = {}

  // adds 100 steps to observer
  const buildThresholdList = numSteps => {
    var thresholds = []
    for (var i = 1.0; i <= numSteps; i++) {
      var ratio = i / numSteps
      thresholds.push(ratio)
    }
    thresholds.push(0)
    return thresholds
  }

  // updates an observer item with current observer props
  const handleUpdate = entries => {
    entries.forEach(entry => {
      const item = items.filter(item => item.elm === entry.target)[0]
      item.update(entry)
    })
  }

  // creates observer with supplied rootmargin
  const createObserver = rootMargin => {
    return new IntersectionObserver(handleUpdate, {
      root: null,
      rootMargin,
      threshold: buildThresholdList(100)
    })
  }

  // create an observer and observer item
  const observe = ({
    elm,
    onUpdate,
    topOffset = '0%',
    bottomOffset = '0%',
    repeat = false
  }) => {
    const newItem = Object.create(ObserverItem)
    const rootMargin = `${topOffset} 0px ${bottomOffset} 0px`

    // if an observer with the same root margin exists, use it, otherwise create a new one.
    Observers[rootMargin] = Observers[rootMargin] || createObserver(rootMargin)
    Observers[rootMargin].observe(elm)

    newItem.elm = elm
    newItem.onUpdate = onUpdate
    newItem.repeat = repeat
    newItem.observer = Observers[rootMargin]

    items.push(newItem)
  }

  return {
    observe
  }
})()

export default Observer
