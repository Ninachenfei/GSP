<template>
	<view class="box">		
		<view class="ct_link">
		 	<navigator url="address" class="list">
		 		<view class="link">收货地址</view>
		 		<view class="link_fr"><text class="iconfont next">&#xe603;</text></view>
		 	</navigator>
			<navigator url="about" class="list" >
				<view class="link">关于我们</view>
				<text class="iconfont next">&#xe603;</text>
			</navigator>
		</view>
		<view class="posi_bot">
			<button class="btn-block" hover-class="btn-hover" @click="outLogin" type="primary">安全退出</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},

		mounted(){
	
		},
		onShow() {
			
		},
		computed:{
	
		},
		methods: {
			outLogin (){
				this.$post('api/user/logout').then(res=>{
					uni.setStorageSync('token', '')
					setTimeout(function(){
						uni.navigateTo({
							url:'../login/index'
						})
					}, 800)
					this.$toast(res.msg)
				})
			},
			//假装清除缓存
		   clickup(){
				uni.showLoading({
					title: '清除中...'
				});
				setTimeout(()=>{
					uni.hideLoading();
					uni.showToast({
						title: '清除成功',
						duration: 1000,
						icon:'none',
					});
				},2500);
			},
			
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	.ct_link{
		border-top:10upx solid #f7f7f7;padding:0 30upx;
		.list{
			display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #f2f2f2;height:100upx;
		}
		.link{font-size:28upx;color:var(--txt-color);flex: 1;}
		.next{color:var(--txt-gray-color);}
		.tips{font-size:28upx;color:var(--txt-gray-color);}
	}
	.posi_bot{
		position: absolute;bottom: 100upx;width:100%;
		.btn-block{
			margin: 0 30upx;
		}
	}
</style>