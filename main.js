import Vue from 'vue'
import App from './App'
import  './static/css/style.less'
// import  './static/css/uni.css'
import '@/utils/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

//全局toast
function toast(title){
	// #ifdef APP-PLUS
	plus.nativeUI.toast(title)
	// #endif
	// #ifdef H5
	uni.showToast({
		title: title,
		duration: 1000,
		icon:'none'
	})
	// #endif
}
Vue.prototype.$toast=toast;

let goWallet = function (){
	//#ifdef APP-PLUS
	var data = {}
	data = {pname:'com.gcswallet.plan', action:'gcswalletplan://'}
	if(plus.os.name === 'Android'){
		if(plus.runtime.isApplicationExist(data)){
			plus.runtime.launchApplication(data, (e)=>{
				this.$toast('打开失败， 请手动打开')
			});
		}else{
			this.$toast('您还未安装该应用')
		}
	}else{
		plus.runtime.launchApplication(data, (e)=>{
			this.$toast('打开失败')
		});
	}
	//#endif
	//#ifdef H5
	this.$toast('H5暂不支持该功能')
	//#endif
}
//定义全局使用域名
const domain = 'http://api.gspwallet.com/'
// const domain = 'http://api.gcswallet.com/'

Vue.prototype.$domain = domain;
Vue.prototype.$goWallet = goWallet;

//网络请求
import http from './utils/http'
http.config.baseUrl = `${domain}`
Vue.prototype.$get = http.get;
Vue.prototype.$post = http.post;

//热更新
import UpdateVersion from './utils/update.js'
//#ifdef APP-PLUS
var v = new UpdateVersion()
v.getNewData()
//#endif


