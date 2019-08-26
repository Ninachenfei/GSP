var UpdateVersion = function (){
	//此处为自动获取plus版本号
		this.version = '1.0.3',
		this.updateApi = 'http://api.gspwallet.com/api/config'
}
UpdateVersion.prototype = {
	//版本号对比, curV 大于 reqV返回true
	compare: function(curV, reqV){
	   if(curV && reqV){
	      //将两个版本号拆成数字
	      var arr1 = curV.split('.'),
	          arr2 = reqV.split('.');
	      var minLength = Math.min(arr1.length, arr2.length),
	          position = 0,
	          diff = 0;
	      //依次比较版本号每一位大小，当对比得出结果后跳出循环
	      while(position < minLength && ((diff=parseInt(arr1[position]) - parseInt(arr2[position])) == 0)){
	          position++;
	      }
	      diff = (diff!=0) ? diff : (arr1.length-arr2.length);
	      //若curV大于reqV，则返回true
	      return diff > 0;
	   }else{
	      //输入为空
	      console.log('版本号不能为空');
	      return false;
	   }
	},
	//热更新检测
	getNewData: function(type){
		var _this = this
		if(plus && plus.runtime.appid != 'HBuilder'){
			uni.request({
				url: _this.updateApi,
				method: 'GET',
				success: (res)=>{
					var res = res.data.data
					if(_this.compare(res.version, _this.version)){
						//弹出更新提示
						 //version 最新版的版本号
						 //download_url 最新版的热更新地址
						 //forced_update 是否强制更新
						_this.alertUpdateTips(res.download_url, res.force_update)
					}else{
						if(type){
							plus.nativeUI.toast('当前已经是最新版本')
						}
					} 
				}
			})
		}else{
			console.log('当前环境不检测版本')
			if(type){
				uni.showToast({
					title: '当前已经是最新版本',
					icon: 'none'
				})
			}
		}
	},
	//弹出更新提示
	alertUpdateTips: function(url, forced_update){
		var _this = this
		if(forced_update == '1'){
			plus.nativeUI.alert('已检测到新版本，该版本有重大更新，请立即更新', function(){
				_this.downloadPack(url)
			}, '更新提示', '立即更新');
		}else{
			plus.nativeUI.confirm('已检测到新版本，是否立即更新', function(e){
				if(e.index == 0){
					//下载安装包
					_this.downloadPack(url)
				}
			}, '更新提示', ['确定', '取消'])
		}
	},
	//下载安装包
	downloadPack: function(url){
		var _this = this
		plus.nativeUI.toast('下载更新中，请勿关闭')
		var dtask=plus.downloader.createDownload(url, { method: 'GET', filename: '_doc/update/'},function(d,status){
         if(status==200){
            _this.installPack(d.filename);
         }else{//下载失败
         	plus.nativeUI.closeWaiting();
        	plus.nativeUI.toast('下载失败');
         }
     });
		dtask.start();
	},
	//安装
	installPack: function(path){
		var _this = this
		plus.nativeUI.showWaiting("安装更新文件中...");
		plus.runtime.install(path,{},function(){
			plus.nativeUI.closeWaiting();
			_this.tipReload()
		},function(e){
			plus.nativeUI.closeWaiting();
			plus.nativeUI.toast('安装失败')
		});
	},
	//提示重启
	tipReload: function(){
		if(plus.os.name == 'Android'){
			plus.nativeUI.confirm('最新版安装完成，是否立即重启APP?', function(e){
				if(e.index == 0){
					plus.runtime.restart();
		        }
			})
		}else{
			plus.nativeUI.alert('更新成功,重启APP后即可使用最新版！');	
		}
	}
}

export default UpdateVersion