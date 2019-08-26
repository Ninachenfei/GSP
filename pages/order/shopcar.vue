<template>
	<view class="shopcar">
		<view class="shopcar-kong" v-if="add.allNum <= 0 && list.length <= 0">
			<image src="/static/img/shop/kong-gouwuche.png" mode="aspectFit" class="shaopcar-img"></image>
			<text class="shopcar-kong-txt">购物车还是空空的</text>
			<text class="shopcar-kong-tip">快去看看需要点啥吧~</text>
		</view>
		<view class="shopcar-list" v-else>
			<view class="shopcar-item" v-if="list.length > 0" v-for="(citem, index) in list" :key="index">
				<!-- <view class="shopcar-store">
					<text class="iconfont iconfont-select" :class="{active: item.select}" @click="selectStore(index)">&#xe623;</text>
					<view class="store-right">
						<text class="iconfont iconfont-select">&#xe650;</text>
						<text>拉夏贝尔旗舰店</text>
					</view>
				</view> -->
				<view class="shopcar-content">
					<text class="iconfont iconfont-select" :class="{active: citem.select}" @click="selectShop(index)">&#xe623;</text>
					<view class="shopcar-info">
						<image class="shopcar-left-img" :src="citem.image" mode="aspectFill"></image>
						<view class="shopcar-right">
							<text class="shopcar-right-txt">{{citem.title}}</text>
							<view class="shopcar-options">
							</view>
							<view class="shopcar-price-wrap">
								<text class="shop-price">￥{{citem.price}}</text>
								<view class="shopcar-price-input">
									<view class="iconfont shopcar-input-item" @click="changeNum(index, '-')">&#xe624;</view>
									<input type="text" disabled v-model="citem.num" class="shopcar-input" />
									<view class="iconfont shopcar-input-item" @click="changeNum(index, '+')">&#xe60b;</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="haohuo-pb200">
			<view class="shopcar-title">好货推荐</view>
			<view class="goods-list">
				<goods-item :data="item" v-for="(item, index) in goodsList" :key="index" > </goods-item>
			</view>
		</view>
		<view class="shopcar-footer">
			<view class="footer-left" @click="selectAll" v-if="add.allNum > 0">
				<text class="iconfont iconfont-select" :class="{active: add.all}">&#xe623;</text><text>全选</text>
			</view>
			<view class="footer-right">
				<text class="footer-add">合计:￥{{add.price}}</text>
				<view class="footer-btn" @click="gobuy">去结算({{add.num}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	import GoodsItem from '../components/GoodsItem.vue'
	import goodsImg from '@/static/img/shop/network/zq1.jpg'
	export default {
		data (){
			return {
				goodsList: [],
				list: []
			}
		},
		created() {
			this.getGoodsList()
		},
		onShow (){
			this.getList()
		},
		//删除
		onNavigationBarButtonTap(e) {
			if(this.add.num <= 0){
				this.$toast('请选择要移除的商品')
				return false
			}
			if(e.index == 0){
				uni.showModal({
					title: '确认移除',
					content: '确认要把所选移除购物车吗？',
					success: (res)=> {
						if(res.confirm){
							var ids = []
							for(var i=0;i<this.list.length;i++){
								if(this.list[i].select){//直接删除会导致循环 索引混乱，使一半的数据无法删除,所以i--
									ids.push(this.list[i].id)
									this.list.splice(i--, 1);
								}
							}
							//删除购物车数据
							this.delShopcar(ids)
						}
					}
				})
			}
		},
		computed:{
			//合计
			add (){
				var s = 0, num = 0, all = true, allNum = 0
				this.list.forEach((item, index)=>{
					allNum++
					if(item.select){
						s += parseFloat(item.price) * parseFloat(item.num)
						num += 1
					}else{
						all = false
					}
				})
				s = Math.round(s * 100) / 100
				return {price: s, num, all, allNum}
			},
		},
		components: {GoodsItem},
		methods: {
			//删除购物车数据
			delShopcar (ids){
				ids = ids.join(',');
				this.$post('api/shop/cart/deletecart', {ids}).then(res=>{
					this.$toast(res.msg)
				})
			},
			//获取推荐
			getGoodsList (){
				this.goodsList = uni.getStorageSync('product_goodstype_8')
				this.$post('api/shop/product/lists', {zone_type: 8}).then(res=>{
					if(res.code == 1){
						this.goodsList = res.data.data
						uni.setStorageSync('product_goodstype_8', res.data.data)
					}else{
						this.loadStatus = 'noMore'
						this.$toast(res.msg)
					}
				})
			},
			//获取购物车
			getList (){
				this.$post('api/shop/cart/cartlist').then(res=>{
					if(res.code == 1){
						res.data.forEach(item=>{
							item.select = false
							return item
						})
						this.list = res.data
						//this.$set('list', res.data)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//去结算
			gobuy (){
				//下单ajax操作...
				if(this.add.num > 0){
					var data = []
					this.list.forEach((item, index)=>{
						if(item.select){
							data.push({
								num: item.num,
								id: item.product_id,
								cartid: item.id
							})
						}
					})
					try{
						uni.setStorageSync('orders', data)
					}catch(e){
						//TODO handle the exception
					}
					uni.navigateTo({
						url: '../index/confirm_order'
					})
				}else{
					this.$toast('请选择要的购买商品')
				}
			},
			//点击全选
			selectAll (){
				var flag = this.add.all
				this.list.forEach((item, index)=>{
					item.select = !flag
				})
			},
			//数量加减
			changeNum (index, type){
				if(type == '-'){
					if(this.list[index].num > 1){
						this.list[index].num = parseInt(this.list[index].num) - 1
					}else{
						this.$toast('最小购买的数量为1')
					}
				}else{
					this.list[index].num = parseInt(this.list[index].num) + 1
				}
			},
			//选择商品
			selectShop (index){
				this.list[index].select = !this.list[index].select
			}
		}
	}
</script>

<style scoped lang="less">
	@color: #fe6f07;
	@price: #f33c1e;
	.dfyc(@line:3) {
		text-decoration: none;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: @line;
		-webkit-box-orient: vertical;
		vertical-align: top;
	}
	.shopcar-list{padding: 20upx 30upx;}
	.shopcar-item{ display: block;border-bottom: 1upx var(--border) solid;margin-bottom: 20upx;padding-bottom: 20upx; &:last-child{margin-bottom: 0;}}
	.shopcar-store{display: flex;align-items: center;margin-bottom: 16upx;}
	.iconfont-select{text-align: center;font-size: 36upx;margin-right: 10upx;color: #909090}
	.iconfont-select.active{color: @color}
	.store-right{
		flex: 1;font-size: 30upx;
		.iconfont{margin-right: 10upx;}
	}
	.shopcar-content{
		display: flex;align-items: center;margin-bottom: 20upx;
		&:last-child{margin-bottom: 0;}
	}
	.shopcar-info{flex: 1;display: flex;align-items: flex-start;}
	.shopcar-left-img{width: 184upx;height: 184upx;}
	.shopcar-right{flex: 1;padding-left: 20upx;overflow: hidden;}
	.shopcar-right-txt{font-size: 26upx;line-height: 40upx;.dfyc(2);}
	.shopcar-options{display: flex;align-items: center;height: 40upx;line-height: 40upx;font-size: 24upx;}
	.shopcar-option{background: #f3f3f3;color: #999;border-radius: 4upx;margin-right: 8upx;padding: 0 6upx;border-radius: 4upx;margin-top: 10upx;}
	.shopcar-price-wrap{display: flex;margin-top: 10upx;justify-content: space-between;align-items: center;}
	.shop-price{color: @price;font-size: 30upx;font-weight: 600;}
	.shopcar-price-input{display: inline-flex;align-items: center;color: #999;}
	.shopcar-input-item{width: 54upx;height: 54upx;line-height: 52upx;border: 1upx var(--border) solid;text-align: center;font-size: 34upx;}
	.shopcar-input{height: 54upx;width: 60upx;text-align: center;border-top: 1upx var(--border) solid;border-bottom: 1upx var(--border) solid;line-height: 30upx;font-size: 24upx}
	.shopcar-footer{display: flex;align-items: center;padding-left: 30upx;position: fixed;z-index: 99;bottom: var(--window-bottom);width: 100%;background: #fff;height: 100upx;border-top: 1upx var(--border) solid;}
	// 底部
	.footer-left{display: inline-flex;align-items: center;font-size: 26upx;color: #909090}
	.footer-right{flex: 1;display: flex;justify-content: flex-end;align-items: center;}
	.footer-add{color: #909090;font-size: 26upx;padding-right: 20upx;}
	.footer-btn{color: #fff;font-size: 32upx;text-align: center;min-width: 160upx;padding: 0 30upx;background: @color;height: 100upx;line-height: 100upx;}
	// 推荐
	.shopcar-title{display: block;text-align: center;font-size: 30upx;line-height: 80upx;height: 80upx;}
	.goods-list{display: flex;justify-content: space-between;flex-wrap: wrap;padding: 20upx 30upx 0 30upx;}
	.shopcar-kong{display: block;background: var(--body-bg);padding: 100upx 30upx;margin-bottom: 40upx;}
	.shaopcar-img{width: 180upx;height: 180upx;display: block;margin: 0 auto;}
	.shopcar-kong-txt{display: block;text-align: center;font-size: 30upx;color: #323232;margin-top: 20upx;}
	.shopcar-kong-tip{display: block;text-align: center;font-size: 24upx;color: #b2b2b2;margin-top: 10upx;}
	.haohuo-pb200{padding-bottom: 200upx;}
</style>
