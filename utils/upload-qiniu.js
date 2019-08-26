
let Upload = function(){
	
}
Upload.prototype = {
	randomString (len) {
	　　len = len || 6;
	　　var $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (let i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	},
	generateParams (filePath){
		let key = this.randomString()
		key += new Date().getTime().toString().substring(2, 9)
		key += '.'
		// #ifdef H5
		key += 'png'
		//#endif
		//#ifdef APP-PLUS
		key += filePath.split('.').pop()
		//#endif
		
		let token = uni.getStorageSync('uptoken') || 'f4yqDhdCBs-21oJATsvjF9dx-5-rN79-0kJfqEwA:4q8nYKLKWRTyOU-1BPBSw8nn9x8=:eyJzY29wZSI6InRlc3QiLCJkZWFkbGluZSI6MTU2MTc5OTIxNH0='
		return {key, token}
	},
	upload (filePath, callback){
		console.log(filePath)
		var uploadTask = uni.uploadFile({
		    url: 'http://up.qiniup.com',
		    filePath: filePath,
		    name: 'file',
		    formData: this.generateParams(filePath),
		    success: function (res) {
				callback({type: 'success', data: res})
			},
		    fail: function (error) {
				callback({type: 'error', data: error})
		    }
		})
		uploadTask.onProgressUpdate((res) => {
			callback({type: 'progress', data: res.progress})
		})
	}
}

export default Upload;