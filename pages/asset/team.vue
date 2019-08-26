<template>
	<view class="team-page h100">
		<view class="team-top-tab">
			<view class="team-tab-item">
				<view class="team-tab-item-label">推荐人数</view>
				<text>{{data.direct_push}}人</text>
			</view>
			<view class="team-tab-item">
				<view class="team-tab-item-label">今日收益</view>
				<text>{{data.today_award}}</text>
			</view>
			<view class="team-tab-item">
				<view class="team-tab-item-label">总收益</view>
				<text>{{data.award}}</text>
			</view>
		</view>
		<view class="team-list">
			<view class="team-list-items title">
				<view class="team-list-item">ID</view>
				<view class="team-list-item">时间</view>
				<view class="team-list-item">级别</view>
			</view>
			<view class="team-list-items" v-for="(item, index) in list" :key="index">
				<view class="team-list-item">{{item.id}}</view>
				<view class="team-list-item">{{item.jointime}}</view>
				<view class="team-list-item">{{item.level}}</view>
			</view>
		</view>
		<load-more :status="loadStatus"></load-more>
	</view>
</template>

<script>
	import LoadMore from '../components/uni-load-more'
	export default {
		data (){
			return {
				list: [],
				data: {},
				page: 1,
				loadStatus: 'more'
				
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData (){
				if(this.page == 1){
					this.list = uni.getStorageSync('user_teams')
					this.data = uni.getStorageSync('user_teams_data')
				}
				this.$post('api/user/teams', {page: this.page}).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.list = res.data.list.data
							var data = {
								direct_push: res.data.direct_push,
								award: res.data.award,
								today_award: res.data.today_award,
							}
							this.data = data
							uni.setStorageSync('user_teams', res.data.list.data)
							uni.setStorageSync('user_teams_data', data)
						}else{
							this.list.push(...res.data.list.data)
						}
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			}
		},
		components: {LoadMore},
		onReachBottom() {
			if(this.loadStatus == 'more'){
				this.page++
				this.getData()
			}
		}
	}
</script>

<style>
</style>
