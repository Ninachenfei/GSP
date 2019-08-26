<template>
	<view class="await-evaluate">
		<view class="order-list">
			<view class="order-list-item" v-for="(item, index) in list" :key="index">
				<view class="order-item-top">
					<view class="order-item-store">
						<template v-if="item.business_info && item.business_info.name">
							<text class="iconfont f40">&#xe650;</text>
							<text class="order-store-name">{{item.business_info.name}}</text>
							<text class="iconfont f30">&#xe7f9;</text>
						</template>
					</view>
				</view>
				<order-item :goPage="'../order/detail?id='+item.id" :data="item"></order-item>
				<view class="order-add mt-20">
					<text>共{{item.num}}件商品 合计:</text>
					<text class="price-color">￥{{item.total}}</text>
				</view>
				<view class="order-btns">
					<navigator :url="'../order/evaluate?id='+item.id" class="order-btn">去评价</navigator>
				</view>
			</view>
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
				let data = {page: this.page, status: 8}
				if(this.page == 1){
					this.list = uni.getStorageSync('order_lists_8')
				}
				this.$post('api/shop/order/lists', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(data.page == 1){
							this.list = res.data.data
							uni.setStorageSync('order_lists_8', res.data.data)
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
<style scoped lang="less">
	@color: #fe6f07; @price: #f33c1e;
	.order-list{padding: 30upx;}
	.order-list-item{background: #fff;border-radius: 6upx;padding: 16upx 20upx;margin-bottom: 30upx;border-bottom: 1upx var(--border) solid;}
	.order-item-top{display: flex;justify-content: space-between;align-items: center;}
	.order-item-store{display: inline-flex;align-items: center;}
	.order-item-store .iconfont{color: #999}
	.order-store-name{color: #323232;font-size: 30upx;margin-left: 10upx;margin-right: 6upx;}
	.order-item-status{color: @color;font-size: 28upx}
	.order-list-item .order-item{padding-left: 0;padding-right: 0;border-bottom: none;margin-bottom: 0;padding-bottom: 0;}
	.order-express{display: block;color: #999;font-size: 26upx;padding: 20upx 0;}
	.order-express text{margin-right: 20upx;}
	.order-add{color: #999;text-align: right;display: block;font-size: 26upx}
	.order-add .price-color{color: @price}
	.order-btns{display: flex;justify-content: flex-end;margin-top: 20upx;font-size: 26upx}
	.order-btn{padding: 0 20upx;color: #999;border: 1upx currentColor solid;border-radius: 30upx;line-height: 48upx;height: 50upx;margin-left: 20upx;}
</style>
