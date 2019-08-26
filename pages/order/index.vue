<template>
	<view class="order-content">
		<view class="order-tabs">
			<view @click="toggleTab(0)" class="order-tab" :class="{active: tabIndex==0}">全部</view>
			<view @click="toggleTab(1)" class="order-tab" :class="{active: tabIndex==1}">待付款</view>
			<view @click="toggleTab(2)" class="order-tab" :class="{active: tabIndex==2}">待发货</view>
			<view @click="toggleTab(3)" class="order-tab" :class="{active: tabIndex==3}">待收货</view>
			<view @click="toggleTab(4)" class="order-tab" :class="{active: tabIndex==4}">已完成</view>
		</view>
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
					<text class="order-item-status" v-if="item.status == 1">待付款</text>
					<text class="order-item-status" v-else-if="item.status == 2">待发货 </text>
					<text class="order-item-status" v-else-if="item.status == 3">待收货</text>
					<text class="order-item-status" v-else-if="item.status == 4">已完成</text>
					<text class="order-item-status" v-else-if="item.status == 5">已取消</text>
				</view>
				<order-item :goPage="'../order/detail?id='+item.id" :data="item"></order-item>
				<view class="order-express" v-if="item.logistics_company">
					<text>物流公司: {{item.logistics_company}}</text>
					<text>物流单号: {{item.tracking_number}}</text>
				</view>
				<view class="order-add">
					<text>共一件商品 合计:</text>
					<text class="price-color">￥{{item.total}}</text>
				</view>
				<view class="order-btns">
					<view class="order-btn" v-if="item.status == 1" @click="goPay(item)">去付款</view>
					<view class="order-btn" v-else-if="item.status == 3" @click="confirm(item.id)">确认收货</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import OrderItem from '../components/OrderItem.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data (){
			return {
				tabIndex: 0,
				list: [],
				loadStatus: 'more',
				page: 1,
			}
		},
		components: {OrderItem, uniLoadMore},
		onLoad(e) {
			this.tabIndex = e.type || 0
		},
		created (){
			this.getData()
		},
		methods: {
			toggleTab (index){
				this.tabIndex = index
				this.page = 1
				this.loadStatus = 'more'
				this.getData();
			},
			goPay (item){
				uni.navigateTo({
					url: "../order/pay?id=" + item.id + '&price='+ item.total
				})
			},
			confirm (id){
				uni.showModal({
					title:'确认收货',
					content: '你确认收到货物了吗？',
					success: (res)=>{
						if(res.confirm){
							this.confirmorder(id)
						}
					}
				})
			},
			//确认订单
			confirmorder (id){
				this.$post('api/shop/order/confirmorder', {id}).then(res=>{
					if(res.code == 1){
						this.page = 1
						this.loadStatus = 'more'
						this.getData();
					}
					this.$toast(res.msg)
				})
			},
			getData (){
				let data = {page: this.page}
				let status = this.tabIndex
				status != 0 && (data.status = status)
				if(this.page == 1){
					this.list = uni.getStorageSync('order_lists_'+status)
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
							uni.setStorageSync('order_lists_'+status, res.data.data)
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
	@color: #fe6f07; @price: #f33c1e;
	.order-content{background: var(--body-bg);padding-top: 70upx;}
	.order-tabs{display: flex;justify-content: space-between;padding: 0 20upx;background: #fff;position: fixed;top: var(--window-top);left: 0;width: 100%;z-index: 100;box-sizing: border-box}
	.order-tab{padding: 0;font-size: 28upx;line-height: 70upx;color: #666;position: relative;flex: 1;text-align: center;}
	.order-tab:before{content: '';width: 40upx;height: 2px;position: absolute;bottom: 0;left: 0;right: 0;margin: auto;}
	.order-tab.active{color: @color;}
	.order-tab.active:before{background: @color;}
	.order-list{padding: 30upx;}
	.order-list-item{background: #fff;border-radius: 6upx;padding: 16upx 20upx;margin-bottom: 30upx;}
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
