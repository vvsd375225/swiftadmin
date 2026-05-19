<template>
  <div class="page">
    <van-nav-bar title="SwiftAdmin" fixed />
    <div class="content">
      <van-swipe :autoplay="3000" indicator-color="white" class="banner">
        <van-swipe-item v-for="(b,i) in banners" :key="i">
          <img :src="b" style="width:100%;height:180px;object-fit:cover" />
        </van-swipe-item>
      </van-swipe>
      <van-grid :column-num="3" class="mt-3">
        <van-grid-item v-for="(m,i) in menus" :key="i" :icon="m.icon" :text="m.name" @click="router.push(m.path)" />
      </van-grid>
      <van-divider>最新文章</van-divider>
      <van-cell v-for="a in articles" :key="a.id" :title="a.title" :label="a.category_name+' · '+a.publish_time" is-link @click="router.push('/article?id='+a.id)" />
    </div>
    <van-tabbar v-model="active" route active-color="#1989fa">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/article" icon="notes-o">文章</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticleList } from '@/api/index'
const router = useRouter()
const active = ref(0)
const banners = ref(['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg','https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'])
const menus = ref([{name:'最新文章',icon:'notes-o',path:'/article'},{name:'我的',icon:'user-o',path:'/user'},{name:'登录',icon:'log-in',path:'/login'}])
const articles = ref<any[]>([])
onMounted(async () => { try { const r: any = await getArticleList({ page: 1, limit: 5 }); articles.value = r.data.list || [] } catch(e){} })
</script>

<style scoped>
.page { min-height: 100vh; background: #f7f8fa; }
.content { padding-top: 46px; padding-bottom: 50px; }
.banner { margin: 12px; border-radius: 8px; overflow: hidden; }
.mt-3 { margin-top: 12px; }
</style>
