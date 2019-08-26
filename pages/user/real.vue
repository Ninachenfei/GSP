<template>
	<view class="box">
		<view class="mode">
			 <view class="list">
				 <view class="title">姓名</view>
				 <input placeholder="请输入您的真实姓名" maxlength="10" v-model="name" class="input" />
			 </view>
			 <view class="list">
				 <view class="title">证件号</view>
				 <input placeholder="请输入您的身份证号或护照号" maxlength="20" v-model="num" class="input" />
			 </view>
			 <view class="list_zj" @click="chooseAlipayImg('img_zm')">
				 <view class="title">证件照</view>
				 <view class="paper" v-if="!img_zm">
					 <view class="iconfont">&#xe602;</view>
					 <view class="tips">请添加手持身份证正面照片或护照信息页</view>
				 </view> 
				 <image class="img" mode="aspectFill" :src="img_zm"  v-if="img_zm"></image>
			 </view>
			 <view class="list_zj"  @click="chooseAlipayImg('img_fm')">
				 <view class="title">证件照反面</view>
				 <view class="paper" v-if="!img_fm">
					 <view class="iconfont">&#xe602;</view>
					 <view class="tips">请添加手持身份证反面照片或护照信息页</view>
				 </view> 
				 <image class="img" mode="aspectFill" :src="img_fm" v-if="img_fm"></image>
			 </view>
			 <view class="mt-100">
			 	<button class="btn-block disabled" v-if="userInfo.verified == 1" hover-class="btn-hover" type="primary">已认证</button>
			 	<button class="btn-block disabled" v-else-if="userInfo.verified == 2" hover-class="btn-hover" type="primary">审核中</button>
			 	<button class="btn-block" v-else hover-class="btn-hover" type="primary" @click="submit">保存</button>
			 </view>
		</view>			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img_zm:'',//正面图片
				img_fm:'',//反面图片
				name: '',
				num: '',
				userInfo: {}
			};
		},
		created (){
			this.getUserInfo()
		},
		methods: {	
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
				if(!this.name){
					this.$toast('请输入真实姓名')
				}else if(!this.num){
					this.$toast('请输入证件号')
				}else if(!this.img_zm){
					this.$toast('请上传身份证正面')
				}else if(!this.img_fm){
					this.$toast('请上传身份证反面')
				}else{
					uni.showLoading({
						mask:true,
						title:'提交中...'
					})
					setTimeout(uni.hideLoading, 10000)
					uni.uploadFile({
						url: this.$domain+'api/user/verified',
						files: [{
							name: 'front_photo',
							uri: this.img_zm
						},{
							name: 'reverse_photo',
							uri: this.img_fm
						},{
							name: 'hand_held',
							uri: this.img_fm
						}],
						formData: {
							token: uni.getStorageSync('token'),
							actual_name: this.name,
							identification_number: this.num,
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
				}
			},
			chooseAlipayImg (type){
				this.$uploadImage((res)=>{
					this[type] = res
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	.mode{
		padding: 30upx;border-top:10upx solid #f7f7f7;
		.list{
			display: flex;align-items: center;justify-content: space-between;height:110upx;border-bottom:1px solid #ececec;font-size:30upx;color:var(--txt-color);
			.title{min-width:30%;}
			.input{
				flex:1;
			}
			.iconfont{font-size:60upx;}
		}
		.list_zj{
			display: flex;font-size:30upx;color:var(--txt-color);margin-top:36upx;
			.title{min-width:30%;}
			.paper{
				width:380upx;background:#eaecf3;padding:40upx 50upx;text-align:center;
				.iconfont{
					font-size:60upx;color:#bdc4e3;
				}
				.tips{
					font-size:24upx;color:#bdc4e3;line-height:1.6;margin-top:20upx;
				}
			}
			.img{
				width:380upx;height:230upx;
			}
		}
	}
	
	
</style>

