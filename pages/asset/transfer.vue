<template>
	<view class="box">
		<view class="form_swap">
			<view class="title">转出账户</view>
			<view class="list">
				<input class="input" v-model="uid" placeholder="请输入转出账户UID" />
			</view>
			
			<view class="title">转出积分</view>
			<view class="list">
				<input class="input" v-model="num" placeholder="最小转出积分10"/>
				<view class="all">积分</view>
			</view>
			<view class="tips">
				 <view class="">可用{{userInfo.cp}}积分</view>
			</view>
			<view class="title">资金密码</view>
			<view class="list">
				<input class="input" v-model="t_password" type="password" placeholder="请输入资金密码"/>
			</view>
			
			<view class="mt-200">
				<view class="fee text-right mb-10">{{config.concvert_fee}}%手续费</view>
				<button class="btn-block" hover-class="btn-hover" @click="submit" type="primary">立即转账</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				yzm: {
					num: 60,
					txt: '发送验证',
					showTxt: '发送验证'
				},
				uid: '',
				num: '',
				t_password: '',
				config: {},
				userInfo: {}
			};
		},
		created(){
			this.getConfig()
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
			//提交
			submit (){
				if(!this.uid){
					this.$toast('请输入转出账户ID')
				}else if(!this.num){
					this.$toast('请输入转出数量')
				}else if (!this.t_password){
					this.$toast('请交易密码')
				}else{
					this.$post('api/user/transfer', {
						to_uid: this.uid,
						num: this.num,
						t_password: this.t_password
					}).then(res=>{
						if(res.code == 1){
							setTimeout(uni.navigateBack, 800, {delta: 1})
						}else if(res.msg == '请先完成实名认证'){
							uni.navigateTo({
								url: '../user/real'
							})
						}
						this.$toast(res.msg)
					})
					this.t_password = ''
				}
			},
			//点击扫一扫
			saoma(){
				// #ifdef APP-PLUS
				uni.scanCode({
					scanType:['qrCode'],//只能扫二维码
					success: function (res) {
						_this.toast('内容：' + res.result);
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
				var _this = this
				if(_this.yzm.showTxt == _this.yzm.txt){
					Djs();
					_this.yzm.num--;
					_this.yzm.showTxt = _this.yzm.num+'S'
				}
				function Djs (){
					setTimeout(()=>{
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
			color:var(--txt-color);margin-top: 50upx;line-height:1.5;
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
	.mt-200{margin-top: 200upx;}
	.text-right{text-align: right;}
</style>