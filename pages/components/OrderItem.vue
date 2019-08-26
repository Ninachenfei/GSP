<template>
	<navigator :url="goPage" class="order-item">
		<view class="order-top" v-if="data && data.image">
			<image class="order-left" :src="data.image" mode="aspectFill"></image>
			<view class="order-center">{{data.title}}</view>
			<view class="order-right">
				<text class="price">￥{{data.price}}</text>
				<text class="num" v-if="data.num">*{{data.num}}</text>
			</view>
		</view>
		<!-- <view class="order-botom">
			<text>深空灰色</text>
			<text>无线网络</text>
			<text>256GB</text>
		</view> -->
	</navigator>
</template>

<script>
	export default {
		props: {
			goPage: {
				type: String,
				default: '../index/detail'
			},
			data: {
				type: Object
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
	@color: #fe6f07;
	@price: #f33c1e;
	.dfyc(@line:3){
		text-decoration: none; 
		text-overflow: -o-ellipsis-lastline; 
		overflow: hidden; 
		text-overflow: ellipsis; 
		display: -webkit-box; 
		-webkit-line-clamp: @line; 
		-webkit-box-orient: vertical;  
		vertical-align: top;
	}
	.order-item{background-color: #fff;padding-top: 20upx;;padding-left: 30upx;padding-right: 30upx;margin-bottom: 20upx;border-bottom: 1upx var(--border) solid;padding-bottom: 20upx;}
	.order-top{display: flex;overflow: hidden;}
	.order-left{width: 120upx;height: 120upx;border-radius: 6upx;}
	.order-center{padding-left: 20upx;flex: 1;font-size: 26upx;line-height: 40upx;.dfyc(3);height: 120upx;}
	.order-right{width: 150upx;text-align: right;font-size: 28upx}
	.price{color: @price;display: block;}
	.num{color: var(--txt-gray-color);display: block;}
	.order-botom{
		display: block;
		margin-top: 10upx;
		text{
			font-size: 26upx;color: #323232;background: #eee;border-radius: 6upx;padding: 6upx 16upx;margin-right: 10upx;
		}
	}
</style>
