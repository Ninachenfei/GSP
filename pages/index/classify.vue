<template>
	<view class="h100">
		<view class="cls-content">
			<scroll-view class="cls-left" scroll-y>
				<view class="cls-left-item" @click="toggleCls(item, index)" :class="{active: currentItem.id == item.id}" v-for="(item, index) in clsList" :key="index">{{item.name}}</view>
			</scroll-view>
			<scroll-view class="cls-right" scroll-y @scrolltolower="loadMore">
				<!-- <image class="cls-banner" mode="aspectFill" :src="currentItem.image"></image> -->
				<view class="cls-list">
					<!-- <text class="cls-list-title">{{currentItem.name}}</text> -->
					<goods-item2 :data="item" v-for="(item, index) in goodsList" :key="index"></goods-item2>
				</view>
				<uni-load-more :status="loadStatus"></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import GoodsItem2 from '../components/GoodsItem2.vue'
	import goodsImg from '@/static/img/shop/network/zq1.jpg'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	//网络请求对象，多次切换分类因为网络原因会导致, 最后一次网络请求快于之前的 之前的数据覆盖了最后一次的数据，就会出现此bug
	//下次切换的时候自动取消之前的请求可解决此问题
	let requestTask = null
	export default {
		data (){
			return {
				list: [],
				//当前分类索引
				currentItem: {id: 0, index: 0, image: '', name: ''},
				//所有分类
				clsList: [],
				goodsList: [],
				loadStatus: 'more',
				page: 1,
			}
		},
		components: {GoodsItem2, uniLoadMore},
		created() {
			this.getAllCls()
		},
		methods: {
			toggleCls (item, index){
				this.currentItem = item
				this.currentItem.index = index
				requestTask && (requestTask.abort())
				this.getGoodsList()
				this.page = 1
				this.loadStatus = 'more';
			},
			//获取全部分类
			getAllCls (){
				this.cls = uni.getStorageSync('product_goodstype_0') || []
				this.$post('api/shop/product/goodstype', {pid: 0}).then(res=>{
					if(res.code == 1){
						if(res.data.length > 0){
							this.clsList = res.data
							this.toggleCls(res.data[0], 0)
							uni.setStorageSync('product_goodstype_0', res.data)
						}
					}else{
						this.$toast(res.msg)
					}
				})
			},
			loadMore (){
				if(this.loadStatus == 'more'){
					this.page++
					this.getGoodsList()
				}
			},
			//获取分类下的商品列表
			getGoodsList (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.goodsList = uni.getStorageSync('product_goodstype_'+this.cls) || []
				}
				var data = {
					type: 0,
					page: this.page,
					goods_type: this.currentItem.id
				}
				requestTask = uni.request({
					url: this.$domain+'api/shop/product/lists',
					data: data,
					success: (res)=> {
						res = res.data
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
					},
					fail: ()=>{
						this.loadStatus = 'noMore'
					}
				});
				
				// this.$post('api/shop/product/lists', data).then(res=>{
				// 	if(res.code == 1){
				// 		if(res.data.has_more){
				// 			this.loadStatus = 'more'
				// 		}else{
				// 			this.loadStatus = 'noMore'
				// 		}
				// 		if(this.page == 1){
				// 			this.goodsList = res.data.data
				// 			uni.setStorageSync('product_goodstype_'+this.currentCls, res.data.data)
				// 		}else{
				// 			this.goodsList.push(...res.data.data)
				// 		}
				// 	}else{
				// 		this.loadStatus = 'noMore'
				// 		this.$toast(res.msg)
				// 	}
				// })
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
	@color: #fe6f07;
	/* #ifdef APP-PLUS */
	.h100{height: 100vh}
	/* #endif */
	/* #ifdef H5 */
	.h100{height: 100%}
	/* #endif */
	.cls-content{
		height: 100%;display: flex;background: var(--body-bg);overflow: hidden;
	}
	.cls-left{
		height: 100%;font-size: 26upx;color: #909090;width: 150upx;text-align: center;
	}
	.cls-left-item{
		display: block;text-align: center;height: 80upx; position: relative;width: 100%;line-height: 40upx;padding: 20upx 0;box-sizing: border-box;
		&::before{
			content: '';left: 0;position: absolute;top: 20upx;width: 6upx;height: 40upx;background:transparent;transform: all ease .3s;
		}
		&.active{
			background: #fff;
			&::before{background: @color;}
		}
	}
	.cls-right{
		height: 100%;flex: 1;background: #fff;padding: 0 30upx;
	}
	.cls-banner{
		display: block;width: 100%;height: 270upx;border-radius: 16upx;margin-bottom: 30upx;
	}
	.cls-list-title{
		display: block;font-size: 32upx;font-weight: 600;line-height: 50upx;margin-bottom: 10upx;
	}
</style>
