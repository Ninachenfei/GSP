<template>
	<view class="box">
		<view class="status-navbar"></view>
		<view class="head_top">
			<view class="back" @click="back">取消</view>
			<navigator class="link" url="register"  open-type="redirect" hover-class="none" >注册</navigator>
		</view>
		<view class="form_ct_logo">
			<image src="/static/img/logo2.png" class="logo_img"></image>
			<view class="logo_text">欢迎登录 GSP</view>
		</view>
		
		<view class="form_ct_list ">
			<image src="/static/icon/icon_phone.png" class="icon "/>
			<input type="text" v-model="mobile" placeholder="请输入您的手机号或邮箱" class="r_pt input"/>		
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_password.png" class="icon "/>
			<input password  v-model="pwd"  maxlength="32" placeholder="请输入登录密码" class="r_pt input"  />
		</view>
		<view class="plr30 mt-100 mb-10">
			<button class="btn-block" hover-class="btn-hover" @click="submit" type="primary">登录</button>
		</view>
		<view class="rt"><navigator open-type="redirect" class="link" url="forget">忘记密码</navigator></view>
        <!-- <view class="text_tips abyy">没有账号？<navigator  open-type="redirect" class="link" url="register">去注册</navigator></view>   -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				pwd: '',
			};
		},
		mounted(){

		},
		onShow() {
			
		},
		onBackPress (){
			uni.switchTab({
				url:'/pages/index/index'
			})
			return true
		},
		methods: {
			back(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			submit (){
				if(!this.mobile){
					this.$toast('请输入手机号')
				}else if(!this.pwd){
					this.$toast('请输入密码')
				}else{
					let data = {
						password: this.pwd,
						mobile: this.mobile
					}
					this.$post('api/user/login', data).then(res=>{
						this.pwd = ''
						if(res.code == 1){
							uni.setStorageSync('token', res.data.userinfo.token)
							setTimeout(()=>{
								uni.switchTab({url: '/pages/index/index'})
							}, 800)
						}
						this.$toast(res.msg)
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.status-navbar{height:var(--status-bar-height);display: block;}
	.head_top{
		background:#fff;display: flex;align-items: center;justify-content: space-between;padding: 25upx;font-size:28upx;line-height:1.5; 
		.back{
			color:var(--txt-gray-color);
		}
		.link{
			color:var(--txt-color);
		}
	}
	.form_ct_logo{
		padding-top:20upx;padding-left: 30upx;
		 .logo_img{
			 width:120upx ;height:120upx;
		 }
		 .logo_text{font-size:34upx;color:#333;line-height: 1.5;}
	}
	.form_ct_list{
		height:96upx;line-height: 96upx;position: relative;margin:40upx 28upx 0upx 28upx;display: flex;align-items: center;justify-content: space-between;border-bottom: 1px solid #f0f0f0;
		.input{font-size:28upx;color:#333;height:96upx;line-height: 96upx;}	
		.icon{width:38upx;height:42upx;margin-right:16upx;}
		.icon_name{width:42upx;height:42upx;margin-right:16upx;}
		.r_pt{flex:1;}
	}
	.location_btn{position: absolute;bottom: 100upx;left:0;width:100%;}
	
	.text_tips{font-size:28upx;color:#8e8f8e;padding: 0 28upx;margin-top:30upx; 
		.link{color: var(--link-color);display: inline-block;}			
	}
	.rt{font-size:28upx;color: var(--link-color);padding: 0 28upx;margin-top:20upx;text-align: right;}
	.abyy{
		padding:30upx 28upx;text-align: center;
	}
</style>

