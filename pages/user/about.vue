<template>
	<view class="box">	
		<view class="form_ct_logo">
			<image src="../../static/img/logo2.png" class="logo_img"></image>
			<view class="logo_text">My Home</view>
		</view>
		<view class="ct_link">
			
			<view class="list">
				<view @click="goxieyi" class="link" hover-class="none" >用户协议</view>
				<image src="../../static/icon/icon_next.png" class="icon"></image>
			</view>
			<view class="list"  @click="handleVersion">
				<view class="link clear"><text>版本</text><text class="fr" style="margin-right: 10upx;">{{vresion}}</text></view>
				<image src="../../static/icon/icon_next.png" class="icon"></image>
			</view>
			
		</view>	
	</view>
</template>

<script>
	import UpdateVersion from '@/utils/update.js'
	var v = new UpdateVersion()
	export default {
		data() {
			return {
				vresion: v.version
			};
		},

		mounted(){
	
		},
		onLoad() {
			
		},
		computed:{
	
		},
		methods: {
			//跳转协议
			goxieyi (){
				//#ifdef APP-PLUS
				plus.runtime.openWeb('https://app.myhome131419.com/register.html')
				//#endif
				//#ifdef H5
				location.href = 'https://app.myhome131419.com/register.html'
				//#endif
			},
			//检查更新
			handleVersion(){
				//#ifdef APP-PLUS
				v.getNewData('1')
				//#endif
				//#ifdef H5
				this.$toast('H5不支持版本更新！')
				//#endif
			}
		}
	}
</script>

<style lang="less" scoped>
	.form_ct_logo{
		 text-align: center;padding-top:20upx;
		 .logo_img{
			 width:150upx ;height:150upx;
		 }
		 .logo_text{font-size:34upx;color:#333;line-height: 1.5;}
	}
    .ct_link{
    	padding-bottom: 100upx; margin: 0 30upx;
    	.list{display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #f2f2f2;}
    	.link{height:100upx;line-height: 100upx;font-size:28upx;color:#666;flex: 1;display: flex;align-items: center;justify-content: space-between; }
    	.icon{width:12upx;height:24upx;}
    	.fr{margin-right:10upx;}
    }
	
	
</style>