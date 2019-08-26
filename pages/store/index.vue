<template>
	<view class="sstore-page">
		<view class="store-top">
			<image class="store-avatar" :src="data.logo_image" mode="aspectFill"></image>
			<view class="store-center">
				<view class="store-right-top">{{data.store_name}} <text class="iconfont">&#xe650;</text></view>
				<view class="store-username">{{userInfo.username}}</view>
			</view>
			<view class="store-rigth">我的旺铺</view>
		</view>
		<view class="store-jointime">加入时间: {{data.jointime}}</view>
		<view class="store-info-item">
			<text class="store-info-label">店铺名称</text>
			<text>{{data.store_name}}</text>
		</view>
		<view class="store-info-item border-none">
			<text class="store-info-label">主营行业</text>
			<text>{{data.major_business}}</text>
		</view>
		<view class="store-menu">
			<navigator class="store-menu-item" url="store">
				<image src="/static/img/icon-fabu.png" mode="aspectFit"></image>
				<text>我的发布</text>
			</navigator>
			<navigator class="store-menu-item" url="ordere">
				<image src="/static/img/icon-store-order.png" mode="aspectFit"></image>
				<text>店铺订单</text>
			</navigator>
			<navigator class="store-menu-item" url="release">
				<image src="/static/img/icon-fabushangping.png" mode="aspectFit"></image>
				<text>发布商品</text>
			</navigator>
		</view>
		<view class="goods-list">
			<goods-item :data="item" v-for="(item, index) in goodsList" :key="index"> </goods-item>
		</view>
		<load-more :status="loadStatus"></load-more>
	</view>
</template>

<script>
	import GoodsItem from '../components/GoodsItem'
	import LoadMore from '../components/uni-load-more'
	export default {
		data() {
			return {
				id: '',
				//列表数据
				goodsList: [],
				//加载状态 more、loading、noMore
				loadStatus: 'more',
				page: 1,
				//加载状态 more、loading、noMore
				loadStatus: 'more',
				//搜索关键字
				keyword: '',
				zone_type: null,
				data: {},
				userInfo: {}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getGoodsList()
			this.getData()
			this.getUserInfo()
		},
		components: {GoodsItem, LoadMore},
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
			getData (){
				this.$post('api/shop/business/mine').then(res=>{
					if(res.code == 1){
						this.data = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			getGoodsList (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.goodsList = uni.getStorageSync('product_goodstype_'+this.currentCls) || []
				}
				var data = {
					type: 0,
					page: this.page,
					business_uid: this.id
				}
				this.$post('api/shop/product/lists', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.goodsList = res.data.data
							uni.setStorageSync('product_goodstype_'+this.currentCls, res.data.data)
						}else{
							this.goodsList.push(...res.data.data)
						}
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			},
		},
		onReachBottom() {
			if(this.loadStatus == 'more'){
				this.page++
				this.getGoodsList()
			}
		}
		
	}
</script>

<style scoped="scoped" lang="less">
	@import '../style/store.less';
</style>
