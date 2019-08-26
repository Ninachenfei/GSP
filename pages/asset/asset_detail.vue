<template>
	<view class="box">		
		<view class="cur_top">		
			<view class="cont">
				<view class="cont_ct cont_hd">
					 <view>可用</view>
					 <view>单价(USD)</view>
				</view>
				<view class="cont_ct cont_ft">
					 <view>{{cp}}</view>
					 <view v-if="coin=='GSP'">{{config.mh_price}}</view>
					 <view v-else>{{config.etoken_price}}</view>
				</view>
			</view>
		</view>
		
		<view class="jump">
			<navigator :url="'recharge?id='+coin+'&address='+address"  hover-class="hover" class="list">充值</navigator>
			<navigator :url="'lift?id='+coin" hover-class="hover" class="list">提币</navigator>
			<navigator :url="'swap?id='+coin" hover-class="hover" class="list">兑换</navigator>
		</view>
		
		<view class="cur_cont">
			<view class="title">财务记录</view>
			<view class="list" v-for="(item, index) in list" :key="index">
				<view class="type blue" v-if="item.type == 1 || item.type == 4">{{item.type_str}}</view>
				<view class="type green" v-else-if="item.type == 2">{{item.type_str}}</view>
				<view class="type yellow" v-else-if="item.type == 7">{{item.type_str}}</view>
				<view class="type red" v-else-if="item.type == 9">{{item.type_str}}</view>
				<view class="type blue" v-else>{{item.type_str}}</view>
				<view class="cont">
					<view class="cont_ct cont_hd">
						 <view class="lt">数量</view>
						 <view class="ct">状态</view>
						 <view class="rt">时间</view>
					</view>
					<view class="cont_ct cont_ft">
						 <view class="lt">{{item.money}}</view>
						 <view class="ct">已完成</view>
						 <view class="rt">{{item.createtime}}</view>
					</view>
				</view>	
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
	
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				coin: '',
				list: [],
				page: 1,
				loadStatus: 'more',
				cp: '',
				freeze: '',
				userInfo: {},
				address: ''
			};
		},
		components: {uniLoadMore},
		onLoad(e) {
			this.coin = e.coin
			this.cp = e.cp
			this.freeze = e.freeze
			if(e.coin){
				uni.setNavigationBarTitle({
					title: e.coin
				})
			}
		},
		computed: {
			coinId (){
				var id = 2
				switch (this.coin){
					case 'GSP':
						id = 2;
						break;
					case 'E-Token':
						id = 3;
						break;
					default:
						id = 0;
						break;
				}
				return id
			}
		},
		onShow() {
			this.getAsset()
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
			getUserInfo (){
				this.userInfo = uni.getStorageSync('user_getuserinfo') || {}
				this.$post('api/user/getuserinfo').then(res=>{
					if(res.code == 1){
						if(this.coin == 'GSP'){
							var cp = res.data.mh
							var freeze = res.data.freeze_mh
							var address = res.data.mh_address
						}else{
							var cp = res.data.etoken
							var freeze = res.data.freeze_etoken
							var address = res.data.etoken_address
						}
						this.cp = cp
						this.freeze = freeze
						this.address = address
						uni.setStorageSync('user_getuserinfo', res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			getAsset (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.list = uni.getStorageSync('user_bill') || []
				}
				var data = {
					page: this.page,
					coin_id: this.coinId
				}
				this.$post('api/user/bill', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.data
							uni.setStorageSync('user_bill', res.data.data)
						}else{
							this.list.push(...res.data.data)
						}
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	page{height:100%;}
	.box{
		width:100%;min-height:100%;position: absolute;background-color:#f7f7f7;
	}	
	.cur_top{
		border-top:10upx solid #f7f7f7;
	}
	.cont{
		line-height:1.8;background:#fff;padding:30upx 30upx;
		.cont_ct{
			display: flex;align-items: center;justify-content: space-between;font-size:24upx;
			view{
				flex:1;
			}
		}
		.cont_hd{color:var(--txt-gray-color);}
		.cont_ft{color:var(--txt-color);}
	}
	.cur_cont{
		padding: 30upx;
		.title{
			font-size:30upx;color:var(--txt-color);line-height: 1.5;
		}
		.type{
			font-size:28upx;padding-bottom:8upx;
		}
		.blue{color:#4f6be4;}
		.green{color:#40d8af;}
		.yellow{color:#fa9b1f;}
		.red{color:#ff4958;}
		.list{
			padding:25upx 30upx;background:#fff;margin-top:10upx;border-radius:10upx;
			.cont{
				padding:0;line-height:1.5;
				.ct{text-align:center;}
				.rt{text-align:right;}
			}
		}
	}
	.jump{
		display: flex;padding:30upx 30upx 0 30upx;
		.list{
			flex:1;background: var(--theme-color);color:#fff;font-size:30upx;height:70upx;line-height: 70upx;text-align: center;border-radius: 10upx;
			&:nth-child(2){
				margin:0 10upx;
			}
		}
		.hover{
			background: var(--hover-color);
		}
	}
</style>