<template>
	<view class="apply-page">
		<!-- 顶部轮播图 -->
		<image class="asset-item-img" src="/static/img/apply-banner.png" lazy-load mode="aspectFill"></image>
		<view class="apply-item">
			<view class="apply-subtitle">代理类型</view>
			<view class="apply-input" @click="selectLevel">
				<text class="apply-input-item">{{currentLevel.name}}</text>
				<text class="iconfont f24">&#xe60e;</text>
			</view>
		</view>
		<view class="apply-item">
			<view class="apply-subtitle">扣除积分</view>
			<view class="apply-input">
				<text class="apply-input-item">{{currentLevel.amount}}</text>
			</view>
			<view class="apply-input-tip">可用积分 {{userInfo.cp}}</view>
		</view>
		<view class="apply-item">
			<view class="apply-subtitle">交易密码</view>
			<view class="apply-input">
				<input type="password" v-model="pwd" placeholder="请输入交易密码" class="apply-input-item">
			</view>
		</view>
		<view class="plr30">
			<button class="btn-block mt-100" hover-class="btn-hover" @click="submit">申请</button>
			<view class="apply-tip">创业者申请成功通过后 可免费获得一件平台商品</view>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				userInfo: {},
				levelIndex: 0,
				banners: [],
				pwd: '',
				level: [{name: '创业者'}],
				config: {}
			}
		},
		computed: {
			currentLevel (){
				return this.level[this.levelIndex]
			}
		},
		created() {
			this.getbanner()
			this.getUserInfo()
			this.getConfig()
		},
		methods: {
			//获取配置
			getConfig (){
				this.config = uni.getStorageSync('config') || {}
				if(this.config && this.config.proxy){
					this.level = this.config.proxy
				}
				this.$post('api/config').then(res=>{
					if(res.code == 1){
						this.config = res.data
						this.level = res.data.proxy
						uni.setStorageSync('config', res.data)
					}
				})
			},
			//获取轮播图
			getbanner (){
				this.banners = uni.getStorageSync('carouselmap') || []
				this.$post('api/carouselmap', {type: 3}).then(res=>{
					if(res.code == 1){
						uni.setStorageSync('carouselmap', res.data)
						this.banners = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//获取用户信息
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
			//提交
			submit (){
				var level = parseInt(this.levelIndex) + 1
				if(!this.pwd){
					this.$toast('请输入交易密码')
					return false
				}
				this.$post('api/user/proxy', {
					level,
					t_password: this.pwd
				}).then(res=>{
					if(res.code == 1){
						setTimeout(uni.navigateBack, 800, {delta: 1})
					}else if(res.msg == '请先完成实名认证'){
						setTimeout(uni.navigateTo, 800, {url: 'real'})
					}
					this.$toast(res.msg)
				})
				this.pwd = '';
			},
			selectLevel (){
				var arr = []
				this.level.forEach(item=>{
					arr.push(item.name)
				})
				uni.showActionSheet({
					itemList: arr,
					success: (e)=>{
						this.levelIndex = e.tapIndex
					}
				})
			}
		}
	}
</script>


<style>
</style>
