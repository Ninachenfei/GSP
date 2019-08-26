<template>
	<navigator class="item" :url="'/pages/index/detail?id='+data.id">
		<image :src="data.image" class="cover" mode="aspectFill"></image>
		<view class="item-right">
			<text class="item-txt">{{data.title}}</text>
			<view class="item-bottom">
				<text class="item-price">￥{{data.price}}</text>
				<text class="item-kuncun">已售{{data.sales_volume}}件</text>
			</view>
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
	@color: #fe6f07;
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
		display: flex;
		margin-bottom: 20upx;
		background: #fff;
		border-radius: 10upx;
		overflow: hidden;
		padding-bottom: 20upx;
		margin-bottom: 20upx;
		border-bottom: 1upx var(--border) solid;
	}
	.cover{
		width: 150upx;
		height: 150upx;
	}
	.item-right{flex: 1;padding: 0 20upx;}
	.item-txt{
		display: block;
		line-height: 40upx;
		height: 80upx;
		margin-bottom: 16upx;
		font-size: 26upx;
		.dfyc(2);
	}
	.item-bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
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
	.item-options{
		display: flex;
		align-items: center;
		padding: 0 14upx;
		margin-bottom: 20upx;
	}
	.item-option{
		margin-right: 10upx;
		padding: 0 10upx;
		border: 1upx @color solid;
		border-radius: 20upx;
		line-height: 42upx;
		height: 40upx;
		color: @color;
		font-size: 24upx;
	}
</style>
