<template>
	<navigator class="item" :url="'/pages/index/detail?id='+data.id">
		<image :src="data.image" class="cover" mode="aspectFill"></image>
		<text class="item-txt">{{data.title}}</text>
		<view class="item-bottom">
			<text class="item-price">￥{{data.price}}</text>
			<text class="item-kuncun">已售{{data.sales_volume}}件</text>
		</view>
	</navigator>
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

<style scoped="scoped" lang="less">
	.dfyc(@line:3) {
		text-decoration: none;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: @line;
		-webkit-box-orient: vertical;
		vertical-align: top;
	}
	.item{
		position: relative;
		display: inline-block;
		width: 48.5%;
		margin-bottom: 20upx;
		background: #fff;
		border-radius: 10upx;
		overflow: hidden;
		box-shadow: 0 0 2upx rgba(0,0,0,0.2);
		padding-bottom: 20upx;
	}
	.cover{
		width: 100%;
		height: 400upx;
	}
	.item-txt{
		display: block;
		line-height: 40upx;
		margin-bottom: 16upx;
		font-size: 26upx;
		padding: 0 20upx;
		.dfyc(2);
	}
	.item-bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20upx;
	}
	.item-price{
		font-size: 30upx;
		color: #f23a22;
		font-weight: 600
	}
	.item-kuncun{
		font-size: 22upx;
		color: #909090;
	}
</style>
