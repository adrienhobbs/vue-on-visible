export default {
  name: 'AnimationMixin',
  props: {
    viewport: {
      required: true
    },
    animationDuration: {
      default: 650,
      required: false,
      type: Number
    }
  },
  computed: {
    className() {
      const { fromTop, fromBottom, toTop, toBottom } = this.viewport

      return {
        'from-top': fromTop,
        'from-bottom': fromBottom,
        'to-bottom': toBottom,
        'to-top': toTop,
        visible: this.viewport.isVisible
      }
    }
  }
}
