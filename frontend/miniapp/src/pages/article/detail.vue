<template>
  <view class="page-container" v-if="article">
    <view class="detail-header card">
      <text class="detail-title">{{ article.title }}</text>
      <view class="detail-meta">
        <text>{{ article.category_name || '' }}</text>
        <text>{{ article.create_time }}</text>
        <text v-if="article.author">作者: {{ article.author }}</text>
      </view>
    </view>
    <view class="detail-content card">
      <rich-text v-if="article.content" :nodes="article.content" />
      <text v-else class="empty-text">暂无内容</text>
    </view>
    <view v-if="article.tags" class="detail-tags card">
      <text class="tag" v-for="(t, i) in article.tags.split(',')" :key="i">{{ t.trim() }}</text>
    </view>
  </view>
  <view v-else class="loading-text">加载中...</view>
</template>

<script setup lang="ts">
import { ref, onLoad } from '@dcloudio/uni-app'
import { getArticleDetailApi } from '@/api/index'

const article = ref<any>(null)

onLoad((options: any) => {
  const id = parseInt(options?.id || '0')
  if (id) {
    getArticleDetailApi(id).then(r => { article.value = r.data }).catch(() => {})
  }
})
</script>

<style scoped>
.detail-header { margin-bottom: 16rpx; }
.detail-title { font-size: 36rpx; font-weight: bold; display: block; margin-bottom: 16rpx; }
.detail-meta { font-size: 24rpx; color: #999; display: flex; justify-content: space-between; }
.detail-content { margin-bottom: 16rpx; padding: 24rpx; line-height: 1.8; font-size: 30rpx; }
.detail-tags { display: flex; flex-wrap: wrap; }
.tag { background: #e8f4fd; color: #1989fa; padding: 6rpx 16rpx; border-radius: 6rpx; margin-right: 12rpx; margin-bottom: 12rpx; font-size: 24rpx; }
.loading-text, .empty-text { text-align: center; padding: 80rpx 0; color: #999; font-size: 28rpx; }
</style>
