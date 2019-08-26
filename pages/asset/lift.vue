<template>
	<view class="box">
		<view class="form_swap">
			<view class="title">提币地址</view>
			<view class="list">
				<input class="input" v-model="address" :placeholder="'请输入'+id+'提币地址'" />
				<view class="all iconfont" @click="saoma">&#xe673;</view>
			</view>
			
			<view class="title">提币数量</view>
			<view class="list">
				<input class="input" v-model="num" placeholder="最小提币数量0.01"/>
				<view class="all">{{id}}</view>
			</view>
			<view class="tips">
				
				 <view class="fee" v-if="id=='GSP'">{{config.mh_withdraw_fee_amount}}GSP手续费</view>
				 <view class="fee" v-else>{{config.withdraw_fee}}%手续费</view>
				 <view class="red" v-if="id=='GSP'">可用{{userInfo.mh}}GSP</view>
				 <view class="red" v-else-if="id=='E-Token'">可用{{userInfo.etoken}}E-Token</view>
			</view>
			<view class="title">交易密码</view>
			<view class="list">
				<input class="input" v-model="t_password" placeholder="请输入交易密码"/>
			</view>
			<view class="title">短信验证码</view>
			<view class="list">
				<input class="input" v-model="code" placeholder="请输入6位验证码"/>
				<view class="all yzm" @click="djs">{{yzm.showTxt}}</view>
			</view>
			<view class="explain">
				<view>提现说明：</view>
				<view>1、站内账户间转账提现无需网络确认和手续费，可以实时到账。</view>
				<view>2、24小时内站外提现金额较大的提币需要人工审核。</view>
			</view>
			<view class="mt-20">
				<button class="btn-block" @click="submit" hover-class="btn-hover" type="primary">立即提币</button>
			</view>
		</view>
	</view>
</template>
<script>
	var timeFlag = null
	export default {
		data() {
			return {
				code: '',
				t_password: '',
				num: '',
				address: '',
				mobile: '',
				config: {},
				id: '',
				registerType: '',
				userInfo: {},
				yzm: {
					num: 60,
					txt: '发送验证',
					showTxt: '发送验证'
				},
			};
		},
		onHide() {
			clearTimeout(timeFlag)
		},
		onLoad(e) {
			this.id = e.id
			this.getUserInfo()
			this.getConfig()
		},
		methods: {	
			//获取配置
			getConfig (){
				this.config = uni.getStorageSync('config') || {}
				this.$post('api/config').then(res=>{
					if(res.code == 1){
						this.config = res.data
						uni.setStorageSync('config', res.data)
					}
				})
			},
			//申请提币
			submit (){
				if(!this.address){
					this.$toast('请输入提币地址')
				}else if(!this.num){
					this.$toast('请输入提币数量')
				}else if(!this.t_password){
					this.$toast('请输入交易密码')
				}else if(!this.code){
					this.$toast('请输入短信验证码')
				}else{
					var data = {
						num: this.num,
						address: this.address,
						t_password: this.t_password,
						code: this.code
					}
					if(this.id == 'GSP'){
						data.coin = 'gsp'
					}else {
						data.coin = 'etoken'
					}
					this.$post('api/funds/withdraw', data).then(res=>{
						if(res.code == 1){
							setTimeout(uni.navigateBack, 800, {delta: 1})
						}
						this.$toast(res.msg)
					})
					this.t_password = ''
				}
			},
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
			//点击扫一扫
			saoma(){
				// #ifdef APP-PLUS
				uni.scanCode({
					scanType:['qrCode'],//只能扫二维码
					success: (res)=> {
						this.address = res.result
					}
				});
				// #endif
				// #ifdef H5
				uni.showToast({
					icon: 'none',
					title: 'H5暂不支持扫码！'
				})
				// #endif
				
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
					event: 'withdraw'
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
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	.box{
		padding:0 30upx;border-top:10upx solid #f7f7f7;
	}
	.form_swap{
		font-size:28upx;
		.title{
			color:var(--txt-color);line-height:1.5;margin-top:30upx;
		}
		.tips{
			display: flex;align-items: center;justify-content: space-between;padding-top:10upx;
		}
		.list{
			display: flex;align-items: center;justify-content: space-between;height:66upx;border-bottom:1upx solid #ececec;
			.input{
				flex:1;
			}		
		}
		.all{
			color:var(--txt-color);
		}
		.red{
			font-size:24upx;color:#ff4958;
		}
		.fee{
			font-size:24upx;color:#4f6be4;
		}
		.yzm{
			font-size:28upx;color:#4f6be4;
		}
		.explain{
			font-size:24upx;color:var(--txt-gray-color);line-height: 1.8;padding:30upx 0 100upx 0;
		}
	}
</style>