<template>
	<view class="release-page gray-bg">
		<view class="release-item">
			<text class="release-item-subtitle">商品标题</text>
			<input class="release-input" v-model="title" type="text" placeholder="请输入商品标题">
		</view>
		<view class="release-item">
			<text class="release-item-subtitle">商品价格</text>
			<input class="release-input" v-model="price" type="number" placeholder="请输入商品价格">
		</view>
		<view class="release-item">
			<text class="release-item-subtitle">商品数量</text>
			<input class="release-input" v-model="stock" type="number" placeholder="请输入商品数量">
		</view>
		<view class="release-item">
			<text class="release-item-subtitle">商品运费</text>
			<input class="release-input" v-model="freight" type="number" placeholder="请输入商品运费">
		</view>
		<view class="release-item">
			<text class="release-item-subtitle">请选择商品分类</text>
			<input class="release-input" v-model="clsTxt"  @click="showClsList" disabled type="text" placeholder="请选择商品分类">
		</view>
		<view class="release-item">
			<text class="release-item-subtitle">上传详情图片</text>
			<view class="release-imgs">
				<view v-for="(item, index) in imgs" :key="index" class="release-img-item">
					<text class="iconfont release-close" @click="removeImg(index)">&#xe614;</text>
					<image @click="previewImgae(index)" :src="item" class="release-img" mode="aspectFit"></image>
				</view>
				<view class="release-add-icon" @click="addImg"><text class="iconfont">&#xe60b;</text></view>
			</view>
		</view>
		<view class="plr30">
			<button class="btn-block" hover-class="btn-hover" @click="submit">确认发布</button>
		</view>
		<template v-if="clsList && clsList.length > 0">
			<mpvue-picker ref="mpvuePicker" mode="multiLinkageSelector" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm" :pickerValueArray="clsList"></mpvue-picker>
		</template>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	export default {
		components:{mpvuePicker, wPicker},
		data (){
			return {
				pickerValueDefault: [0,0],
				deepLength: 2,
				selectIndex: [0, 0],
				clsList: [],
				imgs: [],
				title: '',
				price: '',
				freight: '',
				stock: '',
				selsectClsId: 0,
				clsTxt: '',
				id: ''
			}
		},
		computed: {
			
		},
		onLoad(e) {
			if(e.id){
				this.id = e.id
				this.getData()
			}else{
				this.getAllCls()
			}
		},
		created() {
			
		},
		methods: {
			//获取详情
			getData (){
				this.$post('api/shop/business/publishdetail', {id: this.id}).then(res=>{
					if(res.code == 1){
						var data = res.data
						this.title = data.title
						this.price = data.price
						this.freight = data.freight
						this.stock = data.stock
						this.selsectClsId = data.goods_type
						this.getAllCls(data.goods_type)
					}else{
						this.$toast(res.msg)
						this.getAllCls()
					}
				})
			},
			onConfirm(e) {
				this.selsectClsId = e.value[1]
				this.clsTxt = e.label
			},
			//选择分类
			showClsList (){
				this.$refs.mpvuePicker.show()
			},
			//获取全部分类
			getAllCls (id){
				this.clsList = uni.getStorageSync('product_goodstypetree') || []
				this.$post('api/shop/product/goodstypetree', {pid: 0}).then(res=>{
					if(res.code == 1){
						var data = []
						res.data.forEach(item=>{
							var pitem = {value: item.id, label: item.name, children: []};
							if(item.child && item.child.length > 0){
								item.child.forEach(citem=>{
									if(id == citem.id){
										this.clsTxt =  item.name + '-' +citem.name
									}
									pitem.children.push({
										value: citem.id, label: citem.name
									})
								})
							}else{
								pitem.children.push({
									value: item.id, label: item.name
								})
							}
							data.push(pitem)
						})
						this.clsList = data
						uni.setStorageSync('product_goodstypetree', data)
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//提交数据
			submit (){
				if(!this.title){
					this.$toast('请输入商品名称')
				}else if(!this.price){
					this.$toast('请输入商品价格')
				}else if(!this.freight){
					this.$toast('请输入商品运费')
				}else if(!this.stock){
					this.$toast('请输入商品库存')
				}else if(!this.selsectClsId){
					this.$toast('请选择商品分类')
				}else if(!this.imgs || this.imgs.length <= 0){
					this.$toast('请选择商品轮播图')
				}else{
					var files = []
					this.imgs.forEach((item, index)=>{
						files.push({name: `images_${index}`, uri: item})
					})
					uni.showLoading({
						title:'正在上传'
					})
					var data = {
						token: uni.getStorageSync('token'),
						title: this.title,
						price: this.price,
						freight: this.freight,
						stock: this.stock,
						goods_type: this.selsectClsId,
					}
					if(this.id){
						data.id =this.id
					}
					setTimeout(uni.hideLoading, 15000)
					uni.uploadFile({
						url: this.$domain+'api/shop/business/publish',
						files: files,
						formData: data,
						success: (res) => {
							var res = JSON.parse(res.data)
							if(res.code == 1){
								uni.navigateBack({delta: 1})
							}
							this.$toast(res.msg)
						},
						complete(res) {
							uni.hideLoading()
						}
					});
					this.price = ''
				}
			},
			//添加图片
			addImg (){
				if(this.imgs.length >= 8){
					this.$toast('最多添加8张图')
					return false
				}
				uni.chooseImage({
					count: 8 - this.imgs.length, //默认9
					sizeType: ['compressed'],
					sourceType: ['album'], //从相册选择
					success: (res)=> {
					   this.imgs.push(...res.tempFilePaths)
					}
			   })
			},
			//移除图片
			removeImg (index){
				this.imgs.splice(index, 1)
			},
			//图片预览
			previewImgae (index){
				uni.previewImage({
					urls: this.imgs,
					current: this.imgs[index]
				});
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	
</style>
