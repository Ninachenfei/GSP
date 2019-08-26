(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/asset/business"],{"242c":function(t,s,e){"use strict";e("263f");var i=a(e("b0ce")),o=a(e("c968"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(o.default))},"78ff":function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"business-page h100"},[e("view",{staticClass:"business-wrap"},[e("view",{staticClass:"business-top"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.store_name,expression:"store_name"}],staticClass:"business-input",attrs:{type:"text",placeholder:"店铺名称",eventid:"d94176e0-0"},domProps:{value:t.store_name},on:{input:function(s){s.target.composing||(t.store_name=s.target.value)}}}),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.store_introduction,expression:"store_introduction"}],staticClass:"business-textarea",attrs:{placeholder:"主营行业",eventid:"d94176e0-1"},domProps:{value:t.store_introduction},on:{input:function(s){s.target.composing||(t.store_introduction=s.target.value)}}}),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.major_business,expression:"major_business"}],staticClass:"business-textarea",attrs:{placeholder:"店铺简介",eventid:"d94176e0-2"},domProps:{value:t.major_business},on:{input:function(s){s.target.composing||(t.major_business=s.target.value)}}})]),e("view",{staticClass:"business-item"},[e("text",{staticClass:"business-item-left"},[t._v("店铺标志")]),t.logo?e("image",{staticClass:"business-item-img",attrs:{src:t.logo,mode:"aspectFill",eventid:"d94176e0-4"},on:{click:function(s){t.chooseAlipayImg("logo")}}}):e("image",{staticClass:"business-item-img",attrs:{src:"/static/icon/icon_addpic.png",mode:"aspectFill",eventid:"d94176e0-3"},on:{click:function(s){t.chooseAlipayImg("logo")}}})]),e("view",{staticClass:"business-item"},[e("text",{staticClass:"business-item-left"},[t._v("营业执照")]),t.licens?e("image",{staticClass:"business-item-img",attrs:{src:t.licens,mode:"aspectFill",eventid:"d94176e0-6"},on:{click:function(s){t.chooseAlipayImg("licens")}}}):e("image",{staticClass:"business-item-img",attrs:{src:"/static/icon/icon_addpic.png",mode:"aspectFill",eventid:"d94176e0-5"},on:{click:function(s){t.chooseAlipayImg("licens")}}})]),e("view",{staticClass:"business-item"},[e("text",{staticClass:"business-item-left"},[t._v("交易密码")]),e("view",{staticClass:"business-item-right"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入交易密码",eventid:"d94176e0-7"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})])])]),e("view",{staticClass:"plr30"},[e("button",{staticClass:"btn-block",attrs:{"hover-class":"btn-hover",eventid:"d94176e0-8"},on:{click:t.submit}},[t._v("提交")])],1)])},o=[];e.d(s,"a",function(){return i}),e.d(s,"b",function(){return o})},"8c28":function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e={data:function(){return{store_name:"",store_introduction:"",major_business:"",logo:"",licens:"",password:"",config:{}}},created:function(){this.getConfig()},methods:{submit:function(){var s=this;this.store_name?this.store_introduction?this.major_business?this.logo?this.licens?this.password?(t.showLoading({title:"正在上传"}),setTimeout(t.hideLoading,15e3),t.uploadFile({url:this.$domain+"api/shop/business/apply",files:[{name:"logo",uri:this.logo},{name:"licens",uri:this.licens}],formData:{token:t.getStorageSync("token"),store_name:this.store_name,store_introduction:this.store_introduction,major_business:this.major_business,password:this.password},success:function(e){e=JSON.parse(e.data);1==e.code&&t.navigateBack({delta:1}),s.$toast(e.msg)},complete:function(){t.hideLoading()}}),this.password=""):this.$toast("请交易密码"):this.$toast("请上传店铺营业执照"):this.$toast("请上传店铺logo"):this.$toast("请输入店铺简介"):this.$toast("请输入店铺主营行业"):this.$toast("请输入店铺名称")},chooseAlipayImg:function(t){var s=this;this.$uploadImage(function(e){s[t]=e})},getConfig:function(){var s=this;this.config=t.getStorageSync("config")||{},this.$post("api/config").then(function(e){1==e.code?(s.config=e.data,t.setStorageSync("config",e.data)):s.$toast(e.msg)})}}};s.default=e}).call(this,e("6e42")["default"])},c968:function(t,s,e){"use strict";e.r(s);var i=e("78ff"),o=e("cb3d");for(var a in o)"default"!==a&&function(t){e.d(s,t,function(){return o[t]})}(a);var n=e("2877"),c=Object(n["a"])(o["default"],i["a"],i["b"],!1,null,null,null);s["default"]=c.exports},cb3d:function(t,s,e){"use strict";e.r(s);var i=e("8c28"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(s,t,function(){return i[t]})}(a);s["default"]=o.a}},[["242c","common/runtime","common/vendor"]]]);