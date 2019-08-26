/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

/*
// 开放的接口
import http from './interface'

http.config.baseUrl = "http://localhost:8080/api/"

http.request(url:'user/list',method:'GET').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list').then((res)=>{
	console.log(JSON.stringify(res))
})
http.get('user/list', {status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.post('user', {id:1, status: 1}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.put('user/1', {status: 2}).then((res)=>{
	console.log(JSON.stringify(res))
})
http.delete('user/1').then((res)=>{
	console.log(JSON.stringify(res))
}) 

*/
var http = {
	config: {
		baseUrl: '',
		header: {
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},  
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	//路由 不拦截登录的页面
	filterPages: ['/pages/index/index', '/pages/asset/index', '/pages/index/classify'],
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || http.config.baseUrl
		options.dataType = options.dataType || http.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || http.config.method
		//TODO 加密数据
		
		//TODO 数据签名
		/* 
		_token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
		_sign = {'sign': sign(JSON.stringify(options.data))}
		options.header = Object.assign({}, options.header, _token,_sign) 
		*/
	   
		return new Promise((resolve, reject) => {
			let _config = null
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (http.interceptor.response) {
					let newResponse = http.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				if (statusCode === 200) { //成功
					if(response.data.code == -1){
						const pages = getCurrentPages()
						//#ifdef H5
							const currentRouter = pages[0].$page.path
						//#endif
						//#ifdef APP-PLUS
							const currentRouter = pages[0].route
						//#endif
						if(http.filterPages.indexOf(currentRouter) == -1){
							uni.redirectTo({
								url: '/pages/login/index',
							});
						}
					}
					resolve(response.data);
				} else {
					uni.showToast({
						title: '网络错误',
						mask: false,
						icon: 'none'
					});
				}
			}
			_config = Object.assign({}, http.config, options)
			_config.requestId = new Date().getTime()
	
			if (http.interceptor.request) {
				http.interceptor.request(_config)
			}
			uni.request(_config);
		});
	},
	get(url, data={}, options) {
		if (!options) {
			options = {}
		}
		if(!options.data){
			options.data = {}
		}
		options.url = url
		options.data = data
		if(data.token){
			options.data.token = data.token
		}else{
			var token = ''
			try{
				token = uni.getStorageSync('token')
			}catch(e){
				//TODO handle the exception
			}
			options.data.token = token
		}
		options.method = 'GET'  
		return http.request(options)
	},
	post(url, data={}, options) {
		if (!options) {
			options = {}
		}
		if(!options.data){
			options.data = {}
		}
		options.url = url
		options.data = data
		options.data.token = data.token || uni.getStorageSync('token')
		options.method = 'POST'
		return http.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return http.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return http.request(options)
	}
}

export default http
