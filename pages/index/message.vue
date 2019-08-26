<template>
	<view class="msg-list gray-bg">
		<view class="msg-item" v-for="(item, index) in list"  :key="index">
			<view class="msg-item-time-wrap">
				<text class="msg-item-time">{{item.publishtime}}</text>
			</view>
			<navigator class="msg-content" :url="'message_detail?id='+item.id">
				<text class="msg-item-title">{{item.title}}</text>
				<text class="msg-item-txt">{{item.content}}</text>
				<view class="msg-item-look">
					<text>点击查看</text>
					<text class="iconfont f32">&#xe7f9;</text>
				</view>
			</navigator>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data (){
			return {
				list: [],
				page: 1,
				loadStatus: 'more'
			}
		},
		components: {uniLoadMore},
		onLoad(e) {
			this.getList()
		},
		methods: {
			//获取消息列表
			getList (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.list = uni.getStorageSync('announcement_lists') || []
				}
				var data = {
					page: this.page,
				}
				this.$post('api/announcement/lists', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.data
							uni.setStorageSync('announcement_lists', res.data.data)
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

<style lang="less" scoped="scoped">
	.fyc(@a: 100%) {
	    width: @a;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.msg-list{padding: 30upx;min-height: 100%;}
	.msg-item{margin-bottom: 40upx;}
	.msg-item-time-wrap{text-align: center;display: block;margin: 20upx auto;}
	.msg-item-time{font-size: 24upx;background: #ccc;color: #fff;padding: 5upx 16upx;}
	.msg-content{background: #fff;padding: 30upx 20upx;}
	.msg-item-title{display: block;font-size: 30upx;font-weight: 600;.fyc();line-height: 50upx;margin-bottom: 10upx;}
	.msg-item-txt{font-size: 24upx;color: #909090;.fyc();margin-bottom: 20upx;line-height: 50upx;display: block;}
	.msg-item-look{display: flex;justify-content: space-between;color: #323232}
</style>
