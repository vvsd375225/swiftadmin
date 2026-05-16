import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Grid, GridItem,
  Divider, Cell, CellGroup, Image, Field, PullRefresh, List, showToast
} from 'vant'
import 'vant/lib/index.css'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(Button).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem)
app.use(Grid).use(GridItem).use(Divider).use(Cell).use(CellGroup).use(Image)
app.use(Field).use(PullRefresh).use(List)
app.mount('#app')
