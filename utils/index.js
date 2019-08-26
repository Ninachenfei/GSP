import Vue from 'vue'
function saveImg(url) {
  uni.downloadFile({
    url: url,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            toast('保存成功!')
          },
          fail: () => {
            toast('保存失败!')
          }
        })
      }
    }
  });
}
Vue.prototype.$saveImg = saveImg

function uploadImage(getImg, fn, data = {}) {
  data['token'] = uni.getStorageSync('token');
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ['compressed'],
    sourceType: ['album'], //从相册选择
    success: function (res) {
      getImg(res.tempFilePaths[0])
			if(fn){
				uni.showToast({
					title: '正在上传...',
					icon: 'loading',
					mask: true,
					duration: 2000
				});
				uni.uploadFile({
				  url: 'https://app.myhome131419.com/',
				  filePath: res.tempFilePaths[0],
				  name: 'file',
				  formData: data,
				  success: (uploadFileRes) => {
				    fn(uploadFileRes)
				  },
					complete: () => {
						uni.hideToast();
					}
				});
			}
    }
  });
}
Vue.prototype.$uploadImage = uploadImage;

function upload (url, filepath, key, data, fn){
	uni.showToast({
		title: '正在上传...',
		icon: 'loading',
		mask: true,
		duration: 2000
	});
	data.token = data.token || uni.getStorageSync('token');
	uni.uploadFile({
	  url: 'https://app.myhome131419.com/'+url,
	  filePath: filepath,
	  name: key,
	  formData: data,
	  success: (uploadFileRes) => {
	    fn && fn(uploadFileRes)
	  },
		complete: () => {
			uni.hideToast();
		}
	});
}
Vue.prototype.$upload = upload;