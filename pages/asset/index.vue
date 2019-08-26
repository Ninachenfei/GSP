<template>
	<view class="asset-page">
		<!-- 顶部轮播图 -->
		<swiper class="asset-banner" :indicator-dots="true" indicator-color="rgb(254, 111, 7, 0.2)" indicator-active-color="#fe6f07" :interval="3500" circular  autoplay>
			<block v-for="(item,index) in banners" :key="index">
				<swiper-item class="asset-item">
					<image class="asset-item-img" :src="item" lazy-load mode="aspectFill"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="asset-menu">
			<navigator url="asset" class="asset-menu-item asset-menu-item-first">
				<image class="asset-menu-icon" src="/static/img/assets/icon-asset.png" mode="aspectFit"></image>
				<text class="asset-menu-txt">我的资产</text>
			</navigator>
			<view @click="goStore" class="asset-menu-item">
				<image class="asset-menu-icon" src="/static/img/assets/icon-store.png" mode="aspectFit"></image>
				<text class="asset-menu-txt">我的店铺</text>
			</view>
		</view>
		<view class="asset-list">
			<view class="asset-title">功能</view>
			<navigator url="team" class="asset-list-item">
				<view class="asset-item-left">
					<image src="/static/img/assets/icon-myteam.png" class="asset-item-icon"></image>
					<text class="asset-item-txt">我的团队</text>
				</view>
				<text class="iconfont">&#xe7f9;</text>
			</navigator>
			<navigator url="transfer" class="asset-list-item">
				<view class="asset-item-left">
					<image src="/static/img/assets/icon-jifenhuzhuan.png" class="asset-item-icon"></image>
					<text class="asset-item-txt">积分互转</text>
				</view>
				<text class="iconfont">&#xe7f9;</text>
			</navigator>
			<navigator url="transaction" class="asset-list-item">
				<view class="asset-item-left">
					<image src="/static/img/assets/icon-jiaoyi.png" class="asset-item-icon"></image>
					<text class="asset-item-txt">交易</text>
				</view>
				<text class="iconfont">&#xe7f9;</text>
			</navigator>
			<navigator url="wallet" class="asset-list-item">
				<view class="asset-item-left">
					<image src="/static/img/assets/icon-wellat.png" class="asset-item-icon"></image>
					<text class="asset-item-txt">钱包</text>
				</view>
				<text class="iconfont">&#xe7f9;</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				banners: [],
				userInfo: {}
			}
		},
		created() {
			//获取轮播图
			this.getbanner()
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
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
			},
			//获取轮播图
			getbanner (){
				this.banners = uni.getStorageSync('carouselmap_2') || []
				this.$post('api/carouselmap', {type: 2}).then(res=>{
					if(res.code == 1){
						uni.setStorageSync('carouselmap_2', res.data)
						this.banners = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			goStore (){
				if(this.userInfo.store_per == 1){
					uni.navigateTo({url: '/pages/store/index?id='+this.userInfo.id})
				}else if(this.userInfo.store_per == 2){
					uni.showModal({
						title: '店铺申请',
						showCancel: false,
						content: '您的店铺申请正在审核'
					})
				}else{//认证商家
					uni.navigateTo({url: 'business'})
				}
			}
		}
	}
</script>

<style>
</style>
