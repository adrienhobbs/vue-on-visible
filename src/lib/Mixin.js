const OnVisibleMixin = {
  name: 'OnVisibleMixin',
  props: {
    topOffset: {
      type: String,
      default: '0%'
    },
    bottomOffset: {
      type: String,
      default: '0%'
    },
    repeat: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isVisible: null,
      intersectionRatio: null,
      isAbove: null,
      isBelow: null,
      isPartiallyAbove: null,
      isPartiallyBelow: null,
      rect: null
    }
  },
  methods: {
    onUpdate(item) {
      // copy properties we want to component data.
      [
        'rect',
        'isAbove',
        'isBelow',
        'isPartiallyAbove',
        'isPartiallyBelow',
        'isVisible',
        'intersectionRatio'
      ].forEach(prop => {
        this[prop] = item[prop]
      })
      // this.$emit('visibility-update', item)
    }
  }
}

export default OnVisibleMixin
