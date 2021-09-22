<template>
	<view>
		<view class="one">
			<text>选择配件：</text>
			<picker mode="selector" :value="index" :range="menuArr" :range-key="'name'" @change="bindPickerChange">
				<view>{{menuArr[index].name}}</view>
			</picker>
		</view>

		<view v-show="showCombox===1" class="type1">
			<view v-if="otherType1_1s" class="type1-1">
				<text>选择品牌：</text>
				<picker mode="selector" :value="index1_1" :range="otherType1_1s" :range-key="'name'"
					@change="bindPickerChange1_1">
					<view>{{otherType1_1s[index1_1].name}}</view>
				</picker>
			</view>
			<view class="type1-2">
				<text>选择系列：</text>
				<picker mode="selector" :value="index1_2" :range="otherType1_2s" :range-key="'name'"
					@change="bindPickerChange1_2">
					<view>{{otherType1_2s[index1_2].name}}</view>
				</picker>
			</view>
			<view class="type1-3">
				<text>选择车型：</text>
				<picker mode="selector" :value="index1_3" :range="otherType1_3s" :range-key="'name'"
					@change="bindPickerChange1_3">
					<view>{{otherType1_3s[index1_3].name}}</view>
				</picker>
			</view>
			<view class="type1-4">
				<text>选择产品：</text>
				<picker mode="selector" :value="index1_4" :range="otherType1_4s" :range-key="'name'"
					@change="bindPickerChange1_4">
					<view>{{otherType1_4s[index1_4].name}}</view>
				</picker>
			</view>
		</view>

		<view v-show="showCombox===2" v-if="otherType2s.length" class="type2">
			<text>选择商品：</text>
			<picker mode="selector" :value="index2" :range="otherType2s" :range-key="'title'"
				@change="bindPickerChange2">
				<view>{{otherType2s[index2].title}}</view>
			</picker>
		</view>
		
		<view class="scan">
			<button @click="btnScan">扫一扫</button>
			<!-- <view class="scan-upload">（上传质保/验证防伪码信息）</view>
			<view class="scan-des">—————— 或 ——————</view> -->
		</view>

		<view class="inputInfo">
			<view>
				<view class="inputInfo-id">
					<input type="text" v-model="commitData.id" placeholder="请输入产品编号"/>
				</view>
				<view class="inputInfo-start-time">
					<text>起始时间：</text>
					<picker mode="date" v-model="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
				<view class="inputInfo-time">
					<input type="number" placeholder="请输入时间" v-model="frontTime" @input="calcTime" />
					<picker mode="selector" :value="indexTime" :range="valueTime" @change="bindPickerChangeTime">
						<view>{{valueTime[indexTime]}}</view>
					</picker>
					<text>(可选择)</text>
				</view>
				<view class="inputInfo-car"> 
					<view>车牌号：</view>
					<view class="inputInfo-car-three">
						<input type="text" v-model="commitData.car.car1" placeholder="粤"/>
						<input type="text" v-model="commitData.car.car2" placeholder="A"/>
						<input type="text" v-model="commitData.car.car3" placeholder="B8888"/>
					</view>
				</view>
				<view class="inputInfo-phone">
					<input type="text" v-model="commitData.phone" placeholder="请输入手机号"/>
				</view>
				<view class="inputInfo-info">
					<input v-model="commitData.info" placeholder="请输入备注" />
				</view>
				<button class="inputInfo-submit" @click="btnSubmit()">提交</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				indexTime: 0,
				valueTime: ['天', '月(30天)', '年(365天)'],
				frontTime: '',
				finishTime: '',
				lastItemId:'',           // 最后的itemId，产品信息
				commitData:{
					id:'',
					phone:'',
					info:'',
					nowTime:'',
					lastTime:'',
					car:{
						car1:'粤',
						car2:'E',
						car3:''
					}
				},
				index: 0,
				index1_1: 0,
				index1_2: 0,
				index1_3: 0,
				index1_4: 0,
				index2: 0,
				menuArr: [],
				menuId: '',
				type: '',
				showCombox: 0,
				otherType2s: [],
				otherType1_1s: [],
				otherType1_2s: [],
				otherType1_3s: [],
				otherType1_4s: [],
				date: currentDate,
			}
		},
		methods: {
			// 提交数据
			btnSubmit(){
				let temp = this.commitData.car.car1 + this.commitData.car.car2 + "·" + this.commitData.car.car3
				let bigTemp = temp.toUpperCase()
				if(!this.lastItemId){
					uni.showToast({
						title:"请选择详细的产品信息",
						duration:1500,
						icon:"none"
					})
					return
				}
				if(!this.commitData.id || !this.commitData.lastTime || !this.commitData.phone){
					uni.showToast({
						title:"请将信息填写完整",
						duration:1500,
						icon:"none"
					})
					return
				}
				let header = getApp().globalData.header;
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/guarantee/insertGuarantee.admin.api`,
						method: "POST",
						dataType:"json",
						header: header,
						data:{
							identification:this.commitData.id,
							startDate:this.commitData.nowTime,
							endDate:this.commitData.lastTime,
							itemType:this.type,
							itemId:this.lastItemId,
							info:this.commitData.info,
							telephone:this.commitData.phone,
							carNumber:bigTemp,
						}
					})
					.then(res => {
						if(res.status===8000){
							uni.showToast({
								title:"质保录入成功",
								duration:1500
							})
						}else {
							uni.showToast({
								title:res.message,
								duration:1500,
								icon:"none"
							})
						}
					}).catch(err=>{
						console.log(err);
					})
			},
			// 扫码
			btnScan() {
				let that=this
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						if(res.result.indexOf("MXM")==0){
							that.commitData.id=res.result
							that.$forceUpdate()
						}else{
							uni.showToast({
								title: '请扫码指定的产品',
								duration: 1500,
								icon: "none"
							});
						}
					}
				});
			},
			/* 计算时间 */
			calcTime() {
				let date = new Date().getTime()
				this.commitData.nowTime=date
				if (this.indexTime === 0) {
					this.commitData.lastTime=date + this.frontTime*86400*1000+3600*8*1000
				} else if (this.indexTime === 1) {
					this.commitData.lastTime=date + this.frontTime*86400*30*1000+3600*8*1000
				} else {
					this.commitData.lastTime=date + this.frontTime*86400*365*1000+3600*8*1000
				}
			},
			/* picker的事件 */
			bindPickerChange(e) {
				// console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.type = this.menuArr[this.index].type
				if (this.menuArr[this.index].type === 1) {
					this.showCombox = 1
					this.menuId = this.menuArr[this.index].menuId
					this.getBrand()
				} else {
					this.getType2(this.menuArr[this.index].menuId)
					this.showCombox = 2
				}
			},
			bindPickerChangeTime(e) {
				this.indexTime = e.target.value
			},
			// type2
			bindPickerChange2(e) {
				this.index2 = e.target.value
				this.lastItemId=this.otherType2s[this.index2].itemSingleId
				// console.log(this.lastItemId);
			},
			// type1	
			bindPickerChange1_1(e) {
				this.index1_1 = e.target.value
				this.getCarType(this.otherType1_1s[this.index1_1].brandmenuId)
			},
			bindPickerChange1_2(e) {
				this.index1_2 = e.target.value
				this.getDetailCar(this.otherType1_2s[this.index1_2].seriesId)
			},
			bindPickerChange1_3(e) {
				this.index1_3 = e.target.value
				this.getItemCost(this.otherType1_3s[this.index1_3].modelId)
			},
			bindPickerChange1_4(e) {
				this.index1_4 = e.target.value
				this.lastItemId=this.otherType1_4s[this.index1_4].itemId
			},
			// 获取菜单的请求
			getMenu() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/menu/getAllMenu.api`
					})
					.then(res => {
						this.menuArr = res.data
					})
			},
			// 获取热门商品请求
			getType2(menuId) {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/itemSingle/getItemSingleByMenuId.api?menuId=${menuId}`
					})
					.then(res => {
						this.otherType2s = res.data
					})
			},
			// 获取type1
			getBrand() {
				// 获取品牌名
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/brandmenu/getAllBrandmenu.api`
					})
					.then(res => {
						this.otherType1_1s = res.data
						this.otherType1_1s.unshift({name:"请选择"})
						// console.log(this.otherType1_1s);
					})
			},
			getCarType(brandmenuId) {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/series/getSeriesByBrandmenuId.api?brandmenuId=${brandmenuId}`
					})
					.then(res => {
						this.otherType1_2s = res.data
						this.otherType1_2s.unshift({name:"请选择"})
						// console.log(this.otherType2s);
					})
			},
			getDetailCar(seriesId) {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/model/getModelBySeriesId.api?seriesId=${seriesId}`
					})
					.then(res => {
						this.otherType1_3s = res.data
						this.otherType1_3s.unshift({name:"请选择"})
						// console.log(this.otherType2s);
					})
			},
			getItemCost(modelId) {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/item/getItemByModelIdAndMenuId.api?modelId=${modelId}&menuId=${this.menuId}`
					})
					.then(res => {
						this.otherType1_4s = res.data
						this.otherType1_4s.unshift({name:"请选择"})
						console.log(res.data);
					})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		mounted() {
			this.getMenu()
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss">
	.one {
		padding-top: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		font-size: 32rpx;
		justify-content: center;
	}

	.type1 {
		font-size: 32rpx;

		.type1-1 {
			padding-top: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
		}

		.type1-2 {
			padding-top: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
		}

		.type1-3 {
			padding-top: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
		}

		.type1-4 {
			padding-top: 20rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
		}
	}

	.type2 {
		font-size: 32rpx;
		padding-top: 20rpx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
	}
	
	.scan {
		margin-top: 40rpx;
		color: #fff;
		text-align: center;
		
		button{
			width: 70%;
		}
	
		.scan-upload {
			margin-top: 20rpx;
		}
		
		.scan-des {
			margin-top: 20rpx;
		}
	}
	
	.inputInfo{
		display: flex;
		font-size: 32rpx;
		justify-content: center;
		/* 编号id */
		.inputInfo-id{
			margin-top: 20rpx;
			border: 3rpx solid #333;
			margin-bottom: 30rpx;
			border-radius: 6rpx;
			padding: 10rpx;
		}
		/* 起始时间 */
		.inputInfo-start-time{
			display: flex;
			flex-wrap: nowrap;
			margin-bottom: 30rpx;
		}
		/* 质保时间 */
		.inputInfo-time{
			display: flex;
			flex-wrap: nowrap;
			margin-bottom: 20rpx;
			input{
				border: 3rpx solid #333;
				margin-right: 10rpx;
				border-radius: 6rpx;
				height: 70rpx;
				padding: 10rpx;
			}
			picker{
				text-align: center;
				border-radius: 30rpx;
				line-height: 70rpx;
				width: 150rpx;
				background-color: #eee;
			}
			text{
				line-height: 70rpx;	
			}
		}
		/* 车牌号 */
		.inputInfo-car{
			margin-bottom: 20rpx;
			.inputInfo-car-three{
				margin-top: 6rpx;
				display: flex;
				flex-wrap: nowrap;
				input{
					width: 200rpx;
					margin: 10rpx;
					border: 3rpx solid #333;
					border-radius: 6rpx;
					height: 70rpx;
					padding: 10rpx;
				}
			}
		}
		/* 手机号 */
		.inputInfo-phone{
			border: 3rpx solid #333;
			margin-bottom: 20rpx;
			border-radius: 6rpx;
			height: 70rpx;
			padding: 10rpx;
		}
		/* 备注 */
		.inputInfo-info{
			border: 3rpx solid #333;
			margin-bottom: 20rpx;
			border-radius: 6rpx;
			height: 150rpx;
			padding: 10rpx;
		}
		/* 提交 */
		.inputInfo-submit{
			width: 80%;
			background-color: $uni-font-size-theme;
		}
	}
</style>
