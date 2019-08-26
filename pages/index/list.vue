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
				page: 1,
				//加载状态 more、loading、noMore
				loadStatus: 'more',
				//搜索关键字
				keyword: '',
				zone_type: null
			}
		},
		onLoad (e){
			if(e){
				if(e.zone_type){
					this.zone_type = e.zone_type
				}else if(e.keyword){
					this.keyword = e.keyword
					uni.setNavigationBarTitle({title: '搜索结果'});
				}
				this.getGoodsList()
			}
		},
		methods: {
			getGoodsList (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.goodsList = uni.getStorageSync('product_goodstype_'+this.currentCls) || []
				}
				var data = {
					type: 0,
					page: this.page,
					keyword: this.keyword
				}
				if(this.zone_type){
					data.zone_type = this.zone_type
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
		components: {GoodsItem, LoadMore},
		onReachBottom() {
			if(this.loadStatus == 'more'){
				this.page++
				this.getGoodsList()
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
</style>
