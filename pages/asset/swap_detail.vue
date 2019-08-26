<template>
	<view class="box">			
		<view class="swap_lb">
			<view class="swap_lb_list swap_lb_list_bt">
				<view class="swap_lb_list_item">日期</view>
				<view class="swap_lb_list_item">币种</view>
				<view class="swap_lb_list_item">数量</view>
				<view class="swap_lb_list_item">积分</view>
			</view>
			<view class="swap_lb_list" v-for="(item, index) in list" :key="index">
				<view class="swap_lb_list_item">{{item.createtime}}</view>
				<view class="swap_lb_list_item">{{item.coin_name}}</view>
				<view class="swap_lb_list_item">{{item.coin_amount > 0 ? '+' : ''}}{{item.coin_amount}}</view>
				<view class="swap_lb_list_item">{{item.jf_amount > 0 ? '+' : ''}}{{item.jf_amount}}</view>
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
				loadStatus: 'more'
			};
		},
		components: {uniLoadMore},
		onLoad(){
			this.getList()
		},
		methods: {
			//获取消息列表
			getList (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.list = uni.getStorageSync('exchange_convertlog') || []
				}
				var data = {
					page: this.page,
				}
				this.$post('api/exchange/convertlog', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.data
							uni.setStorageSync('exchange_convertlog', res.data.data)
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

<style lang="less" scoped>
	@import '../../config.less';
	.swap_lb{
		padding: 0 30upx;border-top:10upx solid #f7f7f7;
		.swap_lb_list{
			word-break: break-all;padding: 20upx 0;display: flex;align-items: center;justify-content: space-between;font-size:24upx;color:var(--txt-color);border-bottom:1px solid #f7f7f7;
		}
		.swap_lb_list .swap_lb_list_item{
			text-align: center;
			&:nth-child(1){flex: 3}
			&:nth-child(2){flex: 3}
			&:nth-child(3){flex: 3}
			&:nth-child(4){flex: 3}
		}
		.swap_lb_list_bt{color:var(--txt-gray-color);height:100upx;background: #fff;}
	}
</style>