<template>
	<view>
		<uni-segmented-control class="control" :current="current" :values="items.map(v => v.name)" @clickItem="onClickItem"
			styleType="text" activeColor="#fccf01">
		</uni-segmented-control>
		<list>
		    <!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
		    <cell v-for="(item, index) in dataList" :key="index">
		      <navigator v-if="items[current].type===1" :url="`../selectCar/SelectCar?id=${item.brandmenuId}&name=${item.name}`" class="list-item">{{item.name}}</navigator>
		      <navigator v-else :url="`./otherTab/OtherTab?htm=${item.pageUrl}`" class="list-item-other">
				  <image :src="item.img" mode=""></image>
				  <text class="list-item-other-title">{{item.title}}</text>
				  <!-- <text class="list-item-other-costMin"></text> -->
				  <text class="list-item-other-costMax">{{item.costMin}}-{{item.costMax}}¥</text>
			  </navigator>
		    </cell>
		  </list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				current: 0,
				dataList: []
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					if(this.items[this.current].type===2){
						this.getTabBarItem2(this.current+1)
					}else{
						this.getgetTabBarItem(this.current+1)
						getApp().globalData.selectedMenuId=this.current+1
					}
				}
			},
			// 获取tabbar
			getTabBarName(){
				this.request({
					url:`${getApp().globalData.http}/qaasms/api/menu/getAllMenu.api`
				})
				.then(res=>{
					this.items=res.data
				})
			},
			// 获取tabbar子菜单
			getgetTabBarItem(menuId){
				this.request({
					url:`${getApp().globalData.http}/qaasms/api/brandmenu/getAllBrandmenu.api`
				})
				.then(res=>{
					this.dataList=res.data
					// console.log(res.data);
				})
			},
			// 获取热门的tabbar子内容
			getTabBarItem2(menuId){
				this.request({
					url:`${getApp().globalData.http}/qaasms/api/itemSingle/getItemSingleByMenuId.api?menuId=${menuId}`
				})
				.then(res=>{
					this.dataList=res.data
					console.log(res.data);
				})
			}
		},
		mounted() {
			this.getTabBarName()
			this.getgetTabBarItem(this.current+1)
		}
	}
</script>

<style lang="scss">
	list{
		.list-item{
			font-size: 32rpx;
			border-bottom: #eee solid 4rpx;
			padding: 30rpx 20rpx;
		}
		.list-item-other{
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 120rpx;
			border-bottom: #eee solid 3rpx;
			image{
				width: 95rpx;
				height: 95rpx;
			}
			.list-item-other-title{
				
			}
			.list-item-other-costMin{
				margin-left: 30rpx;
			}
			.list-item-other-costMax{
				font-size: 32rpx;
				font-weight: 700;
				text-shadow: 4rpx 4rpx 4rpx #bbb;
				color: #fccf01;
			}
		}
	}
	.control{
		background-color: #505050;
	}
</style>
