<template>
	<view class="order-detail">
		<view class="top">
			<view class="top-order">
				<text class="order-number">订单号:{{data.number}}</text>
				<text>日期:{{data.createtime}}</text>
			</view>
			<view class="daetail-top-status">{{data.status_str}}</view>
		</view>
		<view class="goods-item">
			<order-item :goPage="'../index/detail?id='+data.product_id" :data="data"></order-item>
		</view>
		<view class="total-info">
			<view class="total-price">
				<text class="fee-label">运费</text><text class="fee-value">￥{{data.freight}}</text>
			</view>
			<view class="total-price">
				<text class="fee-label">实付款</text><text class="fee-value">￥{{data.total}}</text>
			</view>
		</view>
		<view class="express-wrap">
			<text class="iconfont">&#xe63b;</text>
			<view class="express-info">
				<text class="express-name">收货人：{{data.receiver}} {{data.mobile}}</text>
				<text class="express-address">{{data.receiving_area}}{{data.address}}</text>
			</view>
		</view>
		<view class="total-info" v-if="data.logistics_company">
			<view class="total-price">
				<text class="fee-label">物流信息</text>
				<navigator :url="'../order/express?id='+id">
					<text class="express-detail">查看物流</text>
				</navigator>
			</view>
			<view class="total-price text-gray">{{data.logistics_company}}: {{data.tracking_number}} </view>
		</view>
		<view class="plr30 mt-100">
			<template v-if="type==0">
				<button class="btn-block radius" v-if="data.status == 1" @click="goPay(data)" hover-class="btn-hover">去付款</button>
				<button class="btn-block radius disabled mt-50" v-if="data.status == 1" @click="cancel(data)" hover-class="btn-hover">取消订单</button>
				<button class="btn-block radius" v-if="data.status == 3" @click="confirm(id)" hover-class="btn-hover">确认收货</button>
				<navigator :url="'../order/evaluate?id='+data.id" v-if="data.status == 4 && data.evaluation == 0">
					<button class="btn-block radius"  hover-class="btn-hover">去评价</button>
				</navigator>
			</template>
			<template v-else>
				<button class="btn-block radius" v-if="data.status == 2" @click="fahuo(data)" hover-class="btn-hover">确认发货</button>
			</template>
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
		<template v-if="clsList && clsList.length > 0">
			<mpvue-picker ref="mpvuePicker" mode="selector" :deepLength="1" @onConfirm="onConfirm" :pickerValueArray="clsList"></mpvue-picker>
		</template>
	</view>
</template>

<script>
	import OrderItem from '../components/OrderItem.vue'
	import PopupLayer from '../components/popup-layer.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	export default {
		data (){
			return {
				clsList: [],
				expressNum: '',
				expressGs: '',
				currentItem: '',
				expressId: '',
				id: '',
				data: {},
				type: 0
			}
		},
		components: {OrderItem, mpvuePicker, PopupLayer},
		onLoad(e) {
			this.id = e.id
			this.getDetail()
			this.getExpress()
			if(e.type && e.type == 1){//商家入口
				this.type = 1
			}
		},
		methods: {
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
						this.getDetail();
					}
					this.$toast(res.msg)
				})
			},
			//取消订单
			cancel (){
				uni.showModal({
					title:'确认取消',
					content: '你确认要取消订单吗？',
					success: (res)=>{
						if(res.confirm){
							this.cancelorder()
						}
					}
				})
			},
			cancelorder (){
				this.$post('api/shop/order/cancelorder', {id: this.id}).then(res=>{
					if(res.code == 1){
						this.getDetail();
					}
					this.$toast(res.msg)
				})
			},
			//获取详细信息
			getDetail (){
				this.$post('api/shop/order/detail', {id: this.id}).then(res=>{
					if(res.code == 1){
						this.data = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
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
							this.getDetail()
						}
						this.$toast(res.msg)
					})
				}
			},
		}
	}
</script>

<style scoped="scopend" lang="less">
	:root, page{background: var(--body-bg);}
	@color: #fe6f07; @price: #f33c1e;
	.order-detail{background: var(--body-bg);}
	.top{background: #fff;font-size: 24upx;padding: 10upx 30upx;display: flex;align-items: center;}
	.top-order{flex: 1;overflow: hidden;}
	.top-order text{display: block;line-height: 40upx;height: 40upx;}
	.daetail-top-status{font-size: 28upx;color: @color;}
	.goods-item{background: #fcfcfc;border-top: 1upx #eee solid;border-bottom: 1upx #eee solid;}
	.goods-item .order-item{background: transparent;border-bottom: none;}
	.total-price{padding: 10upx 30upx;font-size: 30upx;display: block;background: #fff;display: flex;justify-content: space-between;}
	.fee-value{color: @color;font-size: 28upx}
	.total-info{margin-bottom: 30upx;border-top: 1upx #eee solid;padding: 16upx 0;background: #fff;}
	.express-wrap{display: flex;background: #fff;align-items: center;justify-content: space-between;padding: 20upx 30upx;font-size: 30upx;border-bottom: 1upx #eee solid;border-top: 1upx #eee solid;}
	.express-wrap .iconfont{text-align: center;font-size: 46upx;width: 100upx;}
	.express-info{flex: 1;overflow: hidden;}
	.express-name{display: block;color: #323232;}
	.express-address{color: #909090;font-size: 24upx;}
	.express-detail{color: var(--link-color);text-decoration: underline;}
	.text-gray{color: #909090;font-size: 26upx}
	.order-item{padding-bottom: 0;}
	.ordere-btn{padding-bottom: 50upx;padding-top: 30upx;}
</style>
