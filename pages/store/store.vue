<template>
	<view class="h100 gray-bg store-page">
		<view class="store-tab">
			<view class="store-tab-item" :class="{active: tabIndex==1}" @click="toggleTab(1)">审核中</view>
			<view class="store-tab-item" :class="{active: tabIndex==2}" @click="toggleTab(2)">已上架</view>
			<view class="store-tab-item" :class="{active: tabIndex==4}" @click="toggleTab(4)">已下架</view>
			<view class="store-tab-item" :class="{active: tabIndex==3}" @click="toggleTab(3)">上架失败</view>
		</view>
		<view class="store-list">
			<view class="store-list-item" v-for="(item, index) in list" :key="index">
				<navigator :url="'detail?id='+item.id" class="store-item-goods">
					<image class="store-item-left" :src="item.image" mode="aspectFill"></image>
					<view class="store-item-right">
						<text class="store-item-txt">{{item.title}}</text>
						<view class="store-item-infos">
							<view class="store-item-infos-left">
								<text class="store-item-info">库存:{{item.stock}}</text>
							</view>
							<text class="store-item-price">￥{{item.price}}</text>
						</view>
					</view>
				</navigator>
				<view class="store-bottom">
					<view class="store-bottom-right">
						<text class="store-bottom-btn status2" @click="edit(item)" v-if="item.status == 4 || item.status == 3">编辑</text>
						<text class="store-bottom-btn status1" @click="downStore(item)" v-if="item.status == 2">下架</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				id: '',
				list: [],
				page: 1,
				loadStatus: 'more',
				tabIndex: 1,
			};
		},
		components: {uniLoadMore},
		onLoad(){
			this.getList()
		},
		methods: {
			//编辑
			edit (item){
				uni.navigateTo({
					url: '/pages/store/release?id='+item.id
				})
			},
			//下架
			downStore(item){
				uni.showModal({
					title:'确认下架',
					content:'你确认要下架该商品吗?',
					success: (e)=> {
						if(e.confirm){
							this.$post('api/shop/business/cancelgoods', {id: item.id}).then(res=>{
								this.$toast(res.msg)
								this.toggleTab(this.tabIndex)
							})
						}
					}
				})
			},
			toggleTab (index){
				this.tabIndex = index
				this.loadStatus = 'more'
				this.page = 1
				this.list = []
				this.getList()
			},
			getList (){
				this.loadStatus = 'loading'
				var status = this.tabIndex;
				if(this.page == 1){
					this.list = uni.getStorageSync('business_publishlists_'+status) || []
				}
				var data = {
					page: this.page,
					status: status
				}
				this.$post('api/shop/business/publishlists', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.data
							uni.setStorageSync('business_publishlists_'+status, res.data.data)
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

<style>
</style>
