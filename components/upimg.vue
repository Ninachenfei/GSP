<template>
	<view class="up-img" @click="uploadImg">
		<view class="img-upload" v-if="!localtionImg">
			<text class="iconfont add">&#xe634;</text>
			<text :style="descriptionStyle">{{ description }}</text>
		</view>
		<image
			v-else
			class="select-img"
			@click="handleImgPre"
			:src="localtionImg"
			mode="aspectFill"
		/>
	</view>
</template>
<script>
export default {
	name: 'upimg',
	props: {
		descriptionStyle: {
			type: Object,
			default: () => {}
		},
		description: {
			type: String,
			default: ''
		},
		width: {
			type: Number,
			default: 150
		},
		height: {
			type: Number,
			default: 150
		},
		bgcolor: {
			type: String,
			default: '#fff'
		},
		imgLink: {
			type: String,
			default: ''
		},
		disable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			localtionImg: ''
		};
	},
	watch: {
		imgLink(newV) {
			this.localtionImg = newV;
		}
	},
	created() {
		this.localtionImg = this.imgLink;
	},
	methods: {
		handleImgPre() {
			if (this.disable) {
				uni.previewImage({
					urls: [this.localtionImg]
				});
			}
		},
		uploadImg() {
			if (this.disable) {
				return;
			}
			this.$uploadImage(
				img => {
					console.log(img);
				},
				e => {
					let data = JSON.parse(e.data);
					if (data.code === 1) {
						let imgLink = `https://app.yunanjy.com${data.data.url}`;
						this.localtionImg = imgLink;
						this.$emit('getImg', data.data.url);
					}
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.img-upload-hide {
	opacity: 0;
	overflow: hidden;
	position: absolute;
	width: 150upx;
	height: 150upx;
}
.select-img {
	display: block;
	background-color: #ccc;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	width: 150upx;
	height: 150upx;
}
.img-upload {
	border: 2upx dashed #e0e0e0;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10upx;
	flex-direction: column;
	width: 150upx;
	height: 150upx;
	.add {
		color: #e0e0e0;
	}
}
.img-container {
	text-align: left;
}
</style>
