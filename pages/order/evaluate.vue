<template>
	<view class="evaluate">
		<view class="input-wrap">
			<textarea type="text" v-model="inputTxt" class="input" placeholder="宝贝满足你的期待吗？说说你的使用感想，分享给想要购买的他们吧~"></textarea>
		</view>
		<view class="plr30">
			<button class="btn-block mt-100" @click="submit">发布</button>
		</view>
	</view>
</template>

<script>
	export default{
		data (){
			return {
				inputTxt: '',
				id: ''
			}
		},
		onLoad (e){
			this.id =e.id
		},
		methods: {
			submit (){
				if(!this.inputTxt){
					this.$toast('请输入评价内容')
					return false
				}
				uni.showLoading()
				setTimeout(uni.hideLoading, 5000)
				this.$post('api/shop/order/evaluation', {
					content: this.inputTxt,
					id: this.id,
					star: 5,
					anonymous: false
				}).then(res=>{
					uni.hideLoading()
					if(res.code == 1){
						uni.navigateBack()
					}
					this.$toast(res.msg)
				})
			}
		}
	}
</script>

<style scoped>
	.evaluate{border-top: 10upx var(--body-bg) solid;}
	.input-wrap{padding: 40upx 20upx;}
	.input{display: block; width: 100%;height: 300upx;border: 1upx var(--border) solid;border-radius: 8upx;padding: 16upx 10upx;}
</style>
