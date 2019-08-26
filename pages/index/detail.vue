<template>
	<view class="detail-content">
		<!-- 轮播图 -->
		<swiper autoplay circular indicator-dots indicator-color="rgba(255,139,56,0.4)" indicator-active-color="rgba(255,139,56)" :interval="3000" class="banners">
			<swiper-item v-for="(item, index) in data.images" :key="index" ></strong>
				<image class="banner-img" mode="aspectFill" :src="item"></image>
			</swiper-item>
		</swiper>
		<!-- 基本信息 -->
		<view class="info">
			<view class="info-top">
				<text class="info-price">${{data.price}}</text>
				<!-- <text class="info-oldprice">￥3927-14098</text> -->
			</view>
			<view class="info-title">{{data.title}}</view>
			<view class="info-yunfei">
				<text>运费:{{data.freight}}元</text>
				<view><text class="theme-color">{{data.sales_volume}}</text>人购买</view>
				<!-- <text>广东深圳</text> -->
			</view>
		</view>
		<!-- 选择规格 -->
		<view class="plr30">
			<view class="select" @click="selectAttr">
				<view v-if="attr.selectTxt" class="attr-select-txt">[<text>{{data.title}}</text>] * {{attr.num}}</view>
				<text v-else>请商品数量</text>
				<text class="iconfont">&#xe7f9;</text>
			</view>
		</view>
		
		
		<!-- 评论 -->
		<view class="comment">
			<view class="comment-title" @click="showCommont">
				<text class="comment-title-txt">用户评价</text>
				<view class="comment-title-more">{{commentTsotal}}条评价<text class="iconfont">&#xe7f9;</text></view>
			</view>
			<view class="comment-list">
				<comment-item :data="comments[0]" v-if="comments && comments[0]"></comment-item>
			</view>
		</view>
		<navigator :url="'../store/homepage?id='+data.uid" class="store" v-if="data.uid != 0">
			<image class="store-avatar" :src="data.business_info && data.business_info.logo" mode="aspectFill"></image>
			<view class="store-title">
				<text class="store-title-txt">{{data.business_info && data.business_info.name}}</text>
			</view>
			<view class="store-link">进店</view>
		</navigator>
		<!-- 富文本 -->
		<view class="content">
			<view class="content-title">图文介绍</view>
			<u-parse class="rich-text" :content="data.content" @preview="preview" @navigate="navigate"></u-parse>
		</view>
		<!-- 底部操作 -->
		<view class="detail-footer">
			<view @click="goStore" class="store-btn">
				<text class="iconfont">&#xe650;</text>
				<text>店铺</text>
			</view>
			<view class="coll-btn" @click="collection" :class="{active: data.is_collection == 1}">
				<text class="iconfont" v-if="data.is_collection == 1">&#xe630;</text>
				<text class="iconfont" v-else>&#xe60a;</text>
				<text>收藏</text>
			</view>
			<view class="shopcar-btn" @click="joinShopcar">加入购物车</view>
			<view @click="goBuy" class="shoping-btn">立即购买</view>
		</view>
		<!-- 商品评论列表 -->
		<popup-layer ref="popupCommont" direction="top">
			<view class="comment-list popup-commonts">
				<comment-item :data="item" v-for="(item, index) in comments" :key="index"></comment-item>
				<load-more :status="loadStatus" :contentText="contentText" @click="loadmoreCommont"></load-more>
			</view>
		</popup-layer>
		<!-- 规格选择弹出层 -->
		<popup-layer ref="popup" direction="top">
			<view class="pupup-bg">
				<!-- <view class="popup-item" v-for="(item, index) in attr.list" :key="index + 1">
					<view class="popup-title">{{item.key}}</view>
					<view class="popup-item-options">
						<view 
						v-for="(citem, cindex) in item.vals" 
						@click="selectItemAttr(item, cindex)" 
						class="popup-txt" 
						:class="{active: attr.list[index].index == cindex}" 
						:key="citem">{{citem}}</view>
					</view>
				</view> -->
				<view  class="popup-nums">
					<text class="popup-inner-title">购买数量</text>
					<view class="popup-inputs">
						<text class="iconfont popup-iconfont" @click="changeNum('-')">&#xe624;</text>
						<input type="number" disabled class="popup-input" v-model="attr.num" />
						<text class="iconfont popup-iconfont" @click="changeNum('+')">&#xe60b;</text>
					</view>
				</view>
				<button class="btn-block mt-70" @click="comfirmSelect">确定</button>
			</view>
		</popup-layer>
	</view>
</template>

