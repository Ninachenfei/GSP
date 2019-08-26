<template>
	<view class="transaction-page h100 gray-bg">
		<view class="transaction-list" v-for="(item, index) in list" :key="index" @click="goto(item.url)">
			<view class="transaction-item-left">
				<image class="transaction-item-img" :src="item.img" mode="aspectFit"></image>
				<text class="transaction-item-txt">{{item.plat}}</text>
			</view>
			<view class="iconfont f40">&#xe7f9;</view>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				list: [],
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList (){
				this.$post('api/exchangeplat').then(res=>{
					if(res.code == 1){
						this.list = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			goto (url){
				//#ifdef APP-PLUS
					var webview = plus.webview.create(url, url, {
						backButtonAutoControl: 'close',
						zindex:1000,
						titleNView: {
							'autoBackButton': true,
						}
					}, {});
					webview.addEventListener('titleUpdate', ()=>{
						webview.show('slide-in-right')
					})
					//plus.runtime.openWeb(url)
				//#endif
				//#ifdef H5
					location.href = url
				//#endif
			}
		}
	}
</script>

<style>
</style>
