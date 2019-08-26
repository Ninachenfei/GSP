<template>
	<view class="box">
		  <view class="dope">
			  <view class="list" v-for="(item, index) in list" :key="index">
				  <view class="ct">
					  <view class="title">{{item.title}}</view>
					  <view class="content">{{item.content}}</view>
					  <view class="time block">{{item.createtime}}</view>					  
				  </view>
				  <view class="ct mt-20" v-if="item.reply">
					  <view class="title block"><view>客服回复:</view>{{item.reply}}</view>
					  <view class="time block mt-10">{{item.updatetime}}</view>					  
				  </view>
				  <view v-else>
				  		<view class="title block" style="text-align: right;">暂未回复</view>				  
				  </view>
			  </view>
		  </view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data(){
			return {
				list: [],
				page: 1,
				loadStatus: 'more'
			}
		},
		components: {uniLoadMore},
		onLoad() {
			this.getList()
		},
		methods: {
			getList (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.list = uni.getStorageSync('user_replylist') || []
				}
				var data = {
					page: this.page,
				}
				this.$post('api/user/replylist', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.data
							uni.setStorageSync('user_replylist', res.data.data)
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
	};
</script>

<style lang="less" scoped>
	.laod_ts{
		font-size:25upx;color:#666;text-align: center;line-height:2;
	}
	.dope{
		  padding: 28upx;
		  .list{
			   box-shadow: 0 0 20upx #b8b3b3;border-radius:10upx;padding:10upx;margin-bottom:40upx;
			  .ct{
				  padding:0 10upx;
				  .title{
					  font-size:30upx;color: #333;line-height: 1.8;
				  }
				  .time{
					  font-size:24upx;color:#999;
				  }
			  }
		  }
	}
	.content{color: #606060;font-size: 26upx}
</style>
