(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/detail"],{"66b0":function(t,e,s){"use strict";var a=s("cf2c"),i=s.n(a);i.a},"949e":function(t,e,s){"use strict";s("263f");var a=o(s("b0ce")),i=o(s("b1f6"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},9734:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(s("a951")),i=r(s("6a9c")),o=r(s("4cba"));function r(t){return t&&t.__esModule?t:{default:t}}var n={data:function(){return{clsList:[],expressNum:"",expressGs:"",currentItem:"",expressId:"",id:"",data:{},type:0}},components:{OrderItem:a.default,mpvuePicker:o.default,PopupLayer:i.default},onLoad:function(t){this.id=t.id,this.getDetail(),this.getExpress(),t.type&&1==t.type&&(this.type=1)},methods:{goPay:function(e){t.navigateTo({url:"../order/pay?id="+e.id+"&price="+e.total})},confirm:function(e){var s=this;t.showModal({title:"确认收货",content:"你确认收到货物了吗？",success:function(t){t.confirm&&s.confirmorder(e)}})},confirmorder:function(t){var e=this;this.$post("api/shop/order/confirmorder",{id:t}).then(function(t){1==t.code&&e.getDetail(),e.$toast(t.msg)})},cancel:function(){var e=this;t.showModal({title:"确认取消",content:"你确认要取消订单吗？",success:function(t){t.confirm&&e.cancelorder()}})},cancelorder:function(){var t=this;this.$post("api/shop/order/cancelorder",{id:this.id}).then(function(e){1==e.code&&t.getDetail(),t.$toast(e.msg)})},getDetail:function(){var t=this;this.$post("api/shop/order/detail",{id:this.id}).then(function(e){1==e.code?t.data=e.data:t.$toast(e.msg)})},select:function(){this.$refs.mpvuePicker.show()},getExpress:function(){var t=this;this.$post("api/shop/business/logistics_company").then(function(e){if(1==e.code){var s=[];for(var a in e.data)s.push({label:e.data[a],value:a});t.clsList=s}else t.$toast(e.msg)})},onConfirm:function(t){this.expressGs=t.label,this.expressId=t.value},fahuo:function(t){this.$refs.popupCommont.show(),this.currentItem=t},confirmFahuo:function(){var t=this;this.expressGs?this.expressNum?(this.$refs.popupCommont.close(),this.$post("api/shop/business/ship",{id:this.currentItem.id,logistics_company:this.expressId,tracking_number:this.expressNum}).then(function(e){1==e.code&&t.getDetail(),t.$toast(e.msg)})):this.$toast("请输入物流单号"):this.$toast("请输入物流公司")}}};e.default=n}).call(this,s("6e42")["default"])},b1f6:function(t,e,s){"use strict";s.r(e);var a=s("db0b"),i=s("f0cd");for(var o in i)"default"!==o&&function(t){s.d(e,t,function(){return i[t]})}(o);s("66b0");var r=s("2877"),n=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,"1ae88b88",null);e["default"]=n.exports},cf2c:function(t,e,s){},db0b:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"order-detail"},[s("view",{staticClass:"top"},[s("view",{staticClass:"top-order"},[s("text",{staticClass:"order-number"},[t._v("订单号:"+t._s(t.data.number))]),s("text",[t._v("日期:"+t._s(t.data.createtime))])]),s("view",{staticClass:"daetail-top-status"},[t._v(t._s(t.data.status_str))])]),s("view",{staticClass:"goods-item"},[s("order-item",{attrs:{goPage:"../index/detail?id="+t.data.product_id,data:t.data,mpcomid:"3661ef03-0"}})],1),s("view",{staticClass:"total-info"},[s("view",{staticClass:"total-price"},[s("text",{staticClass:"fee-label"},[t._v("运费")]),s("text",{staticClass:"fee-value"},[t._v("￥"+t._s(t.data.freight))])]),s("view",{staticClass:"total-price"},[s("text",{staticClass:"fee-label"},[t._v("实付款")]),s("text",{staticClass:"fee-value"},[t._v("￥"+t._s(t.data.total))])])]),s("view",{staticClass:"express-wrap"},[s("text",{staticClass:"iconfont"},[t._v("")]),s("view",{staticClass:"express-info"},[s("text",{staticClass:"express-name"},[t._v("收货人："+t._s(t.data.receiver)+" "+t._s(t.data.mobile))]),s("text",{staticClass:"express-address"},[t._v(t._s(t.data.receiving_area)+t._s(t.data.address))])])]),t.data.logistics_company?s("view",{staticClass:"total-info"},[s("view",{staticClass:"total-price"},[s("text",{staticClass:"fee-label"},[t._v("物流信息")]),s("navigator",{attrs:{url:"../order/express?id="+t.id}},[s("text",{staticClass:"express-detail"},[t._v("查看物流")])])],1),s("view",{staticClass:"total-price text-gray"},[t._v(t._s(t.data.logistics_company)+": "+t._s(t.data.tracking_number))])]):t._e(),s("view",{staticClass:"plr30 mt-100"},[0==t.type?[1==t.data.status?s("button",{staticClass:"btn-block radius",attrs:{"hover-class":"btn-hover",eventid:"3661ef03-0"},on:{click:function(e){t.goPay(t.data)}}},[t._v("去付款")]):t._e(),1==t.data.status?s("button",{staticClass:"btn-block radius disabled mt-50",attrs:{"hover-class":"btn-hover",eventid:"3661ef03-1"},on:{click:function(e){t.cancel(t.data)}}},[t._v("取消订单")]):t._e(),3==t.data.status?s("button",{staticClass:"btn-block radius",attrs:{"hover-class":"btn-hover",eventid:"3661ef03-2"},on:{click:function(e){t.confirm(t.id)}}},[t._v("确认收货")]):t._e(),4==t.data.status&&0==t.data.evaluation?s("navigator",{attrs:{url:"../order/evaluate?id="+t.data.id}},[s("button",{staticClass:"btn-block radius",attrs:{"hover-class":"btn-hover"}},[t._v("去评价")])],1):t._e()]:[2==t.data.status?s("button",{staticClass:"btn-block radius",attrs:{"hover-class":"btn-hover",eventid:"3661ef03-3"},on:{click:function(e){t.fahuo(t.data)}}},[t._v("确认发货")]):t._e()]],2),s("popup-layer",{ref:"popupCommont",attrs:{direction:"top",mpcomid:"3661ef03-3"}},[s("view",{staticClass:"apply-item"},[s("view",{staticClass:"apply-subtitle"},[t._v("物流公司")]),s("view",{staticClass:"apply-input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.expressGs,expression:"expressGs"}],staticClass:"apply-input-item",attrs:{type:"text",disabled:"",placeholder:"请输入物流公司",eventid:"3661ef03-4"},domProps:{value:t.expressGs},on:{click:t.select,input:function(e){e.target.composing||(t.expressGs=e.target.value)}}})])]),s("view",{staticClass:"apply-item"},[s("view",{staticClass:"apply-subtitle"},[t._v("物流单号")]),s("view",{staticClass:"apply-input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.expressNum,expression:"expressNum"}],staticClass:"apply-input-item",attrs:{type:"text",placeholder:"请输入物流单号",eventid:"3661ef03-5"},domProps:{value:t.expressNum},on:{input:function(e){e.target.composing||(t.expressNum=e.target.value)}}})])]),s("view",{staticClass:"plr30 ordere-btn"},[s("button",{staticClass:"btn-block",attrs:{"hover-class":"btn-hover",eventid:"3661ef03-6"},on:{click:t.confirmFahuo}},[t._v("确认发货")])],1)]),t.clsList&&t.clsList.length>0?[s("mpvue-picker",{ref:"mpvuePicker",attrs:{mode:"selector",deepLength:1,pickerValueArray:t.clsList,eventid:"3661ef03-7",mpcomid:"3661ef03-4"},on:{onConfirm:t.onConfirm}})]:t._e()],2)},i=[];s.d(e,"a",function(){return a}),s.d(e,"b",function(){return i})},f0cd:function(t,e,s){"use strict";s.r(e);var a=s("9734"),i=s.n(a);for(var o in a)"default"!==o&&function(t){s.d(e,t,function(){return a[t]})}(o);e["default"]=i.a}},[["949e","common/runtime","common/vendor"]]]);