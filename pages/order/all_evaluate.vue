<template>
	<view class="all-evaluate">
		<view class="all-evaluate-item" v-for="(item, index) in list" :key="index">
			<view class="item-top">
				<text>{{item.title}}</text>
				<text class="item-time">{{item.createtime}}</text>
			</view>
			<view class="item-content">{{item.content}}</view>
			<order-item :goPage="'../index/detail?id='+item.id" :data="item"></order-item>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import OrderItem from '../components/OrderItem.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data (){
			return {
				list: [],
				loadStatus: 'more',
				page: 1,
			}
		},
		components: {OrderItem, uniLoadMore},
		created() {
			this.getData()
		},
		methods:{
			getData (){
				var data = {page: this.page}
				if(this.page == 1){
					this.list = uni.getStorageSync('product_myevaluation')
				}
				this.$post('api/shop/product/myevaluation').then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.data
							uni.setStorageSync('product_myevaluation', res.data.data)
						}else{
							this.list.push(...res.data.data)
						}
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			}
		},
		//滚动到底部加载
		onReachBottom() {
			if(this.loadStatus == 'more'){
				this.page++
				this.getData()
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.all-evaluate{border-top: 10upx var(--body-bg) solid;}
	.all-evaluate-item{border-bottom: 1upx var(--border) solid; padding: 30upx 0;}
	.item-top{padding: 0 30upx;font-size: 30upx; display: flex;align-items: flex-end;}
	.item-time{font-size: 24upx;color: #909090;margin-left: 16upx;}
	.item-content{padding: 10upx 30upx;color: #323232;font-size: 26upx;margin-top: 20upx;}
	.all-evaluate-item .order-item{border-bottom: none;margin-bottom: 0;padding-bottom: 10upx;}
</style>
