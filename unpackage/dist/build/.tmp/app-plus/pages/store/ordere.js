(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/store/ordere"],{"33b0":function(t,e,s){"use strict";s("263f");var a=o(s("b0ce")),i=o(s("82bb"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},"82bb":function(t,e,s){"use strict";s.r(e);var a=s("91ce"),i=s("ae82");for(var o in i)"default"!==o&&function(t){s.d(e,t,function(){return i[t]})}(o);s("e846");var n=s("2877"),r=Object(n["a"])(i["default"],a["a"],a["b"],!1,null,"459a9653",null);e["default"]=r.exports},"91ce":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"order-content"},[s("view",{staticClass:"order-tabs"},[s("view",{staticClass:"order-tab",class:{active:0==t.tabIndex},attrs:{eventid:"52996c96-0"},on:{click:function(e){t.toggleTab(0)}}},[t._v("全部")]),s("view",{staticClass:"order-tab",class:{active:1==t.tabIndex},attrs:{eventid:"52996c96-1"},on:{click:function(e){t.toggleTab(1)}}},[t._v("待付款")]),s("view",{staticClass:"order-tab",class:{active:2==t.tabIndex},attrs:{eventid:"52996c96-2"},on:{click:function(e){t.toggleTab(2)}}},[t._v("待发货")]),s("view",{staticClass:"order-tab",class:{active:3==t.tabIndex},attrs:{eventid:"52996c96-3"},on:{click:function(e){t.toggleTab(3)}}},[t._v("待收货")]),s("view",{staticClass:"order-tab",class:{active:4==t.tabIndex},attrs:{eventid:"52996c96-4"},on:{click:function(e){t.toggleTab(4)}}},[t._v("已完成")])]),s("view",{staticClass:"order-list"},t._l(t.list,function(e,a){return s("view",{key:a,staticClass:"order-list-item"},[s("order-item",{attrs:{goPage:"../order/detail?id="+e.id+"&type=1",data:e,mpcomid:"52996c96-0-"+a}}),s("view",{staticClass:"order-add"},[s("text",[t._v("共"+t._s(e.num)+"件商品 合计:")]),s("text",{staticClass:"price-color"},[t._v("￥"+t._s(e.total)+"0")])]),s("view",{staticClass:"order-btns"},[2==e.status?s("view",{staticClass:"order-btn",attrs:{eventid:"52996c96-5-"+a},on:{click:function(s){t.fahuo(e)}}},[t._v("确认发货")]):t._e()])],1)})),s("popup-layer",{ref:"popupCommont",attrs:{direction:"top",mpcomid:"52996c96-1"}},[s("view",{staticClass:"apply-item"},[s("view",{staticClass:"apply-subtitle"},[t._v("物流公司")]),s("view",{staticClass:"apply-input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.expressGs,expression:"expressGs"}],staticClass:"apply-input-item",attrs:{type:"text",disabled:"",placeholder:"请输入物流公司",eventid:"52996c96-6"},domProps:{value:t.expressGs},on:{click:t.select,input:function(e){e.target.composing||(t.expressGs=e.target.value)}}})])]),s("view",{staticClass:"apply-item"},[s("view",{staticClass:"apply-subtitle"},[t._v("物流单号")]),s("view",{staticClass:"apply-input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.expressNum,expression:"expressNum"}],staticClass:"apply-input-item",attrs:{type:"text",placeholder:"请输入物流单号",eventid:"52996c96-7"},domProps:{value:t.expressNum},on:{input:function(e){e.target.composing||(t.expressNum=e.target.value)}}})])]),s("view",{staticClass:"plr30 ordere-btn"},[s("button",{staticClass:"btn-block",attrs:{"hover-class":"btn-hover",eventid:"52996c96-8"},on:{click:t.confirmFahuo}},[t._v("确认发货")])],1)]),s("uni-load-more",{attrs:{status:t.loadStatus,mpcomid:"52996c96-2"}}),t.clsList&&t.clsList.length>0?[s("mpvue-picker",{ref:"mpvuePicker",attrs:{mode:"selector",deepLength:1,pickerValueArray:t.clsList,eventid:"52996c96-9",mpcomid:"52996c96-3"},on:{onConfirm:t.onConfirm}})]:t._e()],2)},i=[];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i})},ae82:function(t,e,s){"use strict";s.r(e);var a=s("d5a9"),i=s.n(a);for(var o in a)"default"!==o&&function(t){s.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},d5a9:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(s("a951")),i=r(s("25fc")),o=r(s("6a9c")),n=r(s("4cba"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t){return d(t)||u(t)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function d(t){if(Array.isArray(t)){for(var e=0,s=new Array(t.length);e<t.length;e++)s[e]=t[e];return s}}var p={data:function(){return{clsList:[],tabIndex:1,list:[],page:1,loadStatus:"more",expressNum:"",expressGs:"",currentItem:"",expressId:""}},components:{uniLoadMore:i.default,OrderItem:a.default,PopupLayer:o.default,mpvuePicker:n.default},onLoad:function(t){this.tabIndex=t.type||0,this.getList(),this.getExpress()},methods:{select:function(){this.$refs.mpvuePicker.show()},getExpress:function(){var t=this;this.$post("api/shop/business/logistics_company").then(function(e){if(1==e.code){var s=[];for(var a in e.data)s.push({label:e.data[a],value:a});t.clsList=s}else t.$toast(e.msg)})},onConfirm:function(t){this.expressGs=t.label,this.expressId=t.value},fahuo:function(t){this.$refs.popupCommont.show(),this.currentItem=t},confirmFahuo:function(){var t=this;this.expressGs?this.expressNum?(this.$refs.popupCommont.close(),this.$post("api/shop/business/ship",{id:this.currentItem.id,logistics_company:this.expressId,tracking_number:this.expressNum}).then(function(e){1==e.code&&t.toggleTab(t.tabIndex),t.$toast(e.msg)})):this.$toast("请输入物流单号"):this.$toast("请输入物流公司")},toggleTab:function(t){this.tabIndex=t,this.page=1,this.list=[],this.loadStatus="more",this.getList()},getList:function(){var e=this;this.loadStatus="loading";var s=this.tabIndex;1==this.page&&(this.list=t.getStorageSync("shop_business_orders_"+s)||[]);var a={page:this.page,status:s};this.$post("api/shop/business/orders",a).then(function(a){var i;1==a.code?(a.data.has_more?e.loadStatus="more":e.loadStatus="noMore",1==e.page?(e.list=a.data.data,t.setStorageSync("shop_business_orders_"+s,a.data.data)):(i=e.list).push.apply(i,c(a.data.data))):(e.loadStatus="noMore",e.$toast(a.msg))})}},onReachBottom:function(){"more"==this.loadStatus&&(this.page++,this.getList())}};e.default=p}).call(this,s("6e42")["default"])},d631:function(t,e,s){},e846:function(t,e,s){"use strict";var a=s("d631"),i=s.n(a);i.a}},[["33b0","common/runtime","common/vendor"]]]);