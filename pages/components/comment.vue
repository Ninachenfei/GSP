<template>
	<view class="comment-item">
		<view class="comment-head">
			<image class="comment-head-img" :src="data.avatar" mode="aspectFit"></image>
			<text class="comment-head-name">{{data.username}}</text>
		</view>
		<view class="comment-content">
			{{data.content}}
		</view>
		<!-- <view class="comment-info">
			<text>2019-03-31</text>
			<text>颜色分类：深空灰色；</text>
			<text>网络类型：无线网络；</text>
			<text>储存容量：256GB</text>
		</view> -->
	</view>
</template>

<script>
	export default{
		props: {
			data: {
				type: Object
			}
		}
	}
</script>

<style lang="less">
	.comment-item{
		display: block;
		margin-bottom: 20upx;
		padding-bottom: 30upx;
		border-bottom: 1px var(--border) solid;
	}
	.comment-head{
		display: block;
		margin-bottom: 18upx;
	}
	.comment-head-img{
		display: inline-block;
		vertical-align: middle;
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}
	.comment-head-name{
		display: inline-block;
		vertical-align: middle;
		font-size: 28upx;
		padding-left: 16upx;
		color: #909090;
	}
	.comment-content{
		display: block;
		font-size: 26upx;
		color: #323232;
		margin-bottom: 10upx;
	}
	.comment-info{
		display: flex;
		flex-wrap: wrap;
		font-size: 22upx;
		color: var(--txt-gray-color);
		text{
			display: inline-block;
			margin-right: 20upx;
		}
	}
</style>
