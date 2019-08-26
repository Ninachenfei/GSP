<template>
    <view>
		<view class="pay-item">
			<text>商品价格：{{price}}</text>
		</view>
		<view class="pay-item">
			<text>可用积分: {{userInfo.cp}}</text>
		</view>
		<view class="pay-item-pwd mb-100">
			<text class="pay-item-label">交易密码</text>
			<input class="pay-item-val" type="password" placeholder="请输入交易密码" v-model="pwd" password />
		</view>
		<view class="plr30">
			<button class="btn-block" hover-class="btn-hover" @click="pay">确认支付</button>
		</view>
    </view>
</template>

<script>
    export default {
		data (){
			return {
				price: 0,
				jifen: 0,
				id: '',
				pwd: '',
				userInfo: {}
			}
		},
		onLoad(e) {
			this.price = e.price
			this.id = e.id
		},
		created(){
			this.getUserInfo()
		},
		methods: {
			getUserInfo (){
				this.userInfo = uni.getStorageSync('user_getuserinfo') || {}
				this.$post('api/user/getuserinfo').then(res=>{
					if(res.code == 1){
						this.userInfo = res.data
						uni.setStorageSync('user_getuserinfo', res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			pay (){
				if(!this.id){
					this.$toast('数据加载中...')
				}else if(!this.pwd){
					this.$toast('请输入交易密码')
				}else{
					this.$post('api/shop/order/pay', {
						id: this.id, password: this.pwd
					}).then(res=>{
						if(res.code == 1){
							setTimeout(uni.switchTab, 800, {url: "../index/index"})
						}
						this.$toast(res.msg)
					})
				}
			}
		}
	}
</script>

<style scoped>
	.pay-item{display: block;padding: 30upx;border-bottom: 1px var(--border) solid;font-size: 30upx;line-height: 40upx;}
	.pay-item-pwd{
		display: flex;border-bottom: 1px #f2f2f2 solid;padding: 20upx 30upx;align-items: center;
	}
	.pay-item-label{
		font-size: 30upx;
	}
	.pay-item-val{
		flex: 1;line-height: 50upx;height: 70upx;margin-left: 20upx;
	}
</style>
