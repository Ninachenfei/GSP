(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/search"],{"0b90":function(e,t,a){"use strict";a.r(t);var s=a("a4b7"),c=a("c31a");for(var r in c)"default"!==r&&function(e){a.d(t,e,function(){return c[e]})}(r);a("548e");var n=a("2877"),i=Object(n["a"])(c["default"],s["a"],s["b"],!1,null,"7c2c93cc",null);t["default"]=i.exports},1090:function(e,t,a){},"37fa":function(e,t,a){"use strict";a("263f");var s=r(a("b0ce")),c=r(a("0b90"));function r(e){return e&&e.__esModule?e:{default:e}}Page((0,s.default)(c.default))},"548e":function(e,t,a){"use strict";var s=a("1090"),c=a.n(s);c.a},a4b7:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"grace-margin"},[a("view",{staticClass:"grace-search grace-fixed-top top grace-gtbg-blue"},[a("view",{staticClass:"grace-search-in"},[a("view",{staticClass:"icons iconfont"},[e._v("")]),a("input",{attrs:{type:"search",value:e.searchKey,placeholder:"请输入搜索关键字",eventid:"3d7c9e56-0"},on:{input:e.searchChange,confirm:e.searchNow}}),e.searchClose?a("view",{staticClass:"icons iconfont f30",attrs:{eventid:"3d7c9e56-1"},on:{tap:e.clearKey}},[e._v("")]):e._e()])]),a("view",{staticClass:"grace-title",staticStyle:{"margin-top":"80px"}},[a("view",[e._v("搜索历史")]),a("text",{staticClass:"grace-more",attrs:{eventid:"3d7c9e56-2"},on:{click:e.clearKeyHistory}},[e._v("清空")])]),0==e.searchKeyHistory.length?a("view",{staticClass:"search-kong"},[e._v("暂无搜索记录")]):e._e(),a("view",{staticClass:"grace-search-taps"},e._l(e.searchKeyHistory,function(t,s){return a("view",{key:s,attrs:{"data-key":t,eventid:"3d7c9e56-3-"+s},on:{tap:e.setKey}},[e._v(e._s(t))])}))])},c=[];a.d(t,"a",function(){return s}),a.d(t,"b",function(){return c})},ab51:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{searchKey:"",searchClose:!1,searchKeyHistory:[]}},created:function(){this.updateSearch()},methods:{updateSearch:function(){var t=[];try{t=e.getStorageSync("keywords")}catch(a){}this.searchKeyHistory=t},searchChange:function(e){var t=e.detail.value;this.searchKey=t,t.length>=1?this.searchClose=!0:this.searchClose=!1},clearKey:function(){this.searchClose=!1,this.searchKey=""},searchNow:function(){var t=[];try{t=e.getStorageSync("keywords")||[]}catch(a){}t.push(this.searchKey),e.setStorageSync("keywords",t),this.updateSearch(),e.navigateTo({url:"../index/list?keyword="+this.searchKey})},setKey:function(t){var a=t.currentTarget.dataset.key;this.searchKey=a,e.navigateTo({url:"../index/list?keyword="+this.searchKey})},clearKeyHistory:function(){this.updateSearch(),e.setStorageSync("keywords",[]),this.updateSearch(),this.$toast("清除成功")}}};t.default=a}).call(this,a("6e42")["default"])},c31a:function(e,t,a){"use strict";a.r(t);var s=a("ab51"),c=a.n(s);for(var r in s)"default"!==r&&function(e){a.d(t,e,function(){return s[e]})}(r);t["default"]=c.a}},[["37fa","common/runtime","common/vendor"]]]);