<script>
	import avatar from '@/static/img/shop/network/avatar.jpg'
	import CommentItem from '../components/comment.vue'
	import SharePage from '@/utils/share.js'
	import PopupLayer from '../components/popup-layer.vue'
	import uParse from '@/components/uParse/src/wxParse.vue'
	import LoadMore from '../components/uni-load-more'
	export default {
		data (){
			return {
				contentText: {
					contentdown: "点击显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				id: 0,
				data: {},
				//头像
				avatar,
				//评价分页
				page: 1,
				loadStatus: 'more',
				//评论列表
				comments: [],
				commentTsotal: 0,
				//弹框
				attr: {
					num: 1,
					selectTxt: null,
					show: false,
					list: [{
						key: '颜色分类',
						index: 0,
						vals: ['银色', '深空灰色']
					},{
						key: '网络分类',
						index: 0,
						vals: ['无线网络', '无线局域网+蜂窝网络机型']
					},{
						key: '储存容量',
						index: 0,
						vals: ['64GB', '256GB']
					}]
				},
			}
		},
		onLoad (e){
			this.id = e.id;
			this.getDetail()
			this.getCommonts()
		},
		components: {CommentItem, PopupLayer, uParse, LoadMore},
		computed: {
			content2 (){
				return this.content
			}
		},
		//顶部按钮点击事件
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: "../order/shopcar"
			})
			// let _this = this
			// if (e.index === 1) {
			// 	uni.switchTab({
			// 		url: "../order/shopcar"
			// 	})
			// }else if(e.index === 0){
			// 	uni.showActionSheet({
			// 		itemList: ['分享商品', '查看店铺', '询问客服'],
			// 		success(e) {
			// 			if(e.tapIndex == 0){
			// 				var s = new SharePage()
			// 				s.run()
			// 			}else if(e.tapIndex == 1){
			// 				_this.$toast('去店铺')
			// 			}else if(e.tapIndex == 2){
			// 				_this.$toast('询问客服')
			// 			}
			// 		}
			// 	})
			// }
		},
		methods: {
			goStore (){
				if(this.data.uid != 0){
					uni.navigateTo({
						url: '../store/homepage?id='+this.data.uid
					})
				}else{
					this.$toast('平台发布 暂无店铺')
				}
			},
			//加载更多评价
			loadmoreCommont (){
				if(this.loadStatus == 'more'){
					this.page++
					this.getCommonts()
				}
			},
			//获取评价列表
			getCommonts (){
				if(this.page == 1){
					this.comments = uni.getStorageSync('product_evaluationlist') || []
				}
				this.$post('api/shop/product/evaluationlist', {
					id: this.id, page: this.page
				}).then(res=>{
					if(res.code == 1){
						this.commentTsotal = res.data.total
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.comments = res.data.data
							uni.setStorageSync('product_evaluationlist', res.data.data)
						}else{
							this.comments.push(...res.data.data)
						}
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			},
			//显示评论列表
			showCommont (){
				this.$refs.popupCommont.show() 
			},
			//富文本点击图片操作
			preview(src, e) {
				// do something
			},
			//富文本点击链接事件
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
			},
			//获取商品详情
			getDetail (){
				this.$post('api/shop/product/detail', {
					id: this.id
				}).then(res=>{
					if(res.code == 1){
						this.data = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//弹出规格选择框
			selectAttr (){
				this.$refs.popup.show() 
			},
			selectItemAttr (item, cindex){
				item.index = cindex
			},
			//输入数量
			changeNum (type){
				if(type === '+'){
					this.attr.num = parseInt(this.attr.num) + 1
				}else if(type === '-'){
					if(this.attr.num <= 1){
						this.$toast('购买数量最小为1')
					}else{
						this.attr.num = parseInt(this.attr.num) - 1
					}
				}
			},
			//确认所选规格
			comfirmSelect (){
				var data = []
				var selectTxt = []
				this.attr.list.forEach((item)=>{
					var c = {key: item.key, val: item.vals[item.index]};
					selectTxt.push(item.vals[item.index])
					data.push(c)
				})
				this.attr.selectTxt = selectTxt.join(',')
				this.$refs.popup.close()
			},
			//收藏商品
			collection (){
				if(!this.id){return false;}
				this.data.is_collection = 1 - this.data.is_collection
				this.$post('api/shop/product/collection', {id: this.id}).then(res=>{
					if(res.code != 1){
						this.data.is_collection = 1 - this.data.is_collection
					}
					this.$toast(res.msg)
				})
			},
			//加入购物车
			joinShopcar (){
				if(!this.id){return false;}
				if(this.attr.num <= 0){
					this.attr.show = true;
					return false;
				}
				this.$post('api/shop/cart/create', {
					id: this.id,
					num: this.attr.num,
					attributes: ''
				}).then(res=>{
					this.$toast(res.msg)
				})
			},
			//立即购买
			goBuy (){
				try{
					uni.setStorageSync('orders', [{
						num: this.attr.num,
						id: this.id
					}])
				}catch(e){
					//TODO handle the exception
				}
				uni.navigateTo({
					url: 'confirm_order'
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import '../style/detail.less';
</style>
