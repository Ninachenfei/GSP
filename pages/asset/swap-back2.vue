<template>
	<view class="box">
		<view style="padding: 15upx;">
			<view class="box1">
				<!-- 引入的mpvue-echarts组件 -->
				<mpvue-echarts canvasId="chat1" :echarts="echarts" :onInit="fn1OnInit" />
			</view>
	 

			<!-- crb -->
			<view style="background-color: #fff;;;padding: 5upx;">
				<view style="padding: 10upx 15upx 3upx 15upx;">
					<text>CRB</text>
				</view>
				<view style="padding: 15upx;" class="price">
				  <view>
				  	 <text>价格:</text>
					 <text style="color:#000">123456</text>
				  </view>
				  <view style="margin-left:100upx">
					 <text>数量:</text>
					 <text style="color:#000">265487</text>
				  </view>	
				</view>
			</view>
			
			<!-- gsp -->
			<view style="background-color: #fff;;;padding: 5upx;margin-top:15upx">
				<view style="padding: 10upx 15upx 3upx 15upx;">
					<text>JSP</text>
				</view>
				<view style="padding: 15upx;" class="price">
				  <view>
				  	 <text>价格:</text>
					 <text style="color:#000">123456</text>
				  </view>
				  <view style="margin-left:100upx">
					 <text>数量:</text>
					 <text style="color:#000">265487</text>
				  </view>	
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	//导入库
	import * as echarts from '@/components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';	
 
	//命名一个方法名称，方便自己识别，也方便多个图表引用时易区别。
	//切记这方法不能写到export default中。
	function fn1(canvas, width, height) {
		const chart = echarts.init(canvas, null, {
			width: width,
			height: height
		})
		canvas.setChart(chart);
 
		let option = {
			title: { 
				text: '未来一周气温变化',
				subtext: '纯属虚构'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['最高气温', '最低气温']
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['line', 'bar']
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value} °C'
				}
			}],
			series: [{
					name: '最高气温',
					type: 'line',
					data: [11, 11, 15, 13, 12, 13, 10],
					markPoint: {
						data: [{
								type: 'max',
								name: '最大值'
							},
							{
								type: 'min',
								name: '最小值'
							}
						]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				},
				{
					name: '最低气温',
					type: 'line',
					data: [1, -2, 2, 5, 3, 2, 0],
					markPoint: {
						data: [{
							name: '周最低',
							value: -2,
							xAxis: 1,
							yAxis: -1.5
						}]
					},
					markLine: {
						data: [{
							type: 'average',
							name: '平均值'
						}]
					}
				}
			]
		};
 
 
		chart.setOption(option)
		return chart
	};
 
 
	export default{
		data() {
			return {
				// title: 'Hello',
				//初始化图表
				echarts,
				//图表数据绑定（我们定义的两个方法绑定）
				fn1OnInit: fn1
			};
		},
		components: {
			mpvueEcharts
		},
		created() {
			console.log("1243124312341");
			//获取k线数据
			this.getMykxData();
			//获取k线数据
			this.getcrbData();
		},
		onLoad(e){
			
		},
		onNavigationBarButtonTap() {
			
		},
		computed:{
			
		},
		methods: {
			getMykxData (){
				this.$get('/api/shop/crb/crbKLine').then(res=>{
					console.log("我的数据1",res);
					if(res.code == 1){
						
					}else{
						this.$toast(res.msg)
					}
				})
			},
			getcrbData(){
				console.log("我的数据1213");
				this.$get('/api/shop/crb/data').then(res=>{
					console.log("我的数据2",res);
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
		
	}
	text{
		
		font-size: 14px;
	}
	.box1 {
		width: 100%;
		height: 100%;
	}

</style>