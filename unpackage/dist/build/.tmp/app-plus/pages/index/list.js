(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/list"],{"0539":function(t,e,o){"use strict";o.r(e);var a=o("1dfb"),n=o.n(a);for(var r in a)"default"!==r&&function(t){o.d(e,t,function(){return a[t]})}(r);e["default"]=n.a},"1dfb":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(o("c868")),n=r(o("d829"));r(o("9e5e")),r(o("acf1"));function r(t){return t&&t.__esModule?t:{default:t}}function s(t){return d(t)||u(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function d(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}function c(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var l={data:function(){var t;return t={goodsList:[],loadStatus:"more",page:1},c(t,"loadStatus","more"),c(t,"keyword",""),c(t,"zone_type",null),t},onLoad:function(e){e&&(e.zone_type?this.zone_type=e.zone_type:e.keyword&&(this.keyword=e.keyword,t.setNavigationBarTitle({title:"搜索结果"})),this.getGoodsList())},methods:{getGoodsList:function(){var e=this;this.loadStatus="loading",1==this.page&&(this.goodsList=t.getStorageSync("product_goodstype_"+this.currentCls)||[]);var o={type:0,page:this.page,keyword:this.keyword};this.zone_type&&(o.zone_type=this.zone_type),this.$post("api/shop/product/lists",o).then(function(o){var a;1==o.code?(o.data.has_more?e.loadStatus="more":e.loadStatus="noMore",1==e.page?(e.goodsList=o.data.data,t.setStorageSync("product_goodstype_"+e.currentCls,o.data.data)):(a=e.goodsList).push.apply(a,s(o.data.data))):(e.loadStatus="noMore",e.$toast(o.msg))})}},components:{GoodsItem:a.default,LoadMore:n.default},onReachBottom:function(){"more"==this.loadStatus&&(this.page++,this.getGoodsList())}};e.default=l}).call(this,o("6e42")["default"])},"8bf7":function(t,e,o){"use strict";var a=o("f956"),n=o.n(a);n.a},"8f6c":function(t,e,o){"use strict";o.r(e);var a=o("adf4"),n=o("0539");for(var r in n)"default"!==r&&function(t){o.d(e,t,function(){return n[t]})}(r);o("8bf7");var s=o("2877"),i=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"c358fe82",null);e["default"]=i.exports},"93ce":function(t,e,o){"use strict";o("263f");var a=r(o("b0ce")),n=r(o("8f6c"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},adf4:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("view",{staticClass:"plr30 list"},[o("view",{staticClass:"goods-list"},t._l(t.goodsList,function(t,e){return o("goods-item",{key:e,attrs:{data:t,mpcomid:"3ea73ccc-0-"+e}})})),o("load-more",{attrs:{status:t.loadStatus,mpcomid:"3ea73ccc-1"}})],1)},n=[];o.d(e,"a",function(){return a}),o.d(e,"b",function(){return n})},f956:function(t,e,o){}},[["93ce","common/runtime","common/vendor"]]]);