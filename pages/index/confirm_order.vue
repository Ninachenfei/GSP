<template>
	<view class="confirm-content">
		<navigator url="/pages/user/address" class="address" v-if="address">
			<text class="iconfont f44">&#xe604;</text>
			<view class="address-content">
				<view class="address-info">
					<text class="address-username">{{address.receiver}}</text>
					<text class="address-mobile">{{address.mobile}}</text>
				</view>
				<text class="address-text">{{address.receiving_area}} {{address.address}}</text>
			</view>
			<text class="iconfont f40">&#xe7f9;</text>
		</navigator>
		<navigator url="/pages/user/add_address" class="address-nodata" v-else>
			<view class="address-nodata-left">
				<text class="iconfont f40">&#xe61e;</text>
				<text>收货地址未填写请前往填写</text>
			</view>
			<text class="iconfont">&#xe7f9;</text>
		</navigator>
		<!-- <view class="confirm-dianpu">
			<image class="dianpu-avatar" src="/static/img/shop/network/store.jpg" mode="aspectFill"></image>
			<text>Apple Store 深圳分店</text>
		</view> -->
		<order-item v-for="(item, index) in goods" :goPage="'../index/detail?id='+item.id" :key="index" :data="item"></order-item>
		<view class="confirm-footer">
			<view class="confirm-footer-txt">共计{{addGoods.num}}件商品 实付<text class="theme-color">￥{{addGoods.price}}</text></view>
			<view class="confirm-btn" @click="cartorder">提交订单</view>
		</view>
	</view>
</template>

<script>
	import OrderItem from '../components/OrderItem.vue'
	export default {
		data (){
			return {
				id: null,
				cartids: '',
				address: null,
				orders: [],
				goods: []
			}
		},
		computed: {
			addGoods (){
				var data = {price: 0, num: 0}
				this.goods.forEach(item=>{
					data.price += parseInt(item.num) * parseFloat(item.price)
					data.num += 1
				})
				return data
			}
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow () {
			this.getDefaultAddress()
		},
		created() {
			var data = uni.getStorageSync('orders') || []
			if(data && data.length > 0 && data instanceof Array){
				this.orders = data
				data.forEach(item=>{
					this.getDetail(item.id, item.num)
				})
			}
		},
		methods: {
			//获取商品详情
			getDetail (id, num){
				this.$post('api/shop/product/detail', {
					id: id
				}).then(res=>{
					if(res.code == 1){
						res.data.num = num
						this.goods.push(res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//获取默认收货地址
			getDefaultAddress (){
				this.$post('api/shop/product/shippingaddress').then(res=>{
					if(res.code == 1 && res.data.data.length > 0){
						this.address = res.data.data[0]
					}
				})
			},
			//下单
			cartorder (){
				if(!this.address.id){
					this.$toast('请填写收货地址')
					return false
				}else if(!this.goods || this.goods.length <= 0){
					this.$toast('数据加载中...')
				}else{
					var data = {}, cartids = []
					this.orders.forEach(item=>{
						data[item.id] = [item.num, '', '']
						if(item.cartid){
							cartids.push(item.cartid)
						}
					})
					data = JSON.stringify(data)
					cartids = cartids.join(',');
					this.$post('api/shop/cart/cartorder', {
						data: data,
						address_id: this.address.id,
						cartids: cartids,
					}).then(res=>{
						if(res.code == 1){
							uni.redirectTo({
								url: "../order/pay?id=" + res.data + '&price='+this.addGoods.price
							})
						}
						this.$toast(res.msg)
					})
				}
			}
		},
		components: {OrderItem}
	}
</script>

<style scoped="scoped" lang="less">
	@color: #fe6f07;
	@price: #f33c1e;
	.theme-color{color: @price}
	.address-nodata{display: flex;justify-content: space-between;background: #fea96a;color: #fff;height: 80upx;line-height: 80upx;;font-size: 28upx;padding: 0 30upx;}
	.address-nodata-left{flex: 1;display: inline-flex;align-items: center}
	.address-nodata-left text{margin-right: 6upx;}
	.confirm-dianpu{display: flex;font-size: 30upx;align-items: center;margin-top: 20upx;padding: 20upx 30upx;border-bottom: 1upx var(--border) solid;}
	.dianpu-avatar{width: 40upx;height: 40upx;border-radius: 50%;margin-right: 10upx;}
	.confirm-footer{position: fixed;bottom: 0;left: 0;z-index: 100;display: flex;align-items: center;background: #fff;bottom: 0;left: 0;width: 100%;height: 110upx;box-shadow: 0 -2upx 4upx rgba(0,0,0,0.2);}
	.confirm-footer-txt{line-height: 40upx;padding-left: 30upx;font-size: 26upx;flex: 1;}
	.confirm-btn{width: 220upx;text-align: center;font-size: 30upx;color: #fff;background: @color;height: 110upx;line-height: 50upx;display: inline-flex;align-items: center;justify-content: center;}
	/* 收货地址 */
	.address{display: flex;padding: 20upx 30upx;border-bottom: 1upx var(--border) solid;margin-bottom: 20upx;align-items: center;}
	.address-content{flex: 1;padding-left: 30upx;padding-right: 16upx;}
	.address-info{display: flex;font-size: 30upx;color: #323232;align-items: flex-end;margin-bottom: 10upx;}
	.address-mobile{font-size: 26upx;color: #b4b4b4;margin-left: 10upx;}
	.address-text{display: block;font-size: 26upx;color: #666;}
</style>
