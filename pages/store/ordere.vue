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
				<order-item :goPage="'../order/detail?id='+item.id+'&type=1'" :data="item"></order-item>
				<view class="order-add">
					<text>共{{item.num}}件商品 合计:</text>
					<text class="price-color">￥{{item.total}}0</text>
				</view>
				<view class="order-btns">
					<view class="order-btn" v-if="item.status == 2" @click="fahuo(item)">确认发货</view>
				</view>
			</view>
		</view>
		<!-- 发货弹框 -->
		<popup-layer ref="popupCommont" direction="top">
			<view class="apply-item">
				<view class="apply-subtitle">物流公司</view>
				<view class="apply-input">
					<input type="text" v-model="expressGs" disabled @click="select" placeholder="请输入物流公司" class="apply-input-item">
				</view>
			</view>
			<view class="apply-item">
				<view class="apply-subtitle">物流单号</view>
				<view class="apply-input">
					<input type="text" v-model="expressNum" placeholder="请输入物流单号" class="apply-input-item">
				</view>
			</view>
			<view class="plr30 ordere-btn">
				<button class="btn-block" hover-class="btn-hover" @click="confirmFahuo">确认发货</button>
			</view>
		</popup-layer>
		<uni-load-more :status="loadStatus"></uni-load-more>
		<template v-if="clsList && clsList.length > 0">
			<mpvue-picker ref="mpvuePicker" mode="selector" :deepLength="1" @onConfirm="onConfirm" :pickerValueArray="clsList"></mpvue-picker>
		</template>
	</view>
</template>

<script>
	import OrderItem from '../components/OrderItem.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import PopupLayer from '../components/popup-layer.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	export default {
		data (){
			return {
				clsList: [],
				tabIndex: 1,
				list: [],
				page: 1,
				loadStatus: 'more',
				expressNum: '',
				expressGs: '',
				currentItem: '',
				expressId: ''
			}
		},
		components: {uniLoadMore, OrderItem, PopupLayer, mpvuePicker},
		onLoad(e) {
			this.tabIndex = e.type || 0
			this.getList()
			this.getExpress()
		},
		methods:{
			//选择快递 
			select (){
				this.$refs.mpvuePicker.show()
			},
			//获取快递列表
			getExpress (){
				this.$post('api/shop/business/logistics_company').then(res=>{
					if(res.code == 1){
						var data = []
						for(var i in res.data){
							data.push({
								label: res.data[i],
								value: i
							})
						}
						this.clsList = data
					}else{
						this.$toast(res.msg)
					}
					
				})
			},
			onConfirm (e){
				this.expressGs = e.label
				this.expressId = e.value
			},
			//发货
			fahuo (item){
				this.$refs.popupCommont.show() 
				this.currentItem = item
			},
			confirmFahuo (){
				if(!this.expressGs){
					this.$toast('请输入物流公司')
				}else if(!this.expressNum){
					this.$toast('请输入物流单号')
				}else{
					this.$refs.popupCommont.close() 
					this.$post('api/shop/business/ship', {
						id: this.currentItem.id,
						logistics_company: this.expressId,
						tracking_number: this.expressNum,
					}).then(res=>{
						if(res.code == 1){
							this.toggleTab(this.tabIndex)
						}
						this.$toast(res.msg)
					})
				}
			},
			toggleTab (index){
				this.tabIndex = index
				this.page = 1
				this.list = []
				this.loadStatus = 'more'
				this.getList()
			},
			getList (){
				this.loadStatus = 'loading'
				var status = this.tabIndex;
				if(this.page == 1){
					this.list = uni.getStorageSync('shop_business_orders_'+status) || []
				}
				var data = {
					page: this.page,
					status: status
				}
				this.$post('api/shop/business/orders', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.data
							uni.setStorageSync('shop_business_orders_'+status, res.data.data)
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
				this.getList()
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
	.order-list{padding: 20upx 0 0 0;}
	.order-list-item{background: #fff;border-radius: 6upx;padding: 16upx 30upx;margin-bottom: 20upx;}
	.order-item-top{display: flex;justify-content: space-between;align-items: center;}
	.order-item-store{display: inline-flex;align-items: center;}
	.order-item-store .iconfont{color: #999}
	.order-store-name{color: #323232;font-size: 30upx;margin-left: 10upx;margin-right: 6upx;}
	.order-item-status{color: @color;font-size: 28upx}
	.order-list-item .order-item{padding-left: 0;padding-right: 0;border-bottom: none;margin-bottom: 0;padding-bottom: 0;padding-top: 0;}
	.order-express{display: block;color: #999;font-size: 26upx;padding: 20upx 0;}
	.order-express text{margin-right: 20upx;}
	.order-add{color: #999;text-align: right;display: block;font-size: 26upx}
	.order-add .price-color{color: @price}
	.order-btns{display: flex;justify-content: flex-end;margin-top: 20upx;font-size: 26upx}
	.order-btn{padding: 0 20upx;color: #999;border: 1upx currentColor solid;border-radius: 30upx;line-height: 48upx;height: 50upx;margin-left: 20upx;}
	.ordere-btn{padding-bottom: 50upx;padding-top: 30upx;}
</style>
