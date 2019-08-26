<template>
	<view>		
		<view class="uni-fixed-status-bar" :style="{ height: statusBarHeight }">
			<slot></slot>
		</view>
		<view class="uni-status-bar" :style="{ height: statusBarHeight }">
		</view>
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		name: 'uni-status-bar',
		data() {
			return {
				statusBarHeight: statusBarHeight
			};
		}
	};
</script>

<style scoped>
	.uni-status-bar {
		width: 100%;
		height: 20px;
		height: var(--status-bar-height);
	}
	.uni-fixed-status-bar {
		width: 100%;
		height: 20px;
		height: var(--status-bar-height);
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 999;
	}
</style>