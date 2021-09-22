<template>
	<view>
		<!-- 具体内容 -->
		<view class="sc-content">
			<view>{{brandName}}</view>
			<view v-show="carMode">{{carMode}}</view>
			<view v-show="detailCarMode">{{detailCarMode}}</view>
		</view>
		<view>
			<!-- 右侧抽屉 -->
			<uni-drawer ref="showRight" mode="right" :mask="false" :mask-click="false" :width="150">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="drawer-item" v-for="(item,index) in brandTypes" @click="itemCarType(item.seriesId,item.name)" :key="index">{{ item.name }}</view>
					<div></div>
					<button @click="closeDrawer" type="">返回</button>
				</scroll-view>
			</uni-drawer>
			<uni-drawer ref="showRight2" mode="right" :mask="false" :mask-click="false" :width="150">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="drawer-item" v-for="(item1,index1) in showDetailCarTypes" @click="itemDetailCarType(item1.modelId,item1.name)" :key="index1">{{ item1.name }}</view>
					<button @click="closeDrawer2" type="">返回</button>
				</scroll-view>
			</uni-drawer>
			<uni-drawer ref="showRight3" mode="right" :mask="false" :mask-click="false" :width="150">
				<scroll-view style="height: 100%;" scroll-y="true">
					<view class="drawer-item" v-for="(item2,index2) in detailCarType" @click="" :key="index2">
						<navigator :url="`./calcPrice/CalcPrice?id=${item2.itemId}`">{{ item2.name }}</navigator>
					</view>
					<button @click="closeDrawer3" type="">返回</button>
				</scroll-view>
			</uni-drawer>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				brandMenuId: '',     // 品牌id
				brandName:'',        // 品牌名
				carMode:'',
				menuId:'', 
				detailCarMode:'',
				// carProduct:'',
				brandTypes:[],
				detailCarType:[],    // 选择具体车型
				showDetailCarType:1,
				showDetailCarTypes:[]
			}
		},
		// 页面加载完毕触发onLoad
		onLoad(options) {
			this.brandMenuId = options.id
			this.brandName=options.name
			// console.log(this.brandName);
			// console.log(this.brandMenuId);
		},
		methods: {
			// 获取车型信息
			getCarType(brandMenuId) {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/series/getSeriesByBrandmenuId.api?brandmenuId=${brandMenuId}`
					})
					.then(res => {
						this.brandTypes=res.data
					})
			},
			// 返回上个界面
			closeDrawer() {
				// 关抽屉
				// this.$refs.showRight.close();
				uni.navigateBack()
			},
			closeDrawer2(){
				// this.showDetailCarType=1	
				this.carMode=""
				this.$refs.showRight2.close()
				this.$refs.showRight.open();
			},
			closeDrawer3(){
				this.detailCarMode=""
				this.$refs.showRight3.close()
				this.$refs.showRight2.open();
			},
			// 点击CarType
			itemCarType(seriesId,name){
				this.carMode=name
				
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/model/getModelBySeriesId.api?seriesId=${seriesId}`
					})
					.then(res => {
						this.$refs.showRight.close()
						// this.showDetailCarType=2
						this.showDetailCarTypes=res.data
						this.$refs.showRight2.open();
						setTimeout(()=>{
							
						},100)
					})
			},
			// 选择具体车型
			itemDetailCarType(modelId,name){
				this.detailCarMode=name
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/item/getItemByModelIdAndMenuId.api?modelId=${modelId}&menuId=${getApp().globalData.selectedMenuId}`
					})
					.then(res => {
						this.$refs.showRight2.close()
						this.detailCarType=res.data
						this.$refs.showRight3.open();
					})
			}
		},
		mounted() {
			this.getCarType(this.brandMenuId)
			// 打开抽屉
			this.$refs.showRight.open();
		}
	}
</script>

<style lang="scss">
	.sc-content{
		padding-top: 40%;
		width: 60%;
		// height: 100vh;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// flex-flow: column;
		view{
			color: #333;
			border-bottom: 10rpx solid #666;
			text-align: center;
			font-size: 40rpx;
			margin: 20rpx;
		}
	}
	uni-drawer{
		opacity: 0.7;
		scroll-view{
			border-left: 4rpx solid #333;
			.drawer-item{
				color: #333;
				font-size: 32rpx;
				border-bottom: 3rpx solid #eee;
				text-align: center;
				padding:16rpx 0;
			}
		}
	}
	
	div{
		margin-top: 100rpx;
	}
	button{
		height: 100rpx;
		line-height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-style: none;
		border-radius: 0;
		font-size: 32rpx;
		color: #fccf01;
		font-weight: 700;
		background-color: #111;
	}
</style>
