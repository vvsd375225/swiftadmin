<template>
  <view class="page-container">
    <swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" circular>
      <swiper-item v-for="(b, i) in banners" :key="i">
        <view class="banner-item" :style="{ backgroundColor: b.color }">
          <text class="banner-title">{{ b.title }}</text>
          <text class="banner-desc">{{ b.desc }}</text>
        </view>
      </swiper-item>
    </swiper>

    <view class="grid-menu">
      <view class="grid-item" v-for="(m, i) in menus" :key="i" @click="onMenuClick(m)">
        <view class="grid-icon" :style="{ backgroundColor: m.color }">{{ m.icon }}</view>
        <text class="grid-text">{{ m.name }}</text>
      </view>
    </view>

    <view class="section-header">
      <text class="section-title">最新文章</text>
      <text class="section-more" @click="goArticle">更多 ></text>
    </view>

    <view v-if="loading" class="loading-text">加载中...</view>
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
      <view v-if="articles.length === 0" class="empty-text">暂无文章</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getArticleListApi } from '@/api/index'

const banners = ref([
  { title: 'SwiftAdmin', desc: '高效管理后台解决方案', color: '#1989fa' },
  { title: '小程序端', desc: '随时随地管理内容', color: '#07c160' },
  { title: '多端支持', desc: 'H5 + 小程序全覆盖', color: '#ff976a' }
])
const menus = ref([
  { name: '文章管理', icon: '📝', color: '#e8f4fd', path: '/pages/article/index' },
  { name: '消息中心', icon: '🔔', color: '#fff0e8', path: '/pages/message/index' },
  { name: '个人中心', icon: '👤', color: '#e8f8e8', path: '/pages/user/user' },
  { name: '更多功能', icon: '📦', color: '#f5e8ff', path: '' }
])

const articles = ref<any[]>([])
const loading = ref(true)

async function fetchArticles() {
  loading.value = true
  try {
    const r = await getArticleListApi(1, 5)
    articles.value = r.data.list || []
  } catch (e) { /* handled in request */ }
  loading.value = false
}

function goArticle() { uni.switchTab({ url: '/pages/article/index' }) }
function goDetail(id: number) { uni.navigateTo({ url: '/pages/article/detail?id=' + id }) }
function onMenuClick(m: any) {
  if (m.path) {
    if (m.path.includes('article') || m.path.includes('message') || m.path.includes('user')) {
      uni.switchTab({ url: m.path })
    } else {
      uni.navigateTo({ url: m.path })
    }
  }
}

fetchArticles()
</script>

<style scoped>
.banner { height: 320rpx; }
.banner-item {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%; color: #fff;
}
.banner-title { font-size: 40rpx; font-weight: bold; margin-bottom: 12rpx; }
.banner-desc { font-size: 26rpx; opacity: 0.85; }
.grid-menu {
  display: flex; flex-wrap: wrap; padding: 20rpx 16rpx; background: #fff;
  margin: 0 20rpx; border-radius: 12rpx; margin-top: -20rpx; position: relative; z-index: 1;
}
.grid-item { width: 25%; display: flex; flex-direction: column; align-items: center; padding: 20rpx 0; }
.grid-icon { width: 80rpx; height: 80rpx; border-radius: 20rpx; display: flex; align-items: center; justify-content: center; font-size: 36rpx; }
.grid-text { font-size: 24rpx; color: #666; margin-top: 10rpx; }
.section-header { display: flex; justify-content: space-between; align-items: center; padding: 30rpx 20rpx 10rpx; }
.section-title { font-size: 32rpx; font-weight: bold; }
.section-more { font-size: 26rpx; color: #1989fa; }
.article-item { display: flex; margin-bottom: 16rpx; }
.article-cover { width: 180rpx; height: 130rpx; border-radius: 8rpx; flex-shrink: 0; }
.article-body { flex: 1; margin-left: 20rpx; display: flex; flex-direction: column; justify-content: space-between; }
.article-title { font-size: 28rpx; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.article-summary { font-size: 24rpx; color: #999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.article-meta { font-size: 22rpx; color: #bbb; display: flex; justify-content: space-between; }
.loading-text, .empty-text { text-align: center; padding: 60rpx 0; color: #999; font-size: 28rpx; }
</style>
