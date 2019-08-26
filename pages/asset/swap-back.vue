<template>
	<view class="box">
		<view class="swap">
			<view class="swap_ct swap_top">
				<view class="tp">从</view>
				<view class="icon_img" @click="toggleType"><image src="/static/img/transition@2x.png" class="icon"></image></view>
				<view class="tp">到</view>
			</view>
			<view class="swap_ct swap_bottom">
				<view class="tp" @click="toggleType">{{type == 2 ? 'GSP' : 'CRB'}}</view>
				<view class="icon_img" @click="toggleType"><image src="/static/img/convert@2x.png" class="icon"></image></view>
				<view class="tp">{{type == 1 ? 'GSP' : 'CRB'}}</view>
			</view>
		</view>
		
		<view class="form_swap">
			<view class="title">兑出数量</view>
			<view class="list">
				<input class="input" v-model="num" v-if="type==2" :placeholder="'请输入GSP数量'" />
				<input class="input" v-model="num" v-else :placeholder="'请输入CRB数量'" />
			</view>
			
			<view class="title" v-if="type==1">CRB</view>
			<view class="title" v-else>GSP</view>
			<view class="list">
				<input class="input" v-if="type==2" :value="jifenNum" placeholder="兑换至CRB数量" disabled/>
				<input class="input" v-else :value="jifenNum" placeholder="兑换至GSP数量" disabled/>
			</view>
			
			<view class="title">资金密码</view>
			<view class="list">
				<input class="input" password type="password" v-model="t_password" placeholder="请输入资金密码"/>
			</view>
			<view class="mt-100">
				<button class="btn-block" @click="submit" hover-class="btn-hover" type="primary">兑换</button>
			</view>
		</view>
		<view class="ratio">
			<navigator hover-class="none" class="link" url="swap_detail">兑换记录</navigator>
			<view class="bili" v-if="type == 2">
				GSP : CRB = 1 : {{config.gsp_crb}}
			</view>
			<view class="bili" v-else>
				CRB : GSP = {{config.gsp_crb}} : 1
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data() {
			return {
				id: '',
				num: '',
				t_password: '',
				userInfo: {},
				config: {},
				type: 2
			};
		},
		onLoad(e){
			this.id = e.id
			this.getUserInfo()
			this.getConfig()
		},
		onNavigationBarButtonTap() {
			this.$goWallet()
		},
		computed:{
			jifenNum (){
				var price = (this.type == 1) ? this.config.hq_crb : this.config.hq_crb
				var s = ''
				if(this.num){
					if(this.type == 1){
						s = parseFloat(this.num) / parseFloat(price)
					}else{
						s = parseFloat(this.num) * parseFloat(price)
					}
					s = Math.round(s * 100) / 100
				}
				return s
			},
			mh_price (){
				if(this.config && this.config.mh_price && this.config.usd){
					var s = parseFloat(this.config.mh_price) * parseFloat(this.config.usd)
					s = Math.round(s * 100) / 100
					return s
				}else{
					return '--'
				}
			},
			etoken_price (){
				if(this.config){
					var s = parseFloat(this.config.etoken_price) * parseFloat(this.config.usd)
					s = Math.round(s * 100) / 100
					return s
				}else{
					return '--'
				}
			}
		},
		methods: {
			gotoall (){
				if(this.type == 2 && this.id == 'GSP'){
					this.num = this.userInfo.mh
				}else if(this.type == 2 && this.id == 'E-Token'){
					this.num = this.userInfo.etoken
				}else if(this.type == 1){
					this.num = this.userInfo.cp
				}
			},
			toggleType (){
				this.type = 3 - parseInt(this.type)
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
			submit (){
				if(!this.num){
					this.$toast('请输入兑换数量')
				}else if(!this.t_password){
					this.$toast('请输入交易密码')
				}else{
					var data = {
						num: this.num,
						type: this.type,
						t_password: this.t_password,
					}
					if(this.type == 1){
						data.type = 2
					}else if(this.type == 2){
						data.type = 1
					}
					this.$post('api/exchange/convert', data).then(res=>{
						if(res.code == 1){
							setTimeout(uni.navigateBack, 800, {delta: 1})
						}
						this.$toast(res.msg)
					})
					this.t_password = ''
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	.box{
		padding: 30upx;border-top:10upx solid #f7f7f7;
	}
	.swap{
		background: #4f6be4;padding:8upx 0;border-radius:10upx;
		.swap_ct{
			display:flex;align-items: center;justify-content: center;text-align: center;padding:0 92upx;
		}
		.swap_top{
			height:64upx;border-bottom:1px solid #6d87f4;
			.tp{
				font-size:24upx;color: #869cf8;flex: 1;
			}
			.icon_img{
				flex:1;padding-bottom: 20upx;
				.icon{
					width:97upx;height:10upx;display: inline-block;
				}
			}
		}
		.swap_bottom{
			height:100upx;
			.tp{
				font-size:36upx;color: #fff;flex: 1;
			}
			.icon_img{
				flex:1;padding-top:10upx;
				.icon{
					width:48upx;height:48upx;display: inline-block;
				}
			}
		}
	}
	.form_swap{
		font-size:28upx;
		.title{
			color:var(--txt-color);line-height:1.5;margin-top:30upx;
		}
		.list{
			display: flex;align-items: center;justify-content: space-between;height:66upx;border-bottom:1upx solid #ececec;
			.input{
				flex:1;
			}
			.all{
				color:var(--txt-color);
			}
		}
		.red{
			font-size:24upx;color:#ff4958;padding-top:8upx;
		}
		.fee{
			font-size:24upx;color:#4f6be4;padding-top:0upx;text-align: right;margin-bottom: 10upx;
		}
	}
	.ratio{
		font-size:24upx;text-align: center;color:var(--txt-gray-color);padding:50upx 0;
		.link{
			margin-bottom:20upx;color: var(--link-color);text-decoration: underline;
		}
		.bili{
			height:150upx;line-height: 150upx;background: #e8eaf3;border-radius:10upx;
		}
	}	
</style>