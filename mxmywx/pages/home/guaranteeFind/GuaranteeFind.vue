<template>
	<view class="g">
		<view class="scan">
			<button @click="btnScan">扫一扫</button>
			<view class="scan-upload">（上传质保/验证防伪码信息）</view>
			<view class="scan-des">—————— 或 ——————</view>
		</view>
		<view class="search">
			<form method="post">
				<view class="search-id">
					<text>产品编号：</text>
					<input type="text" @click="idClick" @input="idFocus" v-model="id" :disabled="disableId"
						placeholder="请输入产品编号"></input>
				</view>
				<view class="search-carId">
					<text>车牌号：</text>
					<view class="carId">
						<input type="text" @click="carIdClick" v-model="carId1" @input="carIdFocus" :disabled="disableCarId"
							class="search-carId1" placeholder="粤"></input>
						<input type="text" @click="carIdClick" v-model="carId2" @input="carIdFocus" :disabled="disableCarId"
							class="search-carId2" placeholder="A"></input>
						<input type="text" @click="carIdClick" v-model="carId3" @input="carIdFocus" :disabled="disableCarId"
							class="search-carId3" placeholder="b8888"></input>
					</view>
				</view>
				<view class="search-phone">
					<text>手机号：</text>
					<input @click="phoneClick" @input="phoneFocus" :disabled="disablePhone" type="text" v-model="phone"
						placeholder="请输入手机号"></input>
				</view>
				<view>
					<button class="search-btn" @click="queryId()" type="submit">立即查询</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				carId1: '',
				carId2: '',
				carId3: '',
				phone: '',
				disableId: false,
				disableCarId: false,
				disablePhone: false,
			}
		},
		methods: {
			btnScan() {
				let that=this
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						if(res.result.indexOf("MXM")==0){
							that.id=res.result
							that.getIdNet(res.result)
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
			// 扫码完直接请求
			getIdNet(result){
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/guarantee/getGuaranteeByIdentification.api?identification=${result}`
					})
					.then(res => {
						if (res.data.length) {
							getApp().globalData.queryResult1 = res.data
							uni.navigateTo({
								url: `./guaranteeFindDetail/GuaranteeFindDetail`
							})
						} else {
							uni.showToast({
								title: '您的输入有误，请检查',
								duration: 1500,
								icon: "none"
							});
						}
					})
			},
			// 焦点事件
			idFocus() {
				if (this.id) {
					this.disableId = false
					this.disableCarId = true
					this.disablePhone = true
				} else {
					this.disableId = false
					this.disableCarId = false
					this.disablePhone = false
				}
			},
			carIdFocus() {
				if (this.carId1) {
					this.disableId = true
					this.disableCarId = false
					this.disablePhone = true
				} else {
					this.disableId = false
					this.disableCarId = false
					this.disablePhone = false
				}
			},
			phoneFocus() {
				if (this.phone) {
					this.disableId = true
					this.disableCarId = true
					this.disablePhone = false
				} else {
					this.disableId = false
					this.disableCarId = false
					this.disablePhone = false
				}
			},
			// 点击事件
			idClick() {
				if (this.disableId) {
					uni.showToast({
						title: '只需要输入一项即可完成查询，如需通过其他信息查询请情况当前信息',
						duration: 3000,
						icon: "none"
					});
				}
			},
			carIdClick() {
				if (this.disableCarId) {
					uni.showToast({
						title: '只需要输入一项即可完成查询，如需通过其他信息查询请情况当前信息',
						duration: 3000,
						icon: "none"
					});
				}
			},
			phoneClick() {
				if (this.disablePhone) {
					uni.showToast({
						title: '只需要输入一项即可完成查询，如需通过其他信息查询请情况当前信息',
						duration: 3000,
						icon: "none"
					});
				}
			},
			// 查询
			queryId() {
				if (!this.phone && !this.id && !(this.carId1 && this.carId2 && this.carId3)) {
					uni.showToast({
						title: '请输入至少一项',
						duration: 1500,
						icon: "none"
					});
					return
				}
				if (this.phone) {
					this.request({
							url: `${getApp().globalData.http}/qaasms/api/guarantee/getGuaranteeByTelephone.api?telephone=${this.phone}`
						})
						.then(res => {
							if (res.data.length) {
								getApp().globalData.queryResult1 = res.data
								uni.navigateTo({
									url: `./guaranteeFindDetail/GuaranteeFindDetail`
								})
							} else {
								uni.showToast({
									title: '您的输入有误，请检查',
									duration: 1500,
									icon: "none"
								});
							}
						})
				} else if (this.carId1 && this.carId2 && this.carId3) {
					let temp = this.carId1 + this.carId2 + "·" + this.carId3
					let bigTemp = temp.toUpperCase()
					// console.log(bigTemp);
					this.request({
							url: `${getApp().globalData.http}/qaasms/api/guarantee/getGuaranteeByCarNumber.api?carNumber=${bigTemp}`
						})
						.then(res => {
							if (res.data.length) {
								getApp().globalData.queryResult1 = res.data
								uni.navigateTo({
									url: `./guaranteeFindDetail/GuaranteeFindDetail`
								})
							} else {
								uni.showToast({
									title: '您的输入有误，请检查',
									duration: 1500,
									icon: "none"
								});
							}
						})
				} else {
					this.request({
							url: `${getApp().globalData.http}/qaasms/api/guarantee/getGuaranteeByIdentification.api?identification=${this.id}`
						})
						.then(res => {
							if (res.data.length) {
								getApp().globalData.queryResult1 = res.data
								uni.navigateTo({
									url: `./guaranteeFindDetail/GuaranteeFindDetail`
								})
							} else {
								uni.showToast({
									title: '您的输入有误，请检查',
									duration: 1500,
									icon: "none"
								});
							}
						})
				}
			}
		}
	}
</script>

<style lang="scss">
	.g {
		height: 100vh;
		background-color: #2a2a2a;
		padding-top: 50rpx;

		/* 扫码 */
		.scan {
			color: #fff;
			margin-bottom: 30%;
			text-align: center;
			
			button{
				width: 70%;
			}

			.scan-upload {
				margin-top: 30rpx;
			}
			
			.scan-des {
				margin-top: 30rpx;
			}
		}

		/* 输入 */
		.search {
			color: #fff;
			display: flex;
			align-content: center;
			justify-content: center;

			.search-id {
				display: flex;
				flex-flow: row nowrap; 
				align-items: center;
				margin-bottom: 50rpx;
				
				text{
					width: 150rpx;
				}

				input {
					background-color: white;
					color: $uni-text-color;
					border-radius: $uni-border-radius;
					width: 500rpx;
					height: 70rpx;
					border: #fff solid 3rpx;
					padding: 10rpx;
				}
			}

			.search-carId {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				height: 70rpx;
				// width: 500rpx;
				margin-bottom: 50rpx;
				
				text{
					width: 150rpx;
				}
				
				.carId{
					display: flex;
					height: 100%;
					flex-wrap: nowrap;
					.search-carId1 {
						width: 80rpx;
						border: #fff solid 3rpx;
						height: 100%;
						background-color: white;
						color: $uni-text-color;
						border-radius: $uni-border-radius;
						padding-left: 20rpx;
					}
					
					.search-carId2 {
						width: 80rpx;
						border: #fff solid 3rpx;
						margin-left: 20rpx;
						height: 100%;
						margin-left: 20rpx;
						background-color: white;
						color: $uni-text-color;
						border-radius: $uni-border-radius;
						padding-left: 20rpx;
					}
					
					.search-carId3 {
						flex:1;
						width: 300rpx;
						border: #fff solid 3rpx;
						margin-left: 20rpx;
						height: 100%;
						margin-left: 20rpx;
						background-color: white;
						color: $uni-text-color;
						border-radius: $uni-border-radius;
						padding-left: 20rpx;
					}
				}
			}

			.search-phone {
				display: flex;
				flex-wrap: nowrap;
				margin-bottom: 50rpx;

				text{
					width: 150rpx;
				}
				
				input {
					flex:1;
					height: 70rpx;
					border: #fff solid 3rpx;
					padding: 10rpx;
					background-color: white;
					color: $uni-text-color;
					border-radius: $uni-border-radius;
				}
			}

			.search-btn {
				border: #fff solid 3rpx;
			}
		}
	}
</style>
