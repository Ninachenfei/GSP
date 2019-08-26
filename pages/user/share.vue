<template>
	<view class="share-page">	
		<image src="/static/img/share-bg.jpg" mode="aspectFill" class="share-bg"></image>
		<view class="share-navbar">
			<navigator open-type="navigateBack" class="iconfont share-navbar-back">&#xe892;</navigator>
			<view class="share-navbar-title">邀请好友</view>
			<text class="share-navbar-back"></text>
		</view>
		<view class="share-content">
			<image src="/static/img/share-bg2.png" mode="aspectFill" class="share-bg2"></image>
			 <view class="share">
				  <image class="img" v-if="img" :src='img' mode="scaleToFill"></image>
				  <view class="my_yqm">
					  <view class="yqm">{{userInfo.id}}</view>
					  <view class="copy" @click="copy(userInfo.id)">复制邀请码</view>
				  </view>
				  <view class="link">
					  <text class="tips">专属邀请链接</text>
					  <view class="link_lj">
						  <text class="yqm">{{img_url}}</text>
						  <view class="copy" @click="copy(img_url)"><image src="/static/img/icon-copy2.png" class="icon"></image></view>
					  </view>
				  </view>
				  <view class="bc_img" @click="share">分享二维码</view>
			 </view>
		</view>
	</view>
</template>

<script>
	import QR from "@/static/js/wxqrcode.js"
	import SharePage from "@/utils/share.js"
	export default {
		data() {
			return {
				img:'',
				img_url:'',
				uid:'1234',
				userInfo: {}
			};
		},
		created (){
			this.getUserInfo()
		},
		mounted(){
			
		},
		computed:{
	
		},
		methods: {
			init (){
				var link = this.$domain+'#/pages/login/register?id='+this.userInfo.id
				link = link.toString()
				this.img_url = link
				this.img = QR.createQrCodeImg(link, {
					size: parseInt(300)
				})
			},
			share (){
				var s = new SharePage()
				s.run()
			},
			getUserInfo (){
				this.userInfo = uni.getStorageSync('user_getuserinfo') || {}
				if(this.userInfo && this.userInfo.id){
					this.init()
				}else{
					this.$post('api/user/getuserinfo').then(res=>{
						if(res.code == 1){
							this.userInfo = res.data
							uni.setStorageSync('user_getuserinfo', res.data)
							this.init()
						}else{
							this.$toast(res.msg)
						}
					})
				}
			},
			copy (txt){
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: txt.toString(),
					success: function () {
						uni.showToast({
							icon: 'none',
							title: '复制成功！'
						})
					}
				});
				// #endif
				// #ifdef H5
				uni.showToast({
					icon: 'none',
					title: 'H5暂不支持复制！',
				})
				// #endif
			},
		}
	}
</script>

<style lang="less" scoped>
	page{
		height:100%;
	}
	.share-page{
		position: relative;
		height: 100%;
		padding-top: 360upx;
	}
	.share-bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.share-navbar{
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		width: 100%;
		height: 44px;
		display: flex;
		text-align: center;
		display: flex;
	}
	.share-navbar-back{
		width: 44px;
		height: 44px;
		text-align: center;
		font-size: 20px;
		font-weight: 600;
		color: #fff;
		line-height: 44px;
	}
	.share-navbar-title{flex: 1;text-align: center;line-height: 44px;text-align: center;color: #fff;font-size: 18px}
	.share-content{
		position: relative;width: 80%;display: block;margin: 0 auto;border-radius: 40upx;
	}
	.share-bg2{position: absolute;top: 0;width: 100%;height: 100%;z-index: -1;border-radius: 40upx;}
	.share{
		margin:0 30upx;padding:75upx;border-radius: 40upx;
		.img{
			width:320upx;height:320upx;display:block;margin: 0upx auto;padding: 20upx;background: #fff;
		}
		.my_yqm{
			display:flex;text-align:center;justify-content:center;margin-top:96upx;
			.yqm{
				height:56upx;line-height:56upx;font-size:50upx;color:#fff;padding: 5upx 0;
			}
			.copy{
				flex: 1;height:62upx;line-height:62upx;font-size:26upx;color:#fe6f07;background:#fff;padding:0 20upx;border-radius:10upx;margin-left:40upx;
			}
		}
		.link{
			margin-top:90upx;
			.tips{
				font-size:26upx;color:#f5f5f5;display:block;padding:12upx 0; 
			}
			.link_lj{
				display:flex;text-align:center;justify-content:space-between;
			}
			.yqm{
				height:56upx;line-height:56upx;font-size:26upx;color:#fe6f07;background:#f5f5f5;padding:0 20upx;border-radius:10upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-right:20upx;
			}
			.copy{
				display:inline-flex;width:56upx;height:56upx;background:#5075e8;border-radius:6upx;
				.icon{width:56upx;height:56upx;}
			}
		}
		.bc_img{
			width:340upx;height:72upx;line-height:72upx;font-size:30upx;color:#f5f5f5;border-radius:30upx;margin: 75upx auto 0 auto;border: 1px solid #fff;text-align: center;
		}
	}
</style>