<template>
	<view class="box">
		 <view class="status-navbar"></view>
		 <view class="ct_set plr30">
			<view class="title">个人中心</view>
			<navigator url="setting" class="link iconfont" hover-class="none">&#xe60d;</navigator>
		 </view>
		 <view class="plr30">
			 <view class="center">
				<image src="/static/img/shop_user/center_bg.png" class="ct_top_bg"></image>
				<navigator class="ct_top" url="personal" hover-class="none" >
					<view class="img"><image :src="userInfo.avatar" mode="aspectFill" class="touxiang"></image></view>
					<view class="wz">
						<view class="nick_name">{{userInfo.username || '--'}}</view>
						<view class="uid">UID:{{userInfo.id}}</view>
					</view>
				</navigator>
				<view class="user-jifen">
					<!-- <view class="user-top">
						<text class="user-top-label">商城积分</text>
						<text class="user-top-val">{{userInfo.cp}}</text>
					</view> -->
					<view class="user-level">LV.{{userInfo.level}}</view>
				</view>
			 </view>
		</view>
		 <view class="my_order plr30">
			 <view class="my_order_bt">
			 	<view class="my_order_bt_fl">我的订单</view>
				<navigator url="../order/index" class="my_order_bt_fr" hover-class="none">全部订单 <text class="iconfont">&#xe603;</text></navigator>
			 </view>
			 <view class="my_order_list">
				 <navigator url="../order/index?type=1" class="link" hover-class="none">
					 <image src="/static/img/shop_user/daifukuan.png" class="icon_img"></image>
					 <view class="icon_title">待付款</view>
				 </navigator>
				 <navigator url="../order/index?type=2" class="link" hover-class="none">
					 <image src="/static/img/shop_user/daifahuo.png" class="icon_img"></image>
					 <view class="icon_title">待发货</view>
				 </navigator>
				 <navigator url="../order/index?type=3" class="link" hover-class="none">
					 <image src="/static/img/shop_user/daishouhuo.png" class="icon_img"></image>
					 <view class="icon_title">待收货</view>
				 </navigator>
				 <navigator url="../order/await_evaluate" class="link" hover-class="none">
					 <image src="/static/img/shop_user/daipingjia.png" class="icon_img"></image>
					 <view class="icon_title">待评价</view>
				 </navigator>
				 <navigator url="../order/index?type=4" class="link" hover-class="none">
					 <image src="/static/img/shop_user/yiwanchen.png" class="icon_img"></image>
					 <view class="icon_title">已完成</view>
				 </navigator>
			 </view>
		 </view>
		 <view class="my_order tool">
			 <view class="my_order_bt plr30">
				<view class="my_order_bt_fl">必备工具</view>
			 </view>
			 <view class="my_order_list">
				<!-- <navigator url="../user/apply" class="link" hover-class="none">
					 <image src="/static/img/icon-apply.png" class="icon_img"></image>
					 <view class="icon_title">代理申请</view>
				 </navigator> -->
				 <navigator url="../order/all_evaluate" class="link" hover-class="none">
					 <image src="/static/img/shop_user/pingjia.png" class="icon_img"></image>
					 <view class="icon_title">我的评价</view>
				 </navigator>
				 <!-- <navigator url="../asset/jifen_detail" class="link" hover-class="none">
					 <image src="/static/img/icon-jifen.png" class="icon_img"></image>
					 <view class="icon_title">积分记录</view>
				 </navigator> -->
				 <navigator url="security" class="link" hover-class="none">
					 <image src="/static/img/shop_user/anquan.png" class="icon_img"></image>
					 <view class="icon_title">安全设置</view>
				 </navigator>
				 <navigator url="../user/collection" class="link" hover-class="none">
					 <image src="/static/img/shop_user/shoucang.png" class="icon_img"></image>
					 <view class="icon_title">收藏夹</view>
				 </navigator>
				 <navigator url="share" class="link" hover-class="none">
					 <image src="/static/img/shop_user/yaoqing.png" class="icon_img"></image>
					 <view class="icon_title">邀请好友</view>
				 </navigator>
				 <view class="link" hover-class="none" @click="gowallet()">
					<image src="/static/img/logo3.png" class="icon_img"></image>
					<view class="icon_title">我的钱包</view>
				 </view>
				 <navigator url="kefu" class="link" hover-class="none">
					 <image src="/static/img/icon-connact.png" class="icon_img"></image>
					 <view class="icon_title">联系客服</view>
				 </navigator>
			 </view>
		 </view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		computed:{
	
		},
		methods: {
			gowallet (){
				this.$goWallet()
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
			}
		},
		onShow() {
			this.getUserInfo()
		}
	}
</script>

<style lang="less" scoped>
	.ct_set{
		height:88upx;display: flex;align-items: center;justify-content: space-between;padding-top:var(--status-bar-height);
		.link{			
			font-size:40upx;color:var(--txt-gray-color);
		}
		.title{
			font-size:36upx;color:var(--txt-color);
		}
	}
	.center{	
		padding:20upx 30upx 0 30upx;position:relative;
		.ct_top_bg{
			position:absolute;left:0;top:0;width:100%;height:100%;z-index: -1;
		}
		.ct_top{
			display:flex;justify-content:space-between;padding: 30upx 0 0;
			.img{
				width:90upx;height: 90upx;border-radius: 50% 50%;overflow: hidden;display:inline-flex;
			    .touxiang{
					width:100%;height:100%;
				}
			}
			.wz{
				flex:1;margin-left:20upx;
				.nick_name{
					font-size:30upx;color:#fff;line-height: 1.5;
				}
				.uid{
					font-size:24upx;color:#ffc8a0;line-height: 1.5;
				}
			}
		}	
	}
	.my_order{
		border-bottom:12upx solid #f6f6f6;padding-top:10upx;
		&.tool{border-bottom: none;}
		.my_order_bt{
			height: 90upx;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eeeeee;
			.my_order_bt_fl{font-size:28upx;color:var(--txt-color);font-weight: 600;line-height: 70upx;height:90upx;padding-top: 10upx;}
			.my_order_bt_fr{
				font-size:28upx;color:var(--txt-gray-color);
			    .iconfont{
					font-size:20upx;color:var(--txt-gray-color);
				}
			}
		}
		.my_order_list{
			display:flex;align-items:center;padding:50upx 0;
			.link{
				flex:1;text-align:center;
				.icon_img{
					width:60upx;height:60upx;
				}
				.icon_title{
					font-size:24upx;color:var(--txt-color);
				}
			}
		}
	}
	.tool{
		.my_order_list{
			flex-wrap: wrap;
			.link{
				max-width:25%;min-width:25%;padding:0 0 50upx 0;
			}
		}
	}
</style>