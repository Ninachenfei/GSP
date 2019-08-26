<template>
	<view class="box">		
		 <view class="mode">
		 		 <view class="list">
		 			 <input placeholder="请输入您的收货姓名" v-model="receiver" class="input" />
					 <view class="iconfont">&#xe672;</view>
		 		 </view>
		 		 <view class="list">	 			 
		 			 <input placeholder="请输入收货人手机号" v-model="mobile" class="input" />
					 <view class="iconfont">&#xe603;</view>
		 		 </view>
				 <view class="list">
					  <input placeholder="请输入收货人地址" v-model="city" class="input" disabled @tap="toggleTab"/>
					 <view class="iconfont">&#xe603;</view>
				 </view>
				 <view class="list">
					 <textarea placeholder="请输入收货人详细地址" v-model="address"  class="input textarea" />
					 <view class="iconfont">&#xe603;</view>
				 </view>
				 <view class="list border">
				 	 <view class="title">设为默认地址</view>
				 	 <switch color="#00e266" :checked="defaults" @change="changeData" class="cut" />
				 </view>
				 <view class="list del border" @click="delTip" v-if="id">
				 	 <view class="title">删除收货地址</view>
				 </view>
		 		
		</view>			
		<w-picker mode="region" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				id:'',
				city:'',//省市区地址
				value:[0,0,0],//默认省市区
				receiver: '',
				mobile: '',
				postal_code: '',
				address: '',
				defaults: false,
			}
		},
		computed:{
			defaultVal(){
				return this.value
			},
			dft (){
				return this.defaults
			}
		},
		onLoad(option) {
		   this.id = option.id
		   this.id && this.getData()
		   if(this.id){
			    uni.setNavigationBarTitle({
					title: '编辑收货地址'
			   });
		   }else{
			    uni.setNavigationBarTitle({
					title: '添加收货地址'
			   });
		   }
		},
		onNavigationBarButtonTap(e){
			if(!this.receiver){
				this.$toast('请输入收货人姓名')
			}else if(!this.mobile){
				this.$toast('请输入收货人手机号')
			}else if(!this.city){
				this.$toast('请选择收货城市')
			}else if(!this.address){
				this.$toast('请输入收货人详细地址')
			}else{
				var data =  {
					receiver: this.receiver,
					mobile: this.mobile,
					receiving_area: this.city,
					address: this.address,
					default: 0,
				}
				if(this.defaults){
					data.default = 1
				}
				if(this.id){
					data.id = this.id
				}
				this.$post('api/shop/product/addshippingaddress', data).then(res=>{
					if(res.code == 1){
						uni.navigateBack({delta: 1})
					}
					this.$toast(res.msg)
				})
				data.mobile = ''
			}
		},
		methods: {
			changeData (e){
				this.defaults = e.target.value
			},
			toggleTab(index){
				this.$refs.picker.show();
			},
			onConfirm(val){
				this.city = val[0] +' '+ val[1] +' '+ val[2]
			},
			//删除地址
			delTip(){
				uni.showModal({
					title: '删除提示',
					content: '确认删除这个收货地址吗',
					success: (e)=>{
						if(e.confirm){
							this.del()
						}
					}
				})
			},
			del (){
				this.$post('api/shop/product/deleteshippingaddress',{
					id: this.id
				}).then((e)=>{
					if(e.code == 1){
						setTimeout(()=>{
							uni.navigateBack({delta: 1})
						}, 800)
					}
					this.$toast(e.msg)
				})
			},
			//获取收货地址信息
			getData (){
            	this.$post('api/shop/product/shippingaddressdetail',{
	        		id: this.id
	        	}).then((e)=>{
	        		if(e.code == 1){
						this.city = e.data.receiving_area
						this.receiver = e.data.receiver
						this.mobile = e.data.mobile
						this.defaults = e.data.default == 1 ? true : false
						this.address = e.data.address
	        		}else{
	        			this.$toast(e.msg)
	        		}
	        	})
            }
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	.mode{
		padding: 30upx 0;border-top:10upx solid #f7f7f7;
		.list{
			display: flex;align-items: center;justify-content: space-between;min-height:110upx;border-bottom:1px solid #ececec;font-size:30upx;color:var(--txt-color);padding:0 30upx;
			.title{min-width:25%;}
			.input{
				flex:1;
			}
			.textarea{
				height:150upx;padding:16upx 0;font-size:30upx;line-height: 1.5;
			}
			.cut{
				transform: scale(0.7);margin-right: -30upx;
			}
			
		}
		.border{
			border-top:30upx solid #f7f7f7;border-bottom: none;
		}
		.del{color:#f5536a;}
	}
</style>