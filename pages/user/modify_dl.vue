<template>
	<view class="box">
		  <view class="add_pay">
			 <text class="title">旧密码</text>
			 <input password  placeholder-class="placeholder2" v-model="old_password" placeholder="请输入登录密码" class="input"/>
			 <text class="title">新密码</text>
			 <input password  placeholder-class="placeholder2" v-model="confirm_password" placeholder="请输入新密码"  class="input"/>
			  <text class="title">确认新密码</text>
			  <input password  placeholder-class="placeholder2" v-model="password" placeholder="请再次输入新密码"  class="input"/>
		  </view>
	       <view class="location_btn plr30 mt-100"><button class="btn-block" hover-class="btn-hover" @click="submit">修改</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_password: '',
				confirm_password: '',
				password: '',
			};
		},
		mounted(){
		},
		onShow() {
		},
		computed:{

		},
		methods: {
			submit (){
				if(!this.old_password){
					this.$toast('请输入旧密码')
				}else if(!this.password){
					this.$toast('请输入新密码')
				}else if(this.confirm_password != this.password){
					this.$toast('两次输入密码不一致')
				}else{
					this.$post('api/user/changepwd', {
						old_password: this.old_password,
						password: this.password,
						confirm_password: this.confirm_password,
					}).then(res=>{
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

