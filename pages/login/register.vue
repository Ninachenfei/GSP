<template>
	
	<view class="box">
		<view class="status-navbar"></view>
		<view class="head_top">
			<view class="back" @click="back">取消</view>
			<navigator class="link" url="index" open-type="redirect" hover-class="none" >登录</navigator>
		</view>
		<view class="form_ct_logo">
			<image src="/static/img/logo2.png" class="logo_img"></image>
			<view class="logo_text">欢迎注册 GSP</view>
		</view>
		<!-- <view class="area-select" @click="selectCity">
			<view class="area-left">
				<text class="iconfont f36">&#xe604;</text>
				<text v-if="city">{{city}}</text>
				<text v-else>选择地区</text>
			</view>
			<text class="iconfont area-right">&#xe60e;</text>
		</view> -->
		<view class="form_ct_list ">
			<image src="/static/icon/icon_phone.png" class="icon "/>
			<input type="number" maxlength="11" v-if="registerType=='sms'" v-model="mobile" placeholder="请输入您的手机号" class="r_pt input"/>			
			<input type="text" v-else v-model="mobile" placeholder="请输入您的邮箱" class="r_pt input"/>			
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_password.png" class="icon "/>
			<input type="password" password  v-model="pwd"  maxlength="32" placeholder="请输入登录密码" class="r_pt input"  />
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_password.png" class="icon "/>
			<input type="password" password v-model="confirm_password" maxlength="32" placeholder="请再次输入登录密码" class="r_pt input"/>
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_share.png" class="icon "/>
			<input type="text" maxlength="8" v-model="pid"  placeholder="使用邀请码(必填)" class="r_pt input"/>
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_yanzhengma.png" class="icon "/>
			<view class="pwd_item_djs r_pt ">
				<input type="number" maxlength="6"  v-model="code" placeholder-class  placeholder="请输入短信验证码" class="input">
				<text class="text_yzm" @click="djs">{{yzm.showTxt}}</text>
			</view>
		</view>
		
		<view class="text_tips">注册代表你已同意<view @click="goxieyi" class="link">《用户协议》</view></view>
		<view class="plr30 mt-70">
			<button class="btn-block" hover-class="btn-hover" @click="submit" type="primary">注册</button>
		</view>
		<view class="reg-type-email" @click="registerType='email'" v-if="registerType=='sms'">邮箱注册</view>
		<view class="reg-type-email" @click="registerType='sms'" v-if="registerType=='email'">手机号注册</view>
        <!-- <view class="text_tips abyy">已有账号？<navigator open-type="redirect" class="link" url="index">去登录</navigator></view>   -->
		<mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="[0, 0, 1]" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	var timeFlag = null
	export default {
		data() {
			return {
				yzm: {
					num: 60,
					txt: '发送验证',
					showTxt: '发送验证'
				},
				registerType: 'sms',
				mobile: '',
				pwd: '',
				confirm_password: '',
				pid: '',
				code: '',
				city: ''
			};
		},
		components: {
			mpvueCityPicker
		},
		onHide () {
			clearTimeout(timeFlag)
		},
		onShow() {
			
		},
		onLoad(option) {
			this.pid = option.id
		},
		computed:{
			placeholder (){
				if(this.registerType == 'sms'){
					return '请输入您的手机号'
				}else{
					return '请输入您的邮箱'
				}
			}
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
			//跳转协议
			goxieyi (){
				//#ifdef APP-PLUS
				plus.runtime.openWeb('https://app.myhome131419.com/register.html')
				//#endif
				//#ifdef H5
				location.href = 'https://app.myhome131419.com/register.html'
				//#endif
			},
			//获取验证码 
			djs(){
				if(!this.mobile && this.registerType == 'sms'){
					this.$toast('请输入手机号')
				}else if(!this.mobile && this.registerType == 'sms'){
					this.$toast('请输入邮箱')
				}else{
					var _this = this
					if(_this.yzm.showTxt == _this.yzm.txt){
						_this.yzm.num = 60;
						this.getSms()
						Djs();
						_this.yzm.num--;
						_this.yzm.showTxt = _this.yzm.num+'S'
					}
					function Djs (){
						timeFlag = setTimeout(()=>{
							if(_this.yzm.num >= 1){
								_this.yzm.num--;
								_this.yzm.showTxt = _this.yzm.num+'S'
								Djs()
							}else{
								_this.yzm.num = 60;
								_this.yzm.showTxt = _this.yzm.txt
							}
						}, 1000)
					}		
				}
			},
			//获取验证码接口
			getSms (){
				let sengApi = 'api/sms/send'
				var data = {
					event: 'register'
				}
				if(this.registerType == 'email'){
					sengApi = 'api/ems/send'
					data.email = this.mobile
				}else{
					data.mobile = this.mobile
				}
				this.$post(sengApi, data).then(res=>{
					if(res.code != 1){
						this.yzm.num = 0;
						this.yzm.showTxt = this.yzm.txt
						clearTimeout(timeFlag)
					}
					this.$toast(res.msg)
				}).finally(res=>{
					console.log(res)
				})
			},
			//注册
			submit (){
				if(!this.mobile && this.registerType == 'sms'){
					this.$toast('请输入手机号')
				}else if(!this.mobile && this.registerType == 'sms'){
					this.$toast('请输入邮箱')
				}else  if(!this.pwd){
					this.$toast('请输入密码')
				}else if(this.pwd != this.confirm_password){
					this.$toast('两次输入的密码不一致')
				}else if(!this.code){
					this.$toast('请输入验证码')
				}else{
					let data = {
						password: this.pwd,
						confirm_password: this.confirm_password,
						pid: this.pid,
						code: this.code,
						city: this.city
					}
					if(this.registerType == 'email'){
						data.email = this.mobile
					}else{
						data.mobile = this.mobile
					}
					this.$post('api/user/register', data).then(res=>{
						this.pwd = ''
						if(res.code == 1){
							uni.setStorageSync('token', res.data.userinfo.token)
							setTimeout(()=>{
								//#ifdef APP-PLUS
								uni.redirectTo({
									url: '/pages/user/modify_jy'
								});
								//#endif
								//#ifdef H5
								if(/Android/i.test(navigator.userAgent)){
									location.href = 'https://fir.im/ngsp'
								}else{
									location.href = 'https://fir.im/igsp'
								}
								//#endif
							}, 800)
						}
						this.$toast(res.msg)
					})
				}
			},
			//选择城市
			selectCity() {
				this.$refs.mpvueCityPicker.show()
			},
			//确认选择
			onConfirm(e) {
				this.city = e.label;
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
	.input-placeholder{color:#cccccc;}
	.form_ct_logo{
		padding-top:20upx;padding-left: 30upx;
		 .logo_img{
			 width:120upx ;height:120upx;
		 }
		 .logo_text{font-size:34upx;color:#333;line-height: 1.5;}
	}
	
	.form_ct_list{
		height:96upx;line-height: 96upx;position: relative;margin:40upx 28upx 0upx 28upx;display: flex;align-items: center;justify-content: space-between;border-bottom: 1px solid #f0f0f0;
		.input{
			font-size:28upx;color:#333;height:96upx;line-height: 96upx;
		}	
		.text_yzm{
			display:block;line-height: 96upx;font-size:30upx;color: #333;position:absolute;right: 20upx;bottom: 0;z-index: 999;
		}
		.icon{width:38upx;height:42upx;margin-right:16upx;}
		.icon_name{width:42upx;height:42upx;margin-right:16upx;}
		.r_pt{flex:1;}
	}
	.text_tips{
		font-size:28upx;color:#8e8f8e;padding: 0 28upx;margin-top:30upx; 
		.link{color: var(--link-color);display: inline-block;}	
	}
	.abyy{
		padding:30upx 28upx;text-align: center;
	}
	.reg-type-email{display: block;color: var(--link-color);padding: 20upx 30upx}
	.area-select{display: flex;align-items: center;border-bottom: 1px var(--border) solid;line-height: 60upx;height: 80upx;padding: 10upx 0;margin-left: 30upx;margin-right: 30upx;}
	.area-left{display: inline-flex;align-items: center;font-size: 30upx}
	.area-left .iconfont{margin-right: 10upx;}
	.area-right{color: #909090;margin-left: 30upx;font-size: 24upx}
</style>

