(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/asset/transfer"],{"32f4":function(t,s,e){"use strict";e.r(s);var n=e("fa50"),a=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(s,t,function(){return n[t]})}(i);s["default"]=a.a},"41d8":function(t,s,e){},"6cc1":function(t,s,e){"use strict";var n=e("41d8"),a=e.n(n);a.a},"797e":function(t,s,e){"use strict";var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("view",{staticClass:"box"},[e("view",{staticClass:"form_swap"},[e("view",{staticClass:"title"},[t._v("转出账户")]),e("view",{staticClass:"list"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.uid,expression:"uid"}],staticClass:"input",attrs:{placeholder:"请输入转出账户UID",eventid:"24133cbb-0"},domProps:{value:t.uid},on:{input:function(s){s.target.composing||(t.uid=s.target.value)}}})]),e("view",{staticClass:"title"},[t._v("转出积分")]),e("view",{staticClass:"list"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.num,expression:"num"}],staticClass:"input",attrs:{placeholder:"最小转出积分10",eventid:"24133cbb-1"},domProps:{value:t.num},on:{input:function(s){s.target.composing||(t.num=s.target.value)}}}),e("view",{staticClass:"all"},[t._v("积分")])]),e("view",{staticClass:"tips"},[e("view",{},[t._v("可用"+t._s(t.userInfo.cp)+"积分")])]),e("view",{staticClass:"title"},[t._v("资金密码")]),e("view",{staticClass:"list"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.t_password,expression:"t_password"}],staticClass:"input",attrs:{type:"password",placeholder:"请输入资金密码",eventid:"24133cbb-2"},domProps:{value:t.t_password},on:{input:function(s){s.target.composing||(t.t_password=s.target.value)}}})]),e("view",{staticClass:"mt-200"},[e("view",{staticClass:"fee text-right mb-10"},[t._v(t._s(t.config.concvert_fee)+"%手续费")]),e("button",{staticClass:"btn-block",attrs:{"hover-class":"btn-hover",type:"primary",eventid:"24133cbb-3"},on:{click:t.submit}},[t._v("立即转账")])],1)])])},a=[];e.d(s,"a",function(){return n}),e.d(s,"b",function(){return a})},b0aa:function(t,s,e){"use strict";e("263f");var n=i(e("b0ce")),a=i(e("f197"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(a.default))},f197:function(t,s,e){"use strict";e.r(s);var n=e("797e"),a=e("32f4");for(var i in a)"default"!==i&&function(t){e.d(s,t,function(){return a[t]})}(i);e("6cc1");var o=e("2877"),u=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"cf6f05f2",null);s["default"]=u.exports},fa50:function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e={data:function(){return{yzm:{num:60,txt:"发送验证",showTxt:"发送验证"},uid:"",num:"",t_password:"",config:{},userInfo:{}}},created:function(){this.getConfig(),this.getUserInfo()},methods:{getUserInfo:function(){var s=this;this.userInfo=t.getStorageSync("user_getuserinfo")||{},this.$post("api/user/getuserinfo").then(function(e){1==e.code?(s.userInfo=e.data,t.setStorageSync("user_getuserinfo",e.data)):s.$toast(e.msg)})},getConfig:function(){var s=this;this.config=t.getStorageSync("config")||{},this.$post("api/config").then(function(e){1==e.code&&(s.config=e.data,t.setStorageSync("config",e.data))})},submit:function(){var s=this;this.uid?this.num?this.t_password?(this.$post("api/user/transfer",{to_uid:this.uid,num:this.num,t_password:this.t_password}).then(function(e){1==e.code?setTimeout(t.navigateBack,800,{delta:1}):"请先完成实名认证"==e.msg&&t.navigateTo({url:"../user/real"}),s.$toast(e.msg)}),this.t_password=""):this.$toast("请交易密码"):this.$toast("请输入转出数量"):this.$toast("请输入转出账户ID")},saoma:function(){t.scanCode({scanType:["qrCode"],success:function(t){_this.toast("内容："+t.result)}})},djs:function(){var t=this;function s(){setTimeout(function(){t.yzm.num>=1?(t.yzm.num--,t.yzm.showTxt=t.yzm.num+"S",s()):(t.yzm.num=60,t.yzm.showTxt=t.yzm.txt)},1e3)}t.yzm.showTxt==t.yzm.txt&&(s(),t.yzm.num--,t.yzm.showTxt=t.yzm.num+"S")}}};s.default=e}).call(this,e("6e42")["default"])}},[["b0aa","common/runtime","common/vendor"]]]);