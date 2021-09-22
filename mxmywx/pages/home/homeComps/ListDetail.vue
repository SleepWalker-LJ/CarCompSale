<template>
	<view>
		<web-view :src="articleList.content"></web-view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				articleList:[]
			}
		},
		onLoad(options) {
			this.id=options.id
			this.articleList=getApp().globalData.listDetail[this.id]
		}
	}
</script>

<style lang="scss">
</style>
