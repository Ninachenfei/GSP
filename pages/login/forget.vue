<template>
	
	<view class="box">
		<view class="status-navbar"></view>
		<view class="head_top">
			<view class="back" @click="back">取消</view>
			<navigator class="link" url="index"  open-type="redirect" hover-class="none" >登录</navigator>
		</view>
		<view class="form_ct_logo">
			<image src="/static/img/logo2.png" class="logo_img"></image>
			<view class="logo_text">找回密码 GSP</view>
		</view>
		
		<view class="form_ct_list ">
			<image src="/static/icon/icon_phone.png" class="icon "/>
			<input type="text" v-model="mobile" placeholder="请输入您的手机号或者邮箱" class="r_pt input"/>			
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_password.png" class="icon "/>
			<input password v-model="pwd" maxlength="32" placeholder="请输入新密码" class="r_pt input"  />
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_password.png" class="icon "/>
			<input password v-model="confirm_password"  maxlength="32" placeholder="请再次输入新密码" class="r_pt input"/>
		</view>
		<view class="form_ct_list ">
			<image src="/static/icon/icon_yanzhengma.png" class="icon "/>
			<view class="pwd_item_djs r_pt ">
				<input type="number" v-model="code" maxlength="6" placeholder-class  placeholder="请输入短信验证码" class="input">
				<text class="text_yzm" @click="djs">{{yzm.showTxt}}</text>
			</view>
		</view>
		<view class="plr30 mt-100">
			<button class="btn-block" hover-class="btn-hover" @click="submit" type="primary">确认重置</button>
		</view>
		 <view class="text_tips abyy">已有账号？<navigator open-type="redirect" class="link" url="index">去登录</navigator></view>
	</view>
</template>

<script>
	var timeFlag= null
	export default {
		data() {
			return {
				mobile: '',
				pwd: '',
				confirm_password: '',
				code: '',
				yzm: {
					num: 60,
					txt: '发送验证',
					showTxt: '发送验证'
				},
			};
		},
		onBackPress (){
			uni.switchTab({
				url:'/pages/index/index'
			})
			return true
		},
		onLoad(option) {
			this.pid = option.id
		},
		computed:{

		},
		onHide () {
			clearTimeout(timeFlag)
		},
		methods: {
			back(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			//获取验证码接口
			getSms (){
				let sengApi = 'api/sms/send'
				var data = {
					event: 'resetpwd'
				}
				if(this.mobile.match('@')){
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
			submit (){
				if(!this.mobile){
					this.$toast('请输入手机号或者邮箱')
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
						code: this.code,
						account:  this.mobile
					}
					this.$post('api/user/resetpwd', data).then(res=>{
						this.pwd = ''
						if(res.code == 1){
							setTimeout(()=>{
								uni.redirectTo({
									url:'/pages/login/index'
								})
							}, 800)
						}
						this.$toast(res.msg)
					})
				}
			},
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
		padding-left: 30upx;padding-top:20upx;
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
</style>

