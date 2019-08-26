<template>
	<view class="transaction-page h100 gray-bg">
		<view class="transaction-list" @click="goEToken('etoken')">
			<view class="transaction-item-left">
				<image class="transaction-item-img" src="/static/img/EToken-logo-100.png" mode="aspectFit"></image>
				<text class="transaction-item-txt">E-Token</text>
			</view>
			<view class="iconfont f40">&#xe7f9;</view>
		</view>
		<view class="transaction-list" @click="goEToken('citycoin')">
			<view class="transaction-item-left">
				<image class="transaction-item-img" src="/static/img/icon-citycoin.png" mode="aspectFit"></image>
				<text class="transaction-item-txt">CITYCOIN</text>
			</view>
			<view class="iconfont f40">&#xe7f9;</view>
		</view>
		<view class="transaction-list" @click="goEToken('imtoken')">
			<view class="transaction-item-left">
				<image class="transaction-item-img" src="/static/img/assets/imtoken-logo.jpg" mode="aspectFit"></image>
				<text class="transaction-item-txt">imToken</text>
			</view>
			<view class="iconfont f40">&#xe7f9;</view>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {}
		},
		methods: {
			goEToken (param){
				//#ifdef APP-PLUS
				var data = {}
				if(param == 'etoken'){
					data = {pname:'com.etoken.app', action:'etoken://'+param}
				}else if(param == 'citycoin'){
					this.$toast('打开失败，暂未开放')
					return false
					data = {pname:'com.citycoin.app', action:'citycoin://'+param}
				}else if(param == 'imtoken'){
					data = {pname:'org.consenlabs.token', action:'imtoken://'+param}
				}
				if(plus.os.name === 'Android'){
					if(plus.runtime.isApplicationExist(data)){
						plus.runtime.launchApplication(data, (e)=>{
							this.$toast('打开失败， 请手动打开')
						});
					}else{
						this.$toast('您还未安装该应用')
					}
				}else{
					plus.runtime.launchApplication(data, (e)=>{
						this.$toast('打开失败')
					});
				}
				//#endif
				//#ifdef H5
				this.$toast('H5暂不支持该功能')
				//#endif
			}
		}
	}
</script>

<style>
</style>
