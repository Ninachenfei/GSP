(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/message_detail"],{"10df":function(t,e,n){"use strict";n.r(e);var a=n("1e86"),i=n("72b4");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("4db3");var c=n("2877"),u=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,"456eccab",null);e["default"]=u.exports},"1e86":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"msg-content"},[n("text",{staticClass:"msg-content-title"},[t._v(t._s(t.title))]),n("u-parse",{attrs:{content:t.nodes,eventid:"9bf60b92-0",mpcomid:"9bf60b92-0"},on:{preview:t.preview,navigate:t.navigate}}),n("text",{staticClass:"msg-dateil-time"},[t._v(t._s(t.time))])],1)},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},"4db3":function(t,e,n){"use strict";var a=n("c58e"),i=n.n(a);i.a},"72b4":function(t,e,n){"use strict";n.r(e);var a=n("c277"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},c174:function(t,e,n){"use strict";n("263f");var a=o(n("b0ce")),i=o(n("10df"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},c277:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("e411"));function i(t){return t&&t.__esModule?t:{default:t}}var o={components:{uParse:a.default},data:function(){return{title:"",time:"",nodes:""}},onLoad:function(t){this.getDetail(t.id)},created:function(){},methods:{replaceContent:function(t){this.nodes=t.replace(/\<o\:p\>/gim,"").replace(/\<\/o\:p\>/gim,"").replace(/\<font/gim,"<span").replace(/\<\/font\>/gim,"</span>")},getDetail:function(t){var e=this;this.$post("api/announcement/detail",{id:t}).then(function(t){e.replaceContent(t.data.content),e.title=t.data.title,e.time=t.data.publishtime})},preview:function(t,e){console.log("src: "+t)},navigate:function(t,e){plus.runtime.openWeb(t)}}};e.default=o},c58e:function(t,e,n){}},[["c174","common/runtime","common/vendor"]]]);