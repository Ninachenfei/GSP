<template>
	<view class="page-wrap">
		<!-- 分类滑动tab -->
		<scroll-view class="scroll-wrap" scroll-with-animation="true" :scroll-left="scrollLeft" scroll-x="true">
			<view class="scroll-item" @click="toggleCls(0, 0, $event)" :class="{active: currentCls == 0}">全部</view>
			<view class="scroll-item" @click="toggleCls(item.id, index, $event)" v-for="(item, index) in clsList" :key="index" :class="{active: currentCls == item.id}">{{item.name}}</view>
		</scroll-view>
		<!-- 顶部轮播图 -->
		<swiper class="imageContainer"  @change="handleChange" :indicator-dots="false" previous-margin="50rpx" next-margin="50rpx" :interval="3500" circular  autoplay>
			<block v-for="(item,index) in banners" :key="index">
				<swiper-item class="swiperitem">
					<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item" lazy-load mode="aspectFill"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 分区菜单栏 -->
		<view class="menu">
			<navigator url="list?zone_type=8" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-tuijian.png" mode="aspectFit"></image>
				<text class="menu-item-txt">推荐区</text>
			</navigator>
			<navigator url="list?zone_type=5" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-baihuo.png" mode="aspectFit"></image>
				<text class="menu-item-txt">日用百货</text>
			</navigator>
			<navigator url="list?zone_type=6" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-jiadian.png" mode="aspectFit"></image>
				<text class="menu-item-txt">数码家电</text>
			</navigator>
			<navigator url="list?zone_type=2" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-remai.png" mode="aspectFit"></image>
				<text class="menu-item-txt">热卖区</text>
			</navigator>
			<navigator url="list?zone_type=1" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-jingping.png" mode="aspectFit"></image>
				<text class="menu-item-txt">精品区</text>
			</navigator>
			<navigator url="list?zone_type=3" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-shiping.png" mode="aspectFit"></image>
				<text class="menu-item-txt">食品</text>
			</navigator>
			<navigator url="list?zone_type=4" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-meizhuang.png" mode="aspectFit"></image>
				<text class="menu-item-txt">美妆</text>
			</navigator>
			<navigator url="list?zone_type=7" class="menu-item">
				<image class="menu-item-img" src="/static/img/shop/icon-xiefu.png" mode="aspectFit"></image>
				<text class="menu-item-txt">鞋服</text>
			</navigator>
		</view>
		<!-- 滚动公告 -->
		<view class="gonggao">
			<image mode="aspectFit" src="/static/img/shop/icon-gonggao.png" class="icon-gonggao"></image>
			<swiper class="gonggao-list" circular :indicator-dots="false" vertical :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item, index) in gonggao" :key="index">
					<navigator :url="'message_detail?id='+item.id" class="gonggao-item">{{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 专区 -->
		<view class="zhuanqu">
			<navigator url="list?zone_type=9" class="zhuanqu-left">
				<image class="zhuanqu-img" mode="aspectFill" src="/static/img/shop/network/zq1.jpg"></image>
			</navigator>
			<view class="zhuanqu-right">
				<navigator url="list?zone_type=10" class="zhuanqu-rt">
					<image class="zhuanqu-img" mode="aspectFill" src="/static/img/shop/network/zq2.jpg"></image>
				</navigator>
				<navigator url="list?zone_type=11" class="zhuanqu-rb">
					<image class="zhuanqu-img" mode="aspectFill" src="/static/img/shop/network/zq3.jpg"></image>
				</navigator>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="list-title" id="lists" ref="lists">
			<view class="list-title-txt">{{currentClsTxt}}</view>
			<navigator open-type="switchTab" class="list-more" url="classify">更多 <image class="list-more-icon" src="/static/icon/icon_next.png" mode="aspectFit"></image></navigator>
		</view>
		<view class="goods-list">
			<goods-item :data="item" v-for="(item, index) in goodsList" :key="index" > </goods-item>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import GoodsItem from '../components/GoodsItem'
	import goodsImg from '@/static/img/shop/network/zq1.jpg'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data (){
			return {
				banners: [],
				currentIndex: 0,
				//当前列表的分类
				currentClsTxt: '猜你喜欢',
				currentCls: 0,
				//item到左边的距离px
				scrollLeft: 0,
				//分类
				clsList: [],
				//列表数据
				goodsList: [],
				//加载状态 more、loading、noMore
				loadStatus: 'more',
				page: 1,
				//公告轮播
				gonggao: []
			}
		},
		created() {
			//获取轮播图
			this.getbanner()
			//获取全部分类
			this.getAllCls()
			//获取商品列表
			this.getGoodsList()
			//获取公告列表
			this.getGonggao()
		},
		onNavigationBarSearchInputClicked () {
			uni.navigateTo({url: 'search'})
		},
		onNavigationBarButtonTap (){
			uni.navigateTo({url: 'message'})
		},
		components: {GoodsItem, uniLoadMore},
		methods: {
			//监听轮播图变化
			handleChange (e){
				this.currentIndex = e.detail.current
			},
			//切换到指定分类
			toggleCls (id, index, $event){
				this.currentClsTxt = index == 0 ? '猜你喜欢' : this.clsList[index].name
				var  windowWidth = 320
				try{
					windowWidth = uni.getSystemInfoSync().windowWidth;
				}catch(e){
				}
				/* var selectObject = uni.createSelectorQuery().in(this)
				var domObj = selectObject.select('#lists')
				var data = domObj.fields({
				  rect: true,
				  scrollOffset: true,
				  dataset: true
				}, (res)=>{
					console.log(JSON.stringify(res, {}, 4))
					
				}).exec() */
				//TODO 自动获取高度要求父容器必须时scroll-view，此处手动算出上方的高度
				var t = uni.upx2px(1200);
				uni.pageScrollTo({scrollTop: t})
				this.scrollLeft = $event.target.offsetLeft - windowWidth / 2
				
				this.currentCls = id
				this.page = 1
				this.loadStatus = 'more';
				this.getGoodsList()
				//获取分类信息
				// this.$get('')
			},
			//获取轮播图
			getbanner (){
				try{
					this.banners = uni.getStorageSync('carouselmap') || []
				}catch(e){
					//TODO handle the exception
				}
				this.$post('api/carouselmap').then(res=>{
					if(res.code == 1){
						uni.setStorageSync('carouselmap', res.data)
						this.banners = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//获取全部分类
			getAllCls (){
				try{
					this.clsList = uni.getStorageSync('product_goodstype_0') || []
				}catch(e){
					//TODO handle the exception
				}
				
				this.$post('api/shop/product/goodstype', {pid: 0}).then(res=>{
					if(res.code == 1){
						this.clsList = res.data
						uni.setStorageSync('product_goodstype_0', res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//获取商品列表
			getGoodsList (){
				this.loadStatus = 'loading'
				if(this.page == 1){
					this.goodsList = uni.getStorageSync('product_goodstype_'+this.currentCls) || []
				}
				var data = {
					type: 0,
					page: this.page,
				}
				if(this.currentCls != 0){	//全部不传 goods_type
					data.goods_type = this.currentCls
				}
				this.$post('api/shop/product/lists', data).then(res=>{
					if(res.code == 1){
						if(res.data.has_more){
							this.loadStatus = 'more'
						}else{
							this.loadStatus = 'noMore'
						}
						if(this.page == 1){
							this.goodsList = res.data.data
							uni.setStorageSync('product_goodstype_'+this.currentCls, res.data.data)
						}else{
							this.goodsList.push(...res.data.data)
						}
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			},
			//获取公告信息
			getGonggao (){
				try{
					this.gonggao = uni.getStorageSync('announcement_lists') || []
				}catch(e){
					//TODO handle the exception
				}
				setTimeout(()=>{
					var data = {page: 1}
					this.$post('api/announcement/lists', data).then(res=>{
						if(res.code == 1){
							this.gonggao = res.data.data
							uni.setStorageSync('announcement_lists', res.data.data)
						}else{
							this.$toast(res.msg)
						}
					})
				}, 100)
			}
		},
		//滚动到底部加载
		onReachBottom() {
			if(this.loadStatus == 'more'){
				this.page++
				this.getGoodsList()
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import '../style/index.less';
</style>
