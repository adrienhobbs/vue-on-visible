# Vue-On-Visible

A collection of Vue components aimed to help you create better interactions with elements as they enter and exit the viewport.

[Demo](https://adrienhobbs.github.io/vue-on-visible/)

This uses the [`Interaction Observer API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and includes a [`polyfill`](https://github.com/w3c/IntersectionObserver/blob/master/polyfill/README.md) enabling support in the following browsers:

<table>
  <tr>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/chrome/chrome_48x48.png" alt="Chrome"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/firefox/firefox_48x48.png" alt="Firefox"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/safari/safari_48x48.png" alt="Safari"><br>
      6+
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/edge/edge_48x48.png" alt="Edge"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png" alt="Internet Explorer"><br>
      7+
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/opera/opera_48x48.png" alt="Opera"><br>
      ✔
    </td>
    <td align="center">
      <img src="https://raw.github.com/alrra/browser-logos/39.2.2/src/android/android_48x48.png" alt="Android"><br>
      4.4+
    </td>
  </tr>
</table>

---

## Table of contents

- [Installation](#installation)
- [Animation](#animation)
- [Component](#component)
- [Directive](#directive)
- [Properties](#properties)
- [Offsets](#offsets)

# Installation

```
npm install --save vue-on-visible
```

# Importing

### Install Directive and Components

```javascript
import Vue from 'vue'
import OnVisible from 'vue-on-visible'

Vue.use(OnVisible)
```

# Animation

Using built-in component `<AnimateOnVisible>` for quick turnkey animations on visibility changes.

```html
  <AnimateOnVisible>
    <YourComponentHere />
  </AnimateOnVisible>
```
See below for available props.

| PropName          | Type         | Default                   | Description                                                         |
| ----------------- | :----------: | :------------------------ | :------------------------------------------------------------------ |
| animateAbove      | BOOLEAN      | false                     | Animate when entering from above viewport?                          |
| animateBelow      | BOOLEAN      | true                      | Animate when entering from below viewport?                          |
| animationType     | STRING       | fade                      | Choose from fade, slide, and zoom. More to come.                    |
| animationDuration | NUMBER in ms | 650                       | Duration of animations.                                             |
| yoyo              | BOOLEAN      | false                     | Repeat animaton on entering and exiting?                            |
| offsets           | OBJECT       | {top: '0%', bottom: '0%'} | When to trigger visibility updates. See Offsets for an explanation. |

# Directive 
Use the `v-on-visible` directive to integrate visibility updates into your own components.

Template: 
```html
  <YourComponent v-on-visible="{onUpdate, offsets, yoyo}" />
```

| PropName | Type     | Default                   | Description                                                         |
| -------- | :------: | :------------------------ | :------------------------------------------------------------------ |
| onUpdate | Function | n/a - REQUIRED            | Function to be called when visibility changes occur.                |
| yoyo     | BOOLEAN  | false                     | Repeat animaton on entering and exiting?                            |
| offsets  | OBJECT   | {top: '0%', bottom: '0%'} | When to trigger visibility updates. See Offsets for an explanation. |

Component:
```javascript

const YourComponent = {
  name: 'OnVisibleMixin',
  data() {
    return {
      isVisible: null,
      offsets: {
        top: '0%', bottom: '0%' 
      },
      yoyo: true 
    }
  },
  methods: {
    onUpdate(item) {
      // Do something with values...
      // See Properties Section for properties available on an item.
    }
  }
}
  
```
# Component
Using built-in component `<OnVisible>` with `slot-scope` for updates on visibility changes.

```html
<OnVisible :offsets={} :yoyo="true">
  <div slot-scope="onVisible">
    <!-- SEE PROPERTIES SECTION BELOW FOR AVAILABLE PROPS -->
    <YourComponent isVisible="onVisible.isVisible" isBelow="onVisible.isBelow"/>
  </div>
</OnVisible>

```

# Properties
The following properties will be send on all visibility updates:

| PropName          | Type    | Description                                        |
| ----------------- | :-----: | :------------------------------------------------- |
| isVisible         | BOOLEAN | Component is in viewport                           |
| isAbove           | BOOLEAN | Component is above viewport                        |
| isBelow           | BOOLEAN | Component is below viewport                        |
| isPartiallyAbove  | BOOLEAN | Component is in viewport, but also above viewport  |
| isPartiallyBelow  | BOOLEAN | Component is in viewport, but also below viewport  |
| intersectionRatio | NUMBER  | Amount of component visible. Decimal between 0 - 1 |
| rect              | OBJECT  | Object with boundingRect properties                |

# Offsets
The default offset will trigger visibility changes when your component enters/exits the viewport at the top or bottom. You can change this behavior by providing your own offsets object. Negative offsets are triggered inside of the viewport, while positive offsets are triggered outside the viewport.

```javascript
// Place triggers 10% below the top of the viewport, and 10% above the bottom of the viewport.
{top: '10%', bottom: '10%'}

// Place triggers 10% above the top of the viewport, and 10% below the bottom of the viewport.
{top: '-10%', bottom: '-10%'}
```

> This is still a work in progress so any feedback and or pull requests are welcome.