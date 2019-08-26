<template>
	<view class="box">
		  <view class="add_pay">
		   			 <text class="title">标题</text>
		   			 <input  placeholder="请输入您要反馈的问题" v-model="title" class="input" />
		   			 <text class="title">反馈内容</text>
		  			 <textarea  class="text_wz" v-model="content" placeholder="请输入你要反馈的内容和建议..." />
		   </view>
		   
		    <view class="location_btn plr30 mt-60"><button  @click="submit" class="btn-block" hover-class="btn-hover">提交</button></view>
		  <view class="kefu">
			  <image :src="data.wechat_img" class="image"></image>
			  <view class="title">微信号:<text class="text">{{data.wechat_account || '--'}}</text></view>			 
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				data: {}
			};
		},
		created() {
			
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: '/pages/user/dope'
			});
		},
		methods: {
			getServiceInfo (){
				this.$post('api/servicewechat').then(res=>{
					if(res.code == 1){
						this.data = res.data
					}
					this.$toast(res.msg)
				})
			},
			submit (){
				if(!this.title){
					this.$toast('请输入反馈标题！')
				}else if(!this.content){
					this.$toast('请输入反馈内容！')
				}else{
					this.$post('api/user/customerservice', {
						title: this.title,
						content: this.content
					}).then(res=>{
						if(res.code == 1){
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
						}
						this.$toast(res.msg)
					})
				}
			}
		},
		onLoad() {
			
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
			width:auto;font-size:28upx;color:#333;height:200upx;line-height: 60upx;padding:10upx 20upx; background: #f2f2f2;border-radius:10upx; 
		}	
		
	}
	.kefu{
		text-align: center;padding:80upx 0;
		  .image{
			  width:190upx;height: 190upx;
		  }
		  .title{
			  font-size:30upx;color:#cccccc; margin-top:20upx;
			  .text{
				  color: #5075e8;
			  }
		  }
	}
	.login_btn{
		margin: 80upx 28upx 0 28upx;height:80upx;line-height:80upx;background:#5075e8;color:#fff;font-size:30upx;align-content:center;
	}
</style>


