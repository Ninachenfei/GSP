(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/store/detail"],{"0531":function(t,e,a){"use strict";a.r(e);var n=a("6573"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,function(){return n[t]})}(c);e["default"]=i.a},"2ece":function(t,e,a){"use strict";var n=a("5079"),i=a.n(n);i.a},5079:function(t,e,a){},6573:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("ce52")),i=o(a("72fe")),c=(o(a("22d6")),o(a("6a9c"))),s=o(a("e411"));function o(t){return t&&t.__esModule?t:{default:t}}var r={data:function(){return{avatar:n.default,content:"",id:"",data:{}}},components:{CommentItem:i.default,PopupLayer:c.default,uParse:s.default},computed:{content2:function(){return this.content.replace("<img src=",'<img style="max-width:100%" src=')}},onLoad:function(t){this.id=t.id},created:function(){this.getDetail()},methods:{getDetail:function(){var t=this;this.$post("api/shop/business/publishdetail",{id:this.id}).then(function(e){1==e.code?(t.data=e.data,t.content=e.data.content):t.$toast(e.msg)})}}};e.default=r},c9dc:function(t,e,a){"use strict";a.r(e);var n=a("e030"),i=a("0531");for(var c in i)"default"!==c&&function(t){a.d(e,t,function(){return i[t]})}(c);a("2ece");var s=a("2877"),o=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,"0199ab5a",null);e["default"]=o.exports},e030:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{},[a("swiper",{staticClass:"banners",attrs:{autoplay:"",circular:"","indicator-dots":"","indicator-color":"rgba(255,139,56,0.4)","indicator-active-color":"rgba(255,139,56)",interval:3e3}},t._l(t.data.images,function(t,e){return a("swiper-item",{key:t,attrs:{mpcomid:"3f242210-0-"+e}},[a("image",{staticClass:"banner-img",attrs:{mode:"aspectFill",src:t}})])})),a("view",{staticClass:"info"},[a("view",{staticClass:"info-top"},[a("text",{staticClass:"info-price"},[t._v("￥"+t._s(t.data.price))])]),a("view",{staticClass:"info-title"},[t._v(t._s(t.data.title))])]),a("view",{staticClass:"content"},[a("view",{staticClass:"content-title"},[t._v("图文介绍")]),a("u-parse",{staticClass:"rich-text",attrs:{content:t.content,mpcomid:"3f242210-1"}})],1)],1)},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},f303:function(t,e,a){"use strict";a("263f");var n=c(a("b0ce")),i=c(a("c9dc"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))}},[["f303","common/runtime","common/vendor"]]]);