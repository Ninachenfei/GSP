<template>
	<view class="box">
		<view style="padding: 15upx;">
			<!-- <view class="box1">
				<mpvue-echarts canvasId="chat1" :echarts="echarts" :onInit="fn1OnInit" />
			</view> -->
			
			<view class="box1">
				<!-- 引入的mpvue-echarts组件 -->
				<!-- <mpvue-echarts canvasId="line" :echarts="echarts" :onInit="lineInit" /> -->
				<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" />
			</view>
			
	        <!-- <view class="canvasView">
				<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
			</view> -->
	        

			<!-- crb -->
			<view style="background-color: #fff;;;padding: 5upx;margin:15upx 0" v-for="(item,index) in crborjpsdata" :key="item.id" >
				<view style="padding: 10upx 15upx 3upx 15upx;">
					<text style="color:blue;font-size:15px">{{item.coin_name}}</text>
				</view>
				<view style="padding: 15upx;" class="price">
				  <view>
				  	 <text style="color:#b59090">价格:</text>
					 <text style="color:#000">{{item.price}}</text>
				  </view>
				  <view style="margin-left:100upx">
					 <text style="color:#b59090">数量:</text>
					 <text style="color:#000">{{(item.amount)?item.amount:''}}</text>
				  </view>	
				</view>
			</view>
			
			<!-- 转出 -->
			<view style="background-color: #fff;;;padding: 5upx;margin:15upx 0">
				<view style="padding: 10upx 15upx 3upx 15upx;">
					<text style="color:blue;font-size:15px">CRB转出</text>
				</view>
				<view  class="price">
					 <!-- <text style="color:#b59090;width:150upx">请输入您的ID:</text> -->
					 <input type="text" v-model="theID" placeholder="请输入您的ID"/>
				</view>
				<view class="price">
					 <!-- <text style="color:#b59090;width:150upx">资金密码:</text> -->
					 <input type="text" v-model="thePaaword" placeholder="资金密码"/>
				</view>
				<view class="price">
					 <!-- <text style="color:#b59090;width:150upx">转账数量:</text> -->
					 <input type="text" v-model="theMount" placeholder="转账数量"/>
				</view>
				<view style="padding: 3upx 0;">
					 <button @click="quirmZc" class="querem">确认</button>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	//导入库
	import * as echarts from '@/components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';	
 
 
	export default{
		data() {
			return {
				//初始化图表
				echarts: echarts,
				mykxdata:[],   //K线数据
				crborjpsdata:[],  //crb和jps数据
				theID:'',
				thePaaword:'',
				theMount:'',
				lineOption :{
					title: { 
						text: '价格变化'
						// subtext: 'k线'
					},
					tooltip: {
						trigger: 'axis',
						formatter: function (params) {
							// console.log('参数',params);
							// params = params[0];
							// // 每一列数据的name值得时间格式进行转换
							// var date = new Date(params.name);
							// return date.getFullYear()+ '/'+ (date.getMonth() + 1)+ '/' + date.getDate() + ' : ' + params.value[1];
							return '12341234'
						},
						axisPointer: {
							animation: false
						}
					},
					// legend: {
					// 	data: ['价格']
					// },
					// toolbox: {
					// 	show: true,
					// 	feature: {
					// 		mark: {
					// 			show: true
					// 		},
					// 		dataView: {
					// 			show: true,
					// 			readOnly: false
					// 		},
					// 		magicType: {
					// 			show: true,
					// 			type: ['line', 'bar']
					// 		},
					// 		restore: {
					// 			show: true
					// 		},
					// 		saveAsImage: {
					// 			show: true
					// 		}
					// 	}
					// },
					// calculable: true,
					xAxis: [{
						// type: 'category',
						type: 'category',   //time需要传时间戳
						boundaryGap: false,
						"axisLabel":{   //控制横坐标显示
							interval: 0,
							rotate:90  
						},
						// axisPointer:{
						// 	triggerTooltip :true,
						// 	value:'1234214'
						// },
						// data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']  //横坐标的值
						data: []  //横坐标的值
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							formatter: '{value}'
						},
						splitLine: {
							show: false   //分割线
						}
					}],
					series: [{
							name: '价格',
							type: 'line',
							// data: [11, 11, 15, 13, 12, 13, 10],   //纵坐标的值
							data: []   //纵坐标的值
							// markPoint: {
							// 	data: [{
							// 			type: 'max',
							// 			name: '最大值'
							// 		},
							// 		{
							// 			type: 'min',
							// 			name: '最小值'
							// 		}
							// 	]
							// },
							// markLine: {
							// 	data: [{
							// 		type: 'average',
							// 		name: '平均值'
							// 	}]
							// }
						}
					]
				}
			}
		},
		components: {
			mpvueEcharts
		},
		created() {
			//获取crb数据
			this.getcrbData();
		},
		onLoad(e){
			
		},
		onNavigationBarButtonTap() {
			this.$goWallet()
		},
		computed:{
			
		},
		methods: {
			getcrbData(){
				var me = this;
				this.$get('/api/shop/crb/data').then(res=>{
					console.log("我的数据2",res);
					if(res.code == 1){
						me.crborjpsdata  = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			timestampToTime(timestamp) {
			   let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			   let Y = date.getFullYear() + '/';
			   let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
			   let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+ ' ';
			   var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
			   var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
			   var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
				return Y+M+D+h+m+s;
				// return Y+M+D;
			},
			//K线图
			lineInit(canvas, width, height){
				var me =this;
				const lineChart = echarts.init(canvas, null, {
					width: width,
					height: 250
				})
				this.$get('/api/shop/crb/crbKLine').then(res=>{
					this.mykxdata = []; //清空操作
					if(res.code == 1){
						let mydata = [];  //转换格式后的数据
						let xdata = [];  //横坐标数据
						let ydata = []; //纵坐标数据
						res.data.forEach(function(item,index){
							item.createtime = me.timestampToTime(item.createtime);
							item.updatetime = me.timestampToTime(item.updatetime);
							mydata.push(item);
							xdata.push(item.updatetime);
							ydata.push(item.price);
						})
						this.mykxdata = mydata;
						// this.lineOption.xAxis[0].data = xdata;
						this.lineOption.series[0].data = ydata
						canvas.setChart(lineChart);
						lineChart.setOption(this.lineOption);
						return lineChart
					}else{
						this.$toast(res.msg)
					}
				})
			},
			//K线图结束
			quirmZc(){
				// console.log('转出数据参数1---'+this.theID);
				// console.log('转出数据参数2---'+this.theMount);
				// console.log('转出数据参数3---'+this.thePaaword);
				let thedata ={
					to_uid : this.theID,
					amount : this.theMount,
					password :this.thePaaword
				}
				let userinfo = uni.getStorageSync('info_data');
				// console.log('用户信息',JSON.stringify(userinfo));
				// 
				// console.log('转出数据参数'+JSON.stringify(thedata));
				this.$post('/api/shop/crb/trunout',thedata).then(res=>{
					// console.log('转出数据---'+JSON.stringify(res));
					if(res.code == 1){
						this.$toast(res.msg)
					}else{
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.box{
		font-size: 16px;
		background-color: #E0E0E0;
		width:100%;
		height:100%;
	}
	.price{
		display: flex;
		flex-direction: row;
		padding: 10upx 15upx 3upx 15upx;
	}
	.querem{
		background-color: #fe6f07;
		padding: 5upx 15upx;
	}
	text{
		
		font-size: 14px;
	}
	.box1 {
		width: 100%;
		height: 100%;
		margin-top: -30px;
	}

</style>