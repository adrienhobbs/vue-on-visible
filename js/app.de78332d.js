(function(t){function e(e){for(var o,s,a=e[0],c=e[1],u=e[2],l=0,f=[];l<a.length;l++)s=a[l],i[s]&&f.push(i[s][0]),i[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);h&&h(e);while(f.length)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(o=!1)}o&&(r.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},i={1:0},r=[];function s(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(n,o,function(e){return t[e]}.bind(null,o));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/vue-on-visible/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var h=c;r.push([2,0]),n()})({2:function(t,e,n){t.exports=n("Vtdi")},"3qQ0":function(t,e,n){"use strict";n.r(e);n("rGqo"),n("KKXr"),n("Vd3H");(function(t,e){if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.USE_MUTATION_OBSERVER=!0,i.prototype.observe=function(t){var e=this._observationTargets.some(function(e){return e.element==t});if(!e){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=t||"0px",n=e.split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(a(t,"resize",this._checkForIntersections,!0),a(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,c(t,"resize",this._checkForIntersections,!0),c(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():l();this._observationTargets.forEach(function(n){var i=n.element,s=h(i),a=this._rootContainsTarget(i),c=n.entry,u=t&&a&&this._computeTargetAndRootIntersection(i,e),l=n.entry=new o({time:r(),target:i,boundingClientRect:s,rootBounds:e,intersectionRect:u});c?t&&a?this._hasCrossedThreshold(c,l)&&this._queuedEntries.push(l):c&&c.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,o){if("none"!=t.getComputedStyle(n).display){var i=h(n),r=i,s=m(n),a=!1;while(!a){var c=null,l=1==s.nodeType?t.getComputedStyle(s):{};if("none"==l.display)return;if(s==this.root||s==e?(a=!0,c=o):s!=e.body&&s!=e.documentElement&&"visible"!=l.overflow&&(c=h(s)),c&&(r=u(c,r),!r))break;s=m(s)}return r}},i.prototype._getRootRect=function(){var t;if(this.root)t=h(this.root);else{var n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var i=0;i<this.thresholds.length;i++){var r=this.thresholds[i];if(r==n||r==o||r<n!==r<o)return!0}},i.prototype._rootIsInDom=function(){return!this.root||f(e,this.root)},i.prototype._rootContainsTarget=function(t){return f(this.root||e,t)},i.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},i.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=o}function o(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||l(),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,i=o.width*o.height;this.intersectionRatio=n?i/n:this.isIntersecting?1:0}function i(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=s(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function r(){return t.performance&&performance.now&&performance.now()}function s(t,e){var n=null;return function(){n||(n=setTimeout(function(){t(),n=null},e))}}function a(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function c(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function u(t,e){var n=Math.max(t.top,e.top),o=Math.min(t.bottom,e.bottom),i=Math.max(t.left,e.left),r=Math.min(t.right,e.right),s=r-i,a=o-n;return s>=0&&a>=0&&{top:n,bottom:o,left:i,right:r,width:s,height:a}}function h(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):l()}function l(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function f(t,e){var n=e;while(n){if(n==t)return!0;n=m(n)}return!1}function m(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}})(window,document)},EDI0:function(t,e,n){},Vtdi:function(t,e,n){"use strict";n.r(e);var o={};n.r(o),n.d(o,"default",function(){return m}),n.d(o,"OnVisible",function(){return C});n("VRzm");var i=n("Kw5r"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"boxes"},t._l(t.colors,function(e,o){return n("OnVisible",{key:o,attrs:{durationMs:parseInt(t.animationDurationMs),animateAbove:t.animateAbove,animateBelow:t.animateBelow,animationType:t.animation,yoyo:!0}},[n("div",{staticClass:"yah",style:{backgroundColor:e.bg}})])})),t.controls?n("div",{staticClass:"controls"},[n("div",{staticClass:"select"},[n("label",{attrs:{for:""}},[t._v("Effect")]),n("br"),n("select",{directives:[{name:"model",rawName:"v-model",value:t.animation,expression:"animation"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.animation=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"fade"}},[t._v("Fade")]),n("option",{attrs:{value:"zoom"}},[t._v("Zoom")])]),n("br"),n("label",{attrs:{for:"checkbox"}},[t._v("YoYo")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.yoyo,expression:"yoyo"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.yoyo)?t._i(t.yoyo,null)>-1:t.yoyo},on:{change:function(e){var n=t.yoyo,o=e.target,i=!!o.checked;if(Array.isArray(n)){var r=null,s=t._i(n,r);o.checked?s<0&&(t.yoyo=n.concat([r])):s>-1&&(t.yoyo=n.slice(0,s).concat(n.slice(s+1)))}else t.yoyo=i}}}),n("br"),n("label",{attrs:{for:"checkbox"}},[t._v("Animate Above")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.animateAbove,expression:"animateAbove"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.animateAbove)?t._i(t.animateAbove,null)>-1:t.animateAbove},on:{change:function(e){var n=t.animateAbove,o=e.target,i=!!o.checked;if(Array.isArray(n)){var r=null,s=t._i(n,r);o.checked?s<0&&(t.animateAbove=n.concat([r])):s>-1&&(t.animateAbove=n.slice(0,s).concat(n.slice(s+1)))}else t.animateAbove=i}}}),n("br"),n("label",{attrs:{for:"checkbox"}},[t._v("Animate Below")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.animateBelow,expression:"animateBelow"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.animateBelow)?t._i(t.animateBelow,null)>-1:t.animateBelow},on:{change:function(e){var n=t.animateBelow,o=e.target,i=!!o.checked;if(Array.isArray(n)){var r=null,s=t._i(n,r);o.checked?s<0&&(t.animateBelow=n.concat([r])):s>-1&&(t.animateBelow=n.slice(0,s).concat(n.slice(s+1)))}else t.animateBelow=i}}}),n("br"),n("label",{attrs:{for:""}},[t._v("Duration in Ms")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.animationDurationMs,expression:"animationDurationMs"}],attrs:{type:"number",min:"100",step:"50"},domProps:{value:t.animationDurationMs},on:{input:function(e){e.target.composing||(t.animationDurationMs=e.target.value)}}}),n("br"),n("br"),n("label",{attrs:{for:""}},[t._v("Number of items")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.numItems,expression:"numItems"}],attrs:{type:"number",min:"50",max:"500"},domProps:{value:t.numItems},on:{input:function(e){e.target.composing||(t.numItems=e.target.value)}}})])]):t._e()])},s=[],a=(n("bHtr"),{name:"app",data:function(){return{controls:!0,animationDurationMs:580,animateAbove:!0,animateBelow:!0,numItems:30,animation:"fade",yoyo:!0}},computed:{colors:function(){var t=parseInt(this.numItems)||1;return new Array(t).fill("").map(function(e,n){return{bg:"hsl(".concat(n/t*360,",100%,50%)")}})}}}),c=a,u=(n("ZL7j"),n("KHd+")),h=Object(u["a"])(c,r,s,!1,null,null,null),l=h.exports,f=(n("yt8O"),n("RW0V"),n("rGqo"),{install:function(){Object.keys(o).filter(function(t){return"default"!==t}).forEach(function(t){i["a"].component(t,o[t])})}}),m=f,p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("OnVisibleEmitter",{attrs:{yoyo:t.yoyo,offset:t.offsets},on:{"initial-visibility":t.setViewportValues,"enter:from-bottom":t.handleEnterFromBottom,"enter:from-top":t.handleEnterFromTop,"exit:to-top":t.handleLeaveToTop,"exit:to-bottom":t.handleLeaveToBottom}},[n("div",{staticClass:"item",class:t.className,style:{animationDuration:t.durationMs+"ms",height:t.height+"px"},on:{animationend:function(e){t.animationClass=!1}}},[n("img",{staticStyle:{"object-fit":"cover"},attrs:{src:"https://source.unsplash.com/random/1920x"+t.height,alt:""}}),t._t("default")],2)])},d=[],v=n("oyJW"),b=n("yT7P"),y=n("a94B"),g=(n("xfY5"),n("CyHz"),function(){return window.innerHeight||document.documentElement.clientHeight}),_=function(t){var e=t.bottom,n=t.offset;return e<0-n},w=function(t){var e=t.top,n=t.offset;return e>g()+n},I=function(t){return function(e){var n=e.height,o=e.threshold,i=e.offset;return o?n*-o:n<Math.abs(i[t])?Math.sign(this.offset[t])*n:this.offset[t]}},E={name:"OnVisibleEventEmitter",data:function(){return{hasEntered:!1,above:!1,below:!1,top:0,bottom:0,isInView:!1}},props:{offset:{default:0,required:!1},yoyo:{default:!1,required:!1,type:Boolean},accuracy:{default:20,required:!1,type:Number},threshold:{default:0}},computed:{viewport:function(){return{isInView:this.isInView,above:this.above,below:this.below}}},watch:{isInView:function(t,e){e&&this.below&&this.emitEvent("exit:to-bottom"),t&&!this.yoyo&&this.observer.unobserve(this.$refs.container)},yoyo:function(t,e){!e&&t&&this.observer.observe(this.$refs.container)},above:function(t,e){e&&this.isInView?this.emitEvent("enter:from-top"):t&&!this.isInView&&this.emitEvent("exit:to-top")},below:function(t,e){e&&this.isInView&&this.emitEvent("enter:from-bottom")}},mounted:function(){var t=this.buildThresholdList(this.accuracy);this.observer=new IntersectionObserver(this.handleObserver,{root:null,threshold:t}),this.observer.observe(this.$refs.container)},methods:{getTopOffset:I("top"),getBottomOffset:I("bottom"),updateVp:function(t){var e=t.top,n=t.bottom,o=t.height,i={height:o,offset:this.offset,threshold:this.threshold};this.above=_({bottom:n,offset:this.getTopOffset(i)}),this.below=w({top:e,offset:this.getBottomOffset(i)}),this.isInView=!this.above&&!this.below},buildThresholdList:function(t){for(var e=[],n=1;n<=t;n++){var o=n/t;e.push(o)}return e.push(0,this.threshold),e},emitEvent:function(t){this.$emit(t,this.viewport)},handleObserver:function(t){var e=this;t.forEach(function(t){var n=t.boundingClientRect,o=n.top,i=n.height,r=n.bottom;e.updateVp({top:o,bottom:r,height:i}),e.hasEntered||(e.hasEntered=!0,e.$emit("initial-visibility",{visible:e.isInView,above:e.above,below:e.below}))})}}},O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container"},[t._t("default")],2)},T=[],A={name:"OnVisibleEmitter",mixins:[E]},V=A,R=Object(u["a"])(V,O,T,!1,null,null,null),x=R.exports;n("3qQ0");var M={name:"OnVisible",components:{OnVisibleEmitter:x},props:{durationMs:{type:Number,default:400},animationType:{type:String,default:"fade",required:!1},animateAbove:{default:!1,type:Boolean},animateBelow:{default:!0,type:Boolean},offset:{default:0},yoyo:{type:Boolean,default:!1}},data:function(){return{height:this.getRandomHeight(),above:!1,below:!1,visible:!1,animationClass:!1}},computed:{offsets:function(){var t={top:0,bottom:0};return"object"===Object(y["a"])(this.offset)?Object(b["a"])({},t,this.offset):"number"===typeof this.offset?{top:this.offset,bottom:this.offset}:void 0},className:function(){return Object(v["a"])({above:this.above&&this.animateAbove,below:this.below&&this.animateBelow,animated:this.animationClass},this.animationClass,this.animationClass)}},methods:{getRandomHeight:function(){var t=window.innerHeight,e=100;return Math.floor(Math.random()*(t-e+1))+e},setViewportValues:function(t){var e=t.above,n=t.below,o=t.isInView;this.above=e,this.below=n,this.visible=o},setAnimation:function(t){this.animationClass=this.animationType+t},handleEnterFromBottom:function(t){this.setViewportValues(t),this.animateBelow&&this.setAnimation("InUp")},handleEnterFromTop:function(t){this.setViewportValues(t),this.animateAbove&&this.setAnimation("InDown")},handleLeaveToBottom:function(t){this.setViewportValues(t),this.animateBelow&&this.setAnimation("OutDown")},handleLeaveToTop:function(t){this.setViewportValues(t),this.animateAbove&&this.setAnimation("OutUp")}}},k=M,B=(n("tbmY"),Object(u["a"])(k,p,d,!1,null,null,null)),C=B.exports;i["a"].use(m),i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(l)}}).$mount("#app")},ZL7j:function(t,e,n){"use strict";var o=n("EDI0"),i=n.n(o);i.a},t4gm:function(t,e,n){},tbmY:function(t,e,n){"use strict";var o=n("t4gm"),i=n.n(o);i.a}});
//# sourceMappingURL=app.de78332d.js.map