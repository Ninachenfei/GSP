<template>
	<view class="box">	
		<view class="gr_top">
			<view class="img"  @click="chooseAlipayImg('img')">
				<image :src="img" mode="aspectFill" v-if="img" class="touxiang"></image>
				<image src="../../static/icon/icon_addpic.png" mode="aspectFill" class="touxiang" v-else></image>
			</view>
		</view>
		<view class="ct_link">
		 	<view class="list">
		 		<view class="link" v-if="userInfo.mobile">手机认证</view>
		 		<view class="link" v-else>邮箱认证</view>
		 		<view class="link_fr"><text class="tips">{{userInfo.mobile || userInfo.email}}</text><text class="iconfont next">&#xe603;</text></view>
		 	</view>
			<view class="list">
				<view class="link">昵称</view>
				<input placeholder="请填写您的昵称" v-model="userInfo.username" class="input"><text class="iconfont next">&#xe603;</text>
			</view>
		</view>
		<view class="plr30">
			<button class="btn-block mt-150" @click="submit" hover-class="btn-hover">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'',//头像预览
				userInfo: {}
			};
		},
		created() {
			this.getUserInfo()
		},
		computed:{
	
		},
		methods: {
			//获取用户信息
			getUserInfo (){
				this.$post('api/user/getuserinfo').then(res=>{
					if(res.code == 1){
						this.userInfo = res.data
						this.img = res.data.avatar
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//提交数据
			submit (){
				if(/^http/.test(this.img)){
					this.$post('api/user/profile',{
						username: this.userInfo.username
					}).then(res=>{
						if(res.code == 1){
							setTimeout(()=>{
								uni.navigateBack({delta: 1})
							}, 800)
						}
						this.$toast(res.msg)
					})
					return false
				}else{
					uni.showLoading({
						mask: true,
						title:'提交中...'
					})
					setTimeout(uni.hideLoading, 5000)
					this.$upload('api/user/profile', this.img, 'avatar', {
						username: this.userInfo.username
					}, (res)=>{
						uni.hideLoading()
						var res = JSON.parse(res.data)
						if(res.code == 1){
							setTimeout(()=>{
								uni.navigateBack({delta: 1})
							}, 800)
						}
						this.$toast(res.msg)
					})
				}
			},
			chooseAlipayImg (){
				this.$uploadImage((img)=>{
					this.img = img
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.gr_top{
	   border-top:10upx solid #f7f7f7;text-align:center;padding:70upx 0;
	   .img{
		   width:130upx;height:130upx;border-radius:50%;overflow: hidden;display:inline-block;
		   .touxiang{width:100%;height:100%;}
	   }
	   .nick{font-size:30upx;color:var(--txt-color);line-height:2;}
	}
	.ct_link{
		padding:0 30upx;
		.list{
			display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #f2f2f2;height:100upx;
		}
		.link{font-size:28upx;color:var(--txt-color);flex: 1;}
		.next{color:var(--txt-gray-color);}
		.tips{font-size:28upx;color:#4f6be4;}
		.input{
			flex: 1;width:100%;text-align: right;font-size:28upx;color:var(--txt-color);
		}
	}
</style>