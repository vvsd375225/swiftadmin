<template>
  <view class="page-container">
    <view v-if="loading && page === 1" class="loading-text">加载中...</view>
    <view v-else>
      <view class="article-item card" v-for="a in articles" :key="a.id" @click="goDetail(a.id)">
        <image v-if="a.cover" :src="a.cover" class="article-cover" mode="aspectFill" />
        <view class="article-body">
          <text class="article-title">{{ a.title }}</text>
          <text class="article-summary">{{ a.summary || '' }}</text>
          <view class="article-meta">
            <text>{{ a.category_name || '' }}</text>
            <text>{{ a.create_time }}</text>
          </view>
        </view>
      </view>
      <view v-if="articles.length === 0 && !loading" class="empty-text">暂无文章</view>
      <view v-if="hasMore" class="load-more" @click="loadMore">点击加载更多</view>
      <view v-else-if="articles.length > 0" class="load-more">没有更多了</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onPullDownRefresh } from '@dcloudio/uni-app'
import { getArticleListApi } from '@/api/index'

const articles = ref<any[]>([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const hasMore = computed(() => articles.value.length < total.value)

async function fetchArticles(isRefresh = false) {
  loading.value = true
  try {
    const r = await getArticleListApi(page.value, 10)
    if (isRefresh) { articles.value = r.data.list || [] }
    else { articles.value = [...articles.value, ...(r.data.list || [])] }
    total.value = r.data.total || 0
  } catch (e) { /* handled */ }
  loading.value = false
}

function loadMore() { page.value++; fetchArticles() }
function goDetail(id: number) { uni.navigateTo({ url: '/pages/article/detail?id=' + id }) }

onPullDownRefresh(async () => {
  page.value = 1
  await fetchArticles(true)
  uni.stopPullDownRefresh()
})

import { computed } from 'vue'
fetchArticles()
</script>

<style scoped>
.article-item { margin-bottom: 16rpx; }
.article-cover { width: 100%; height: 340rpx; border-radius: 8rpx 8rpx 0 0; }
.article-body { padding: 10rpx 0; }
.article-title { font-size: 30rpx; font-weight: bold; display: block; margin-bottom: 8rpx; }
.article-summary { font-size: 24rpx; color: #999; display: block; margin-bottom: 8rpx; }
.article-meta { font-size: 22rpx; color: #bbb; display: flex; justify-content: space-between; }
.load-more { text-align: center; padding: 24rpx 0; color: #1989fa; font-size: 26rpx; }
.loading-text, .empty-text { text-align: center; padding: 80rpx 0; color: #999; font-size: 28rpx; }
</style>
