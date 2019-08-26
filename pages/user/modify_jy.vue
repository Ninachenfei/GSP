<template>
	<view class="box">
		  <view class="add_pay">
			 <text class="title">交易密码</text>
			 <input password  placeholder-class="placeholder2" v-model="pwd" placeholder="请输入交易密码" class="input"/>
			 <text class="title">确认交易密码</text>
			 <input password  placeholder-class="placeholder2" v-model="confirm_password" placeholder="请再次输入交易密码" class="input" />
			  <text class="title">验证码</text>
			  <view class="position">
			      <input  type="number" placeholder-class="placeholder2" v-model="code" placeholder="请输入验证码" class="input"/>
				  <text class="text_yzm" @click="djs">{{yzm.showTxt}}</text>
			  </view>
		  </view>
	       <view class="location_btn plr30 mt-100"><button class="btn-block" hover-class="btn-hover" @click="submit">修改</button></view>
	</view>
</template>

<script>
	var timeFlag= null
	export default {
		data() {
			return {
				yzm: {
					num: 60,
					txt: '发送验证',
					showTxt: '发送验证'
				},
				userInfo: {},
				code: '',
				pwd: '',
				confirm_password: ''
				
			};
		},
		mounted(){
			
		},
		onHide () {
			clearTimeout(timeFlag)
		},
		created() {
			this.getUserInfo()
		},
		computed:{

		},
		methods: {
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
					event: 'changetpwd'
				}
				if(this.userInfo && this.userInfo.email && this.userInfo.email.match('@')){
					sengApi = 'api/ems/send'
					data.email = this.userInfo.email
				}else{
					data.mobile = this.userInfo.mobile
				}
				this.$post(sengApi, data).then(res=>{
					if(res.code != 1){
						this.yzm.num = 0;
						this.yzm.showTxt = this.yzm.txt
						clearTimeout(timeFlag)
					}
					this.$toast(res.msg)
				})
			},
			//注册
			submit (){
				if(!this.pwd){
					this.$toast('请输入密码')
				}else if(this.pwd != this.confirm_password){
					this.$toast('两次输入的密码不一致')
				}else if(!this.code){
					this.$toast('请输入验证码')
				}else{
					let data = {
						password: this.pwd,
						confirm_password: this.confirm_password,
						code: this.code
					}
					this.$post('api/user/changetpwd', data).then(res=>{
						this.pwd = ''
						if(res.code == 1){
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/user/index'
								})
							}, 800)
						}
						this.$toast(res.msg)
					})
				}
			},
			//获取用户信息
			getUserInfo (){
				this.$post('api/user/getuserinfo').then(res=>{
					if(res.code == 1){
						this.userInfo = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.add_pay{
		border-top:12upx solid #f7f7f7;padding: 28upx;
		.title{
			display:block;font-size:30upx;color:#999;line-height: 2;margin-top: 20upx;
		}
		.input{
			font-size:28upx;color:#333;height:86upx;line-height: 86upx;padding:0 20upx; background: #f2f2f2;border-radius:10upx; 
		}
		.text_wz{
			width:auto;font-size:28upx;color:#333;height:200upx;line-height: 60upx;padding:0 20upx; background: #f2f2f2;border-radius:10upx; 
		}
		.position{
			position: relative;
		    .text_yzm{
		    	display:block;line-height: 86upx;font-size:30upx;color: #333;position:absolute;right: 20upx;bottom: 0;z-index: 999;
		    }
		}	
		
	}
	.login_btn{
		margin: 80upx 28upx 0 28upx;height:80upx;line-height:80upx;background:#5075e8;color:#fff;font-size:30upx;align-content:center;
	}
</style>

