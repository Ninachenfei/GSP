<!-- 本页面本应在配置里面，此处为了演示可以顺利跳转 -->
<template>
	<view>
	<view style="height: 100upx;display: block;width: 750upx;" v-if="index != 1"></view>
	<view class="footer">
		<navigator url="../index/index" class="footer-item" :class="{active: index===0}">
			<image src="/static/img/shop/footer/home-1.png" mode="aspectFit" v-if="index==0"></image>
			<image src="/static/img/shop/footer/home-0.png" mode="aspectFit" v-else></image>
			<text>首页</text>
		</navigator>
		<navigator url="../index/classify" class="footer-item" :class="{active: index===1}">
			<image src="/static/img/shop/footer/class-1.png" mode="aspectFit" v-if="index==1"></image>
			<image src="/static/img/shop/footer/class-0.png" mode="aspectFit" v-else></image>
			<text>分类</text>
		</navigator>
		<navigator url="../order/shopcar" class="footer-item" :class="{active: index===2}">
			<image src="/static/img/shop/footer/shop-1.png" mode="aspectFit" v-if="index==2"></image>
			<image src="/static/img/shop/footer/shop-0.png" mode="aspectFit" v-else></image>
			<text>购物车</text>
		</navigator>
		<navigator url="../user/index" class="footer-item" :class="{active: index===3}">
			<image src="/static/img/shop/footer/user-1.png" mode="aspectFit" v-if="index==3"></image>
			<image src="/static/img/shop/footer/user-0.png" mode="aspectFit" v-else></image>
			<text>个人中心</text>
		</navigator>
	</view>
	</view>
</template>

<script>
	export default{
		props: {
			index: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style scoped lang="less">
	@color: #fe6f07;
	@price: #f33c1e;
	.footer{display: flex;position: fixed;z-index: 100;width: 100%;bottom: 0;left: 0;height: 100upx;background: #fff;border-top: 1upx #f2f2f2 solid;}
	.footer-item{
		flex: 1;padding: 15upx 0;text-align: center;font-size: 26upx;color: #909090;
		&.active{color: @color}
		image{width: 40upx;height: 40upx;display: block;margin: 0 auto;}
		text{line-height: 30upx;}
	}
</style>
