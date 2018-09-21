const OnVisibleMixin = {
  name: 'OnVisibleMixin',
  props: {
    offsets: {
      type: Object,
      default: function() {
        return { top: '0%', bottom: '0%' }
      },
      required: false
    },
    yoyo: {
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
      this.$emit('visibility-update', item)
    }
  }
}

export default OnVisibleMixin
