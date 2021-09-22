<template>
	<view class="CalcPrice">
		<view class="c-total">RMB:{{totalPrice}}</view>
		<view class="c-center"></view>
		<view class="c-item" v-for="(value,key) in dataList" :key="key" :class="{}">
			<checkbox-group @change="checkboxChange(key,value)">
				<label>
					<text>{{key}} : {{value}} ￥</text>
					<checkbox/>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: {},
				itemId: '',
				totalPrice: 0,
				arr: [],
				
			}
		},
		onLoad(options) {
			this.itemId = options.id
		},
		methods: {
			// 机件
			getParts() {
				this.request({
						url: `${getApp().globalData.http}/qaasms/api/item/getItemCostById.api?itemId=${this.itemId}`
					})
					.then(res => {
						this.dataList = res.data
						// let arr = Object.keys(this.dataList)
						// let arr2
						// for (let var1 in this.dataList) {
						// 	console.log(var1);
						// }
						// for (let i = arr.length; i >=0; i--) {
						// 	arr2=this.dataList[i]
						// }
						// this.dataList=arr2
						console.log(res.data);
					})
			},
			checkboxChange(key, value) {
				if (this.arr.length > 0) {
					if (this.arr.indexOf(key) > -1) {
						this.arr = this.arr.filter((it) => {
							return it != key
						})
					} else {
						this.arr.push(key)
					}
				} else {
					this.arr.push(key)
				}
				// 价钱
				this.totalPrice = 0
				for (let i = 0; i < this.arr.length; i++) {
					console.log(this.dataList[this.arr[i]]);
					this.totalPrice += this.dataList[this.arr[i]]
				}
			}
		},
		mounted() {
			this.getParts()
		}
	}
</script>

<style lang="scss">
	.active{
		background-color: skyblue;
	}
	.CalcPrice{
		font-size: 32rpx;
		.c-total{
			background-color: #505050;
			font-size: 40rpx;
			font-weight: 700;
			color: #fccf01;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-bottom: #fccf01 solid 3rpx;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 9;
		}
		.c-center{
			margin-bottom: 100rpx;
		}
		.c-item {
			border-bottom: 3rpx #eee solid;
			padding: 30rpx;
			position: relative;
			text{
				width: 60%;
			}
			checkbox{
				position: absolute;
				right: 30rpx;
				top: 15rpx;
			}
		}
	}
</style>
