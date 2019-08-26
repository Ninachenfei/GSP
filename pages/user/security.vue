<template>
	<view class="box">
		 <view class="ct_link">
		 	<navigator url="../user/modify_dl"  hover-class="none" class="list">
		 		<view class="link">登录密码</view>
		 		<text class="iconfont next">&#xe603;</text>
		 	</navigator>
			<navigator url="../user/modify_jy"  hover-class="none" class="list">
				<view class="link">交易密码</view>
				<text class="iconfont next">&#xe603;</text>
			</navigator>
			<!-- <view @click="goReal"  hover-class="none" class="list">
				<view class="link">实名认证</view>
				<view class="link_fr" v-if="userInfo.verified == 1">
					<text class="tips">已认证</text>
				</view>
				<view class="link_fr" v-else-if="userInfo.verified == 2">
					<text class="tips">审核中</text>
				</view>
				<view class="link_fr" v-else>
					<text class="tips">未认证</text><text class="iconfont next">&#xe603;</text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			    userInfo: {}
			};
		},
		mounted(){

		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			//跳转实名认证前的判断
			goReal (){
				//实名认证 0未认证 1已认证 2待审核 3未通过
				if(this.userInfo.verified == 1){
					uni.showModal({
						title: '实名认证',
						showCancel: false,
						content: '您已经实名认证'
					})
				}else if(this.userInfo.verified == 2){
					uni.showModal({
						title: '实名认证',
						showCancel: false,
						content: '您的实名认证正在审核'
					})
				}else{
					uni.navigateTo({
						url: 'real'
					})
				}
			},
			//获取用户信息
			getUserInfo (){
				this.userInfo = uni.getStorageSync('user_getuserinfo') || {}
				this.$post('api/user/getuserinfo').then(res=>{
					if(res.code == 1){
						this.userInfo = res.data
						uni.setStorageSync('user_getuserinfo', res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			}
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
		.tips{font-size:28upx;color:#4f6be4;}
	}
	
		
</style>

