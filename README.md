# Vue-On-Visible

*Easily observe changes in an elements visibility & viewport location.*

Designed to help you improve performance and integrate interactivity in response to an elements position on the page. 

Example use cases:
1. Trigger an animation on elements entering and exiting the viewport.
2. Lazy loading an image when an element is 10% below the viewport. 

See [Demo](https://adrienhobbs.github.io/vue-on-visible/).

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

# Directive 
Use the `v-on-visible` directive to integrate visibility updates into your own components.

| PropName     | Type     | Default        | Description                                                         |
| ------------ | :------: | :------------- | :------------------------------------------------------------------ |
| onUpdate     | Function | n/a - REQUIRED | Function to be called when visibility changes occur.                |
| repeat       | BOOLEAN  | false          | Trigger updates on every enter & exit of viewport?                  |
| topOffset    | STRING   | "0%"           | When to trigger visibility updates. See Offsets for an explanation. |
| bottomOffset | STRING   | "0%"           | When to trigger visibility updates. See Offsets for an explanation. |

Template: 
```html
  <YourComponent v-on-visible="{onUpdate, topOffset, bottomOffset, repeat}" />
```

Component:
```javascript

const YourComponent = {
  data() {
    return {
      topOffset: '0%',
      bottomOffset: '0%',
      repeat: true 
    }
  },
  methods: {
    onUpdate(item) {
      // Do something with values...
      // isVisible, isAbove, isBelow, isPartiallyAbove, isPartiallyBelow, intersectionRatio
      // See Properties Section for details
    }
  }
}
  
```
# Component
Using built-in component `<OnVisible>` with `slot-scope` for updates on visibility changes.

> In this example, Intersection Point is 10% from the top and bottom inside the viewport. 
      
```html
<OnVisible topOffset="-10%" bottomOffset="-10%" :repeat="true">
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

# Offsets
The default offset will trigger visibility changes when your component enters/exits the viewport at the top or bottom. You can change this behavior by providing your own offsets object. Negative offsets are triggered inside of the viewport, while positive offsets are triggered outside the viewport.

> For visibility changes to trigger when an element is outside the viewport use a positive number.

```javascript
// Visibility changes occur 10% above the top of the viewport, and 10% below the bottom of the viewport.
const topOffset = '10%'
const bottomOffset = '10%'
```
> For visibility changes to trigger when an element is inside the viewport use a negative number.

```javascript
// Visibility changes occur 10% below the top of the viewport, and 10% above the bottom of the viewport.
const topOffset = '-10%'
const bottomOffset = '-10%'
```