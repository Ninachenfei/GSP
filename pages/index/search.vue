<template>
	<view class="grace-margin">
		<view class="grace-search grace-fixed-top top grace-gtbg-blue">
			<view class="grace-search-in">
				<view class="icons iconfont">&#xe6df;</view>
				<input type="search" @input="searchChange" @confirm="searchNow" :value="searchKey" placeholder="请输入搜索关键字"></input>
				<view class="icons iconfont f30" @tap="clearKey" v-if="searchClose">&#xe614;</view>
			</view>
		</view>
		<view class="grace-title" style="margin-top:80px;">
			<view>搜索历史</view>
			<text class="grace-more" @click="clearKeyHistory">清空</text>
		</view>
		<view v-if="searchKeyHistory.length == 0" class="search-kong">暂无搜索记录</view>
		<view class="grace-search-taps">
			<view v-for="(item, index) in searchKeyHistory" :key="index" :data-key="item" @tap="setKey">{{item}}</view>
		</view>
	</view>
</template>
<script>
export default {
    data() {
        return {
            searchKey : "",
            searchClose : false,
			searchKeyHistory : []
        }
    },
	created() {
		this.updateSearch()
	},
    methods:{
		//更新搜索历史
		updateSearch (){
			var keywords = []
			try{
				keywords = uni.getStorageSync('keywords')
			}catch(e){
				//TODO handle the exception
			}
			this.searchKeyHistory = keywords
		},
		//监听输入框变化
        searchChange:function(e){
            var key = e.detail.value;
            this.searchKey = key;
            if(key.length >= 1){
                this.searchClose = true;
            }else{
                this.searchClose = false;
            }
        },
		//清空输入数据
        clearKey:function(){
            this.searchClose = false;
            this.searchKey   = "";
        },
		//搜索方法
        searchNow:function(){
			var keywords = []
			try{
				keywords = uni.getStorageSync('keywords') || []
			}catch(e){
				//TODO handle the exception
			}
			keywords.push(this.searchKey)
			uni.setStorageSync('keywords', keywords)
			this.updateSearch()
			uni.navigateTo({
				url: '../index/list?keyword=' + this.searchKey
			})
        },
		//点击历史搜索
		setKey : function(e){
			var key = e.currentTarget.dataset.key;
			this.searchKey = key;
			uni.navigateTo({
				url: '../index/list?keyword=' + this.searchKey
			})
		},
		//清空历史记录
		clearKeyHistory (){
			this.updateSearch()
			uni.setStorageSync('keywords', [])
			this.updateSearch()
			this.$toast('清除成功')
		}
    }
}
</script>
<style scoped="scoped">
	view{line-height: 2em;}
/* h5 端需要动态增加 44px [ 避开默认的头部导航 ] */
.top{top:0;}
/* #ifdef H5 */
.top{top:44px;}
/* #endif */
.grace-search{height: auto;border-bottom: 1px #ccc solid;}
.grace-search-in .icons{font-size: 40upx;}
.grace-search-in .f30{font-size: 30upx;}
.grace-search{padding-left: 0;padding-right: 0;width: 100%;}
.search-kong{text-align: center;font-size: 26upx;color: #909090;line-height: 50upx;padding-top: 60upx;}
</style>