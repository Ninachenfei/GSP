<template>
	<view class="business-page h100">
		<view class="business-wrap">
			<view class="business-top">
				<input type="text" placeholder="店铺名称" v-model="store_name" class="business-input">
				<textarea placeholder="主营行业" v-model="store_introduction"  class="business-textarea" />
				<textarea placeholder="店铺简介" v-model="major_business"  class="business-textarea" />
			</view>
			<view class="business-item">
				<text class="business-item-left">店铺标志</text>
				<image :src="logo" v-if="logo" @click="chooseAlipayImg('logo')" mode="aspectFill" class="business-item-img"></image>
				<image src="/static/icon/icon_addpic.png" v-else @click="chooseAlipayImg('logo')" mode="aspectFill" class="business-item-img"></image>
				
			</view>
			<view class="business-item">
				<text class="business-item-left">营业执照</text>
				<image :src="licens" v-if="licens" @click="chooseAlipayImg('licens')" mode="aspectFill" class="business-item-img"></image>
				<image src="/static/icon/icon_addpic.png" v-else @click="chooseAlipayImg('licens')" mode="aspectFill" class="business-item-img"></image>
			</view>
			<!-- <view class="business-item">
				<text class="business-item-left">数量</text>
				<view class="business-item-right">
					<input type="number" :value="config.business_apply_money" disabled>
					<text>MH</text>
				</view>
			</view> -->
			<view class="business-item">
				<text class="business-item-left">交易密码</text>
				<view class="business-item-right">
					<input type="password" v-model="password" placeholder="请输入交易密码"/>
				</view>
			</view>
		</view>
		<view class="plr30">
			<button class="btn-block" hover-class="btn-hover" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data (){
			return {
				store_name: '',
				store_introduction: '',
				major_business: '',
				logo: '',
				licens: '',
				password: '',
				config: {},
			}
		},
		created() {
			this.getConfig()
		},
		methods: {
			submit (){
				if(!this.store_name){
					this.$toast('请输入店铺名称')
				}else if(!this.store_introduction){
					this.$toast('请输入店铺主营行业')
				}else if(!this.major_business){
					this.$toast('请输入店铺简介')
				}else if(!this.logo){
					this.$toast('请上传店铺logo')
				}else if(!this.licens){
					this.$toast('请上传店铺营业执照')
				}else if(!this.password){
					this.$toast('请交易密码')
				}else{
					uni.showLoading({
						title:'正在上传'
					})
					setTimeout(uni.hideLoading, 15000)
					uni.uploadFile({
						url: this.$domain+'api/shop/business/apply',
						files: [{
							name: 'logo',
							uri: this.logo
						},{
							name: 'licens',
							uri: this.licens
						}],
						formData: {
							token: uni.getStorageSync('token'),
							store_name: this.store_name,
							store_introduction: this.store_introduction,
							major_business: this.major_business,
							password: this.password
						},
						success: (res) => {
							var res = JSON.parse(res.data)
							if(res.code == 1){
								uni.navigateBack({delta: 1})
							}
							this.$toast(res.msg)
						},
						complete() {
							uni.hideLoading()
						}
					});
					this.password = ''
				}
			},
			chooseAlipayImg (type){
				this.$uploadImage((res)=>{
					this[type] = res
				})
			},
			//获取配置
			getConfig (){
				this.config = uni.getStorageSync('config') || {}
				this.$post('api/config').then(res=>{
					if(res.code == 1){
						this.config = res.data
						uni.setStorageSync('config', res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>