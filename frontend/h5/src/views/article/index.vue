<template>
  <div class="page">
    <van-nav-bar title="文章" fixed />
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="load">
        <van-list v-model:loading="loading" :finished="finished" @load="load">
          <van-cell v-for="a in articles" :key="a.id" :title="a.title" :label="a.summary||a.category_name+' · '+a.views+'浏览'" is-link @click="goDetail(a.id)">
            <template #icon><van-image v-if="a.cover" :src="a.cover" width="60" height="60" fit="cover" radius="4" style="margin-right:10px" /></template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-tabbar v-model="active" route active-color="#1989fa">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/article" icon="notes-o">文章</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getArticleList } from '@/api/index'
const router = useRouter()
const active = ref(1); const loading = ref(false); const finished = ref(false); const refreshing = ref(false)
const articles = ref<any[]>([])
let page = 1

async function load() {
  if (refreshing.value) { page = 1; articles.value = []; finished.value = false }
  loading.value = true
  try { const r: any = await getArticleList({ page, limit: 10 }); const list = r.data.list || []; articles.value.push(...list); if (list.length < 10) finished.value = true; page++ } catch(e){} finally { loading.value = false; refreshing.value = false }
}
function goDetail(id: number) { router.push('/article?id=' + id) }
</script>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.content { padding-top: 46px; padding-bottom: 50px; }
</style>
