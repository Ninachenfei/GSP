<template>
	<view class="homepage-page gray-bg">
		<view class="homepage-top" v-if="data.business_info">
			<image mode="aspectFill" :src="data.business_info.logo" class="homepage-left"></image>
			<view class="homepage-right">
				<view class="homepage-storename"> <text class="iconfont">&#xe650;</text> {{data.business_info.name || '--'}}</view>
			</view>
		</view>
		<view class="homepage-list-title">最新上架</view>
		<view class="goods-list">
			<goods-item :data="item" v-for="(item, index) in goodsList" :key="index" > </goods-item>
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
				page: 1,
				//加载状态 more、loading、noMore
				loadStatus: 'more',
				//搜索关键字
				keyword: '',
				zone_type: null,
				data: {}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getGoodsList()
			this.getInfo()
		},
		components: {GoodsItem, LoadMore},
		methods: {
			getInfo(){
				this.$post('api/shop/business/businessinfo', {business_uid: this.id}).then(res=>{
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

<style>
	.goods-list{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20upx 30upx 0 30upx;
	}
	.homepage-storename{font-size: 32upx;}
</style>
