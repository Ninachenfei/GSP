<template>
	<view class="plr30 list">
		<view class="goods-list">
			<goods-item :data="item" v-for="(item, index) in goodsList" :key="index"> </goods-item>
		</view>
		<load-more :status="loadStatus"></load-more>
	</view>
</template>

<script>
	import GoodsItem from '../components/GoodsItem'
	import LoadMore from '../components/uni-load-more'
	import Banner from '@/static/img/shop/banner.jpg'
	import goodsImg from '@/static/img/shop/network/zq1.jpg'
	export default {
		data (){
			return {
				//列表数据
				goodsList: [],
				//加载状态 more、loading、noMore
				loadStatus: 'more',
				page: 1
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList (){
				this.$post('api/shop/product/collectionlist', {page: this.page}).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.goodsList = res.data.data
							uni.setStorageSync('product_collectionlist', res.data.data)
						}else{
							this.goodsList.push(...res.data.data)
						}
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			}
		},
		components: {GoodsItem, LoadMore},
		onReachBottom() {
			if(this.loadStatus == 'more'){
				this.page++
				this.getList()
			}
		}
	}
</script>

<style scoped="scoped">
	.goods-list{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20upx 30upx 0 30upx;
	}
	.list{
		background: var(--body-bg);
	}
</style>
