/**
 * 此方法只适用于截取当前页面
 * 然后调用分享
 * 
 * var s = new SharePage()
 * s.run()
 */

 class SharePage{
	 constructor (){
		 
	 }
	 //开始
	run (){
		// #ifdef H5
		uni.showToast({
			icon: 'none',
			title: '当前环境不支持分享'
		})
		return false
		// #endif
		var currentWebview = this.getCurrentWebview()
		this.screenshot(currentWebview)
	}
	//获取当前webview
	getCurrentWebview (){
		var pages = getCurrentPages();  
		var page = pages[pages.length - 1];  
		var currentWebview = page.$getAppWebview()
		return currentWebview;
	}
	//截图
	screenshot (ws){
		//新图片名称
		var bitmap = new plus.nativeObj.Bitmap('shareImgBitmap');
		ws.draw(bitmap, ()=>{
			this.saveImg(bitmap)
		}, (e)=>{
			uni.showToast({
				icon: 'none',
				title: '截图失败!'
			})
		},{
			check:true,clip:{top:'0px',left:'0px',height:'100%',width:'100%'}
		});
	}
	//保存分享图
	saveImg (bitmap){
		var imageNmae = '_doc/' + (new Date()).getTime()+'.jpg';
		imageNmae = plus.io.convertLocalFileSystemURL(imageNmae);
		bitmap.save(imageNmae, {}, (i)=>{
		   this.shareImg(i.target)
		},function(e){
			console.log('保存图片失败：'+JSON.stringify(e));
		});
	}
	//系统分享
	shareImg (imgPath){
		var msg = {type: 'image'}
		msg.pictures = [imgPath]
		plus.share.sendWithSystem(msg, function() {
		  console.log('Success');
		}, function(e) {
		  console.log('Failed: ' + JSON.stringify(e));
		});
	}
}
export default SharePage