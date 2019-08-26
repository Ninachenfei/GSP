<template>
	<view class="">
		<!-- 轮播图 -->
		<swiper autoplay circular indicator-dots indicator-color="rgba(255,139,56,0.4)" indicator-active-color="rgba(255,139,56)" :interval="3000" class="banners">
			<swiper-item v-for="(item, index) in data.images" :key="item" ></strong>
				<image class="banner-img" mode="aspectFill" :src="item"></image>
			</swiper-item>
		</swiper>
		<!-- 基本信息 -->
		<view class="info">
			<view class="info-top">
				<text class="info-price">￥{{data.price}}</text>
			</view>
			<view class="info-title">{{data.title}}</view>
		</view>
		
		<!-- 富文本 -->
		<view class="content">
			<view class="content-title">图文介绍</view>
			<u-parse class="rich-text" :content="content"></u-parse>
		</view>
	</view>
</template>

<script>
	import avatar from '@/static/img/shop/network/avatar.jpg'
	import CommentItem from '../components/comment.vue'
	import SharePage from '@/utils/share.js'
	import PopupLayer from '../components/popup-layer.vue'
	import uParse from '@/components/uParse/src/wxParse.vue'
	export default {
		data (){
			return {
				//头像
				avatar,
				//富文本内容
				content: ``,
				id: '',
				data: {}
			}
		},
		components: {CommentItem, PopupLayer, uParse},
		computed: {
			content2 (){
				return this.content.replace('<img src=', '<img style="max-width:100%" src=')
			}
		},
		onLoad(e){
			this.id =e.id
		},
		created (){
			this.getDetail()
		},
		methods: {
			getDetail (){
				this.$post('api/shop/business/publishdetail', {id: this.id}).then(res=>{
					if(res.code == 1){
						this.data = res.data
						this.content = res.data.content
					}else{
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import '../style/detail.less';
</style>
