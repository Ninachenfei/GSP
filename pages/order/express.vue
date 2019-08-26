<template>
	<view class="express-page">
		<view class="grace-margin" v-if="list && list.length>0">
			<view class="grace-timeline" style="margin-top:30upx;">
				<view class="rows" v-for="(item, index) in list">
					<view class="left">
						<view class="row-left-radius" :class="{active: index==0}"></view>
					</view>
					<view class="body">
						<view class="text">{{item.AcceptStation}}</view>
						<view class="time">{{item.AcceptTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="express-kong" v-else >暂无快递信息</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				list: [],
				id: ''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getData()
		},
		methods: {
			getData (){
				this.$post('api/shop/order/logistics', {id: this.id}).then(res=>{
					if(res.code == 1){
						var data = res.data.traces
						if(data && data.length > 0){
							data = data.reserve()
						}
						this.list = res.data.traces
					}else{
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>