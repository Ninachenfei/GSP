<template>
	<view class="box">		
		 <view class="address">
			 <view class="list" v-for="(item,index) in data" :key="index">
				 <view class="list_top">
					 <view class="list_top_1">
						 <text class="name">{{item.receiver}}</text>
						 <text class="tel">{{item.mobile}}</text>
					 </view>
					 <view class="city">{{item.receiving_area}} {{item.address}}</view>
				 </view>
				 <view class="list_bottom">					  
					  <view class="mor"><switch :checked="item.default == 1" @change="switchChange(index, item.id)" color="#00e266" class="cut" />{{item.default == 1?'默认地址':'设为默认'}}</view>                
					  <navigator class="edit" hover-class="none" :url="'add_address?id='+item.id">编辑</navigator>
				 </view>
			 </view>
			 <uni-load-more :status="loading"></uni-load-more>
		 </view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				salary_index:0,
				checked:true,
				page: 1,
				data:[],
				hasMore: true,
				loading: 'more'
			};
		},
		components:{uniLoadMore},
		mounted(){
	
		},
		onShow() {
			this.getAddress()
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: '/pages/user/add_address'
			});
		},
		computed:{
	
		},
		//滚动到底部加载
		onReachBottom() {
			if(this.hasMore){
				this.page++;
				this.getAddress()
			}
		},
		methods: {
			getAddress (){
				this.loading = 'loading'
				this.$post('api/shop/product/shippingaddress', {page: this.page}).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loading = 'more'
						}else{
							this.loading = 'noMore'
						}
						this.hasMore = res.data.has_more;
						if(this.page == 1){
							this.data = res.data.data
						}else{
							this.data.push(...res.data.data)
						}
					}else{
						this.loading = 'noMore'
					}
				})
			},
			switchChange(index, id){
				this.$post('api/shop/product/shippingaddressdefault', {id: id}).then(res=>{
					if(res.code == 1){
						this.data.forEach(item=>{
							item.default = 0
							return item
						})
						this.data[index].default = 1
					}
					this.$toast(res.msg)
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	@import '../../config.less';
	.address{
		border-top:10upx solid #f7f7f7;
		.list{
			border-bottom:10upx solid #f7f7f7;font-size:30upx;color:var(--txt-color);line-height:1.5;padding: 30upx;
			.list_top{	
				.list_top_1{
					display: flex;align-items: center;
					.tel{font-size:24upx;color:var(--txt-gray-color);margin-left:20upx;}
				}
				.city{padding:10upx 0; border-bottom:1upx solid #ececec;}
			}
			.list_bottom{
				display: flex;align-items: center;justify-content: space-between;padding-top:10upx;
				.mor{
					font-size:26upx;color:var(--txt-gray-color);
					.cut{
						transform: scale(0.7);margin:0upx 0 0 -30upx;
					}
				}
				.edit{font-size:24upx;color:var(--txt-gray-color);}
			}
		}
	}
	
</style>