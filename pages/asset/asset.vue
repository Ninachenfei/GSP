<template>
	<view class="assets-page">
		<view class="assets-top">
			<view class="assets-top-t">
				<text class="assets-top-label">总资产折合(USD)</text>
				<text class="iconfont" @click="setShowAsset" v-if="showAsset">&#xe605;</text>
				<text class="iconfont" @click="setShowAsset" v-else>&#xe601;</text>
			</view>
			<view class="assets-num">{{showAsset ? userInfo.total_eq : '****'}}</view>
		</view>
		<view class="assets-list">
			<navigator :url="'asset_detail?coin=GSP&cp='+userInfo.mh+'&freeze='+userInfo.freeze_mh" class="assets-item">
				<view class="assets-item-title">GSP</view>
				<view class="assets-data">
					<view class="assets-data-item">
						<text class="assets-data-item-label">可用</text>
						<text class="assets-data-item-val">{{showAsset ? userInfo.mh : '****'}}</text>
					</view>
					<view class="assets-data-item">
						<text class="assets-data-item-label">单价(USD)</text>
						<text class="assets-data-item-val">{{showAsset ? config.mh_price : '****'}}</text>
					</view>
					<view class="assets-data-item">
						<text class="assets-data-item-label">折合(USD)</text>
						<text class="assets-data-item-val">{{showAsset ? userInfo.mh_eq : '****'}}</text>
					</view>
				</view>
			</navigator>
			<navigator :url="'asset_detail?coin=E-Token&cp='+userInfo.etoken+'&freeze='+userInfo.freeze_etoken" class="assets-item">
				<view class="assets-item-title">E-Token</view>
				<view class="assets-data">
					<view class="assets-data-item">
						<text class="assets-data-item-label">可用</text>
						<text class="assets-data-item-val">{{showAsset ? userInfo.etoken : '****'}}</text>
					</view>
					<view class="assets-data-item">
						<text class="assets-data-item-label">单价(USD)</text>
						<text class="assets-data-item-val">{{showAsset ? config.etoken_price : '****'}}</text>
					</view>
					<view class="assets-data-item">
						<text class="assets-data-item-label">折合(USD)</text>
						<text class="assets-data-item-val">{{showAsset ? userInfo.etoken_eq : '****'}}</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				userInfo: {},
				showAsset: true,
				config: {}
			}
		},
		created() {
			this.showAsset = uni.getStorageSync('showAsset') === false ?  false : true;
			this.getUserInfo()
			this.getConfig()
		},
		methods: {
			//获取配置
			getConfig (){
				this.config = uni.getStorageSync('config') || {}
				this.$post('api/config').then(res=>{
					if(res.code == 1){
						this.config = res.data
						uni.setStorageSync('config', res.data)
					}
				})
			},
			setShowAsset (){
				uni.setStorageSync('showAsset', !this.showAsset);
				this.showAsset = !this.showAsset
			},
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