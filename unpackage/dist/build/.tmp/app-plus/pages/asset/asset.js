(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/asset/asset"],{"1a29":function(t,s,e){"use strict";e("263f");var a=n(e("b0ce")),i=n(e("c2ad"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"866b":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"assets-page"},[e("view",{staticClass:"assets-top"},[e("view",{staticClass:"assets-top-t"},[e("text",{staticClass:"assets-top-label"},[t._v("总资产折合(USD)")]),t.showAsset?e("text",{staticClass:"iconfont",attrs:{eventid:"df45cfc0-1"},on:{click:t.setShowAsset}},[t._v("")]):e("text",{staticClass:"iconfont",attrs:{eventid:"df45cfc0-0"},on:{click:t.setShowAsset}},[t._v("")])]),e("view",{staticClass:"assets-num"},[t._v(t._s(t.showAsset?t.userInfo.total_eq:"****"))])]),e("view",{staticClass:"assets-list"},[e("navigator",{staticClass:"assets-item",attrs:{url:"asset_detail?coin=GSP&cp="+t.userInfo.mh+"&freeze="+t.userInfo.freeze_mh}},[e("view",{staticClass:"assets-item-title"},[t._v("GSP")]),e("view",{staticClass:"assets-data"},[e("view",{staticClass:"assets-data-item"},[e("text",{staticClass:"assets-data-item-label"},[t._v("可用")]),e("text",{staticClass:"assets-data-item-val"},[t._v(t._s(t.showAsset?t.userInfo.mh:"****"))])]),e("view",{staticClass:"assets-data-item"},[e("text",{staticClass:"assets-data-item-label"},[t._v("单价(USD)")]),e("text",{staticClass:"assets-data-item-val"},[t._v(t._s(t.showAsset?t.config.mh_price:"****"))])]),e("view",{staticClass:"assets-data-item"},[e("text",{staticClass:"assets-data-item-label"},[t._v("折合(USD)")]),e("text",{staticClass:"assets-data-item-val"},[t._v(t._s(t.showAsset?t.userInfo.mh_eq:"****"))])])])]),e("navigator",{staticClass:"assets-item",attrs:{url:"asset_detail?coin=E-Token&cp="+t.userInfo.etoken+"&freeze="+t.userInfo.freeze_etoken}},[e("view",{staticClass:"assets-item-title"},[t._v("E-Token")]),e("view",{staticClass:"assets-data"},[e("view",{staticClass:"assets-data-item"},[e("text",{staticClass:"assets-data-item-label"},[t._v("可用")]),e("text",{staticClass:"assets-data-item-val"},[t._v(t._s(t.showAsset?t.userInfo.etoken:"****"))])]),e("view",{staticClass:"assets-data-item"},[e("text",{staticClass:"assets-data-item-label"},[t._v("单价(USD)")]),e("text",{staticClass:"assets-data-item-val"},[t._v(t._s(t.showAsset?t.config.etoken_price:"****"))])]),e("view",{staticClass:"assets-data-item"},[e("text",{staticClass:"assets-data-item-label"},[t._v("折合(USD)")]),e("text",{staticClass:"assets-data-item-val"},[t._v(t._s(t.showAsset?t.userInfo.etoken_eq:"****"))])])])])],1)])},i=[];e.d(s,"a",function(){return a}),e.d(s,"b",function(){return i})},bb79:function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e={data:function(){return{userInfo:{},showAsset:!0,config:{}}},created:function(){this.showAsset=!1!==t.getStorageSync("showAsset"),this.getUserInfo(),this.getConfig()},methods:{getConfig:function(){var s=this;this.config=t.getStorageSync("config")||{},this.$post("api/config").then(function(e){1==e.code&&(s.config=e.data,t.setStorageSync("config",e.data))})},setShowAsset:function(){t.setStorageSync("showAsset",!this.showAsset),this.showAsset=!this.showAsset},getUserInfo:function(){var s=this;this.userInfo=t.getStorageSync("user_getuserinfo")||{},this.$post("api/user/getuserinfo").then(function(e){1==e.code?(s.userInfo=e.data,t.setStorageSync("user_getuserinfo",e.data)):s.$toast(e.msg)})}}};s.default=e}).call(this,e("6e42")["default"])},c2ad:function(t,s,e){"use strict";e.r(s);var a=e("866b"),i=e("d3c6");for(var n in i)"default"!==n&&function(t){e.d(s,t,function(){return i[t]})}(n);var o=e("2877"),c=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);s["default"]=c.exports},d3c6:function(t,s,e){"use strict";e.r(s);var a=e("bb79"),i=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(s,t,function(){return a[t]})}(n);s["default"]=i.a}},[["1a29","common/runtime","common/vendor"]]]);