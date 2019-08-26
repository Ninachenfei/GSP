<template>
	<view>
		<view
			class="status-navbar-fixed"
			:style="{
				background: 'linear-gradient(to right,' + leftColor + ',' + rightColor + ')'
			}"
		></view>
		<view
			class="nav-header"
			:style="{
				background: 'linear-gradient(to right,' + leftColor + ',' + rightColor + ')'
			}"
		>
			<!-- 返回箭头 -->
			<view class="header-l" @click="handleGoBack">
				<text class="iconfont">&#xe675;</text>
			</view>
			<!-- 中间内容 -->
			<view class="nav-title"><slot name="center"></slot></view>
			<!-- 右边内容 -->
			<view class="header-r"><slot name="right"></slot></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		leftColor: {
			type: String,
			default: '#fff'
		},
		rightColor: {
			type: String,
			default: '#fff'
		}
	},
	data() {
		return {};
	},
	created() {},
	methods: {
		handleGoBack() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.status-navbar-fixed {
	position: fixed;
	top: 0;
	z-index: 99999;
	height: var(--status-bar-height);
	width: 100%;
}
.nav-title {
	font-size: 34upx;
	font-weight: 600;
}
.nav-header {
	height: 88upx;
	width: 100%;
	position: fixed;
	top: var(--status-bar-height);
	padding-left: 15upx;
	padding-right: 15upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 999;
}
.header-r,
.header-l {
	width: 60upx;
	height: 60upx;
	text-align: center;
	font-size: 32upx;
	color: #333333;
	line-height: 60upx;
}
</style>
