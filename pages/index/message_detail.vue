<template>
	<view class="msg-content">
		<text class="msg-content-title">{{title}}</text>
		<u-parse :content="nodes" @preview="preview" @navigate="navigate"></u-parse>
		<text class="msg-dateil-time">{{time}}</text>
	</view>
</template>

<script>
	import uParse from '@/components/uParse/src/wxParse.vue'
	export default{
		components: {uParse},
		data (){
			return {
				title: '',
				time: '',
				nodes: ''
			}
		},
		onLoad(e) {
			this.getDetail(e.id)
		},
		created() {
			
		},
		methods: {
			replaceContent(content){
				this.nodes = content.replace(/\<o\:p\>/igm, '')
									.replace(/\<\/o\:p\>/igm, '')
									.replace(/\<font/igm, '<span')
									.replace(/\<\/font\>/igm, '</span>')
			},
			//获取详情
			getDetail (id){
				this.$post('api/announcement/detail', {id: id}).then(res=>{
					this.replaceContent(res.data.content)
					this.title = res.data.title
					this.time = res.data.publishtime
				})
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				// console.log("href: " + href);
				//#ifdef APP-PLUS
				plus.runtime.openWeb(href)
				//#endif
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import "../../components/uParse/src/wxParse.css";
	.msg-content{padding: 30upx;}
	.msg-content-title{
		display: block;text-align: center;font-size: 32upx;font-weight: 600;padding: 30upx 0;
	}
	.msg-dateil-time{display: block;text-align: right;font-size: 28upx;color: #909090;padding-top: 30upx;}
</style>
