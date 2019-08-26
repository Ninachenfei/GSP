<template>
	<view class="box">	
	     <view class="recharge">
			 <view class="cz_ma">
				  <image class="img" :src='img' mode="scaleToFill"></image>
				  <view class="save_ma" @click="saveToGallery()(img)">【保存二维码至相册】</view>
			 </view>
			  
			  <view class="my_yqm">
				  <view class="yqm">{{recharge_address}}</view>
				  <view class="copy" @click="copy(recharge_address)"><text class="iconfont">&#xe6e6;</text> 复制地址</view>
			  </view>
			  <text class="tips_ct">
			  	请勿向上述地址充值任何非{{coin}}资产，否则资产将不可找回。
			  </text>
		</view>	
		
	</view>
</template>

<script>
	import QR from "@/static/js/wxqrcode.js"
	import SaveImg from '@/utils/saveImg.js'
	export default {
		data() {
			return {
				img:'',
				num:'',//充值数量
				pay_password:'',//支付密码
				recharge_address:'',//充值地址
				coin: '',
				userInfo: {}
			};
		},
		onLoad(e) {
			this.recharge_address = e.address
			this.coin = e.id
			uni.setNavigationBarTitle({
				title: e.id + '充值'
			})
			this.getUserInfo()
		},
		components: {},
		methods:{
			getUserInfo (){
				this.userInfo = uni.getStorageSync('user_getuserinfo') || {}
				this.$post('api/user/getuserinfo').then(res=>{
					if(res.code == 1){
						if(this.coin == 'GSP'){
							var address = res.data.mh_address
						}else{
							var address = res.data.etoken_address
						}
						this.recharge_address = address
						uni.setStorageSync('user_getuserinfo', res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			copy (txt){
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: txt,
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
					title: 'H5暂不支持复制！'
				})
				// #endif
			},
			//保存图片到相册
			 saveToGallery(){
				 var s = new SaveImg()
				 s.run()
			 },
		},
		mounted(){
			this.img = QR.createQrCodeImg(this.recharge_address, {
				size: parseInt(300)
			})
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	page{height:100%;}
	.box{
		width:100%;height:100%;position: absolute;background-color:#f7f7f7;
	}
	.recharge{
		background: #fff;margin:45upx 30upx;padding:30upx;border-radius:10upx;
		.cz_ma{
			margin-top:40upx;
			.img{
				width:300upx;height:300upx;display:block;margin: 0upx auto;
			}
			.save_ma{
				font-size:24upx;color:#4f6be4;line-height:80upx;text-align: center;border-bottom:1px dashed #c8c8c9;display: block;padding-bottom:10upx;
			}
		}		
		.my_yqm{
			text-align:center;
			.yqm{
				display:block;height:80upx;line-height:80upx;font-size:25upx;color:#8f8e8e;
			}
			.copy{
				display:inline-block;width:260upx;height:60upx;line-height:60upx;font-size:28upx;color:#333;background:#e2e2e2;border-radius: 30upx;
				.iconfont{margin-right:10upx;}
			}
		}
		.tips_ct{
			display:inline-block;font-size:26upx;color:var(--txt-gray-color);line-height:1.8;margin:80upx 0 ;
		}
	}
	
</style>