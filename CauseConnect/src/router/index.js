import { createRouter, createWebHistory } from 'vue-router'
import FAQ from '@/views/FAQ/FAQ.vue'
import Login from '@/views/LoginForm/LoginView.vue'
import Info from '@/views/Info/Info.vue'
import Toko from '@/views/Toko/Toko_test.vue'
import Register from '@/views/Register/Register.vue'
import Home from '@/views/home/home.vue'
import List from '@/views/List/List.vue'
import Mypage from '@/views/Mypage/Mypage.vue' // Mypage.vue をインポート
import Detail from '@/views/Detail/Detail.vue'
import Favo from '@/views/Favo/FavoPopup.vue'
const routes = [
  { path: '/', name: 'Home', component: Home }, // '/' で Home.vue を表示
  { path: '/FAQ', name: 'FAQ', component: FAQ },
  { path: '/login', name: 'Login', component: Login },
  { path: '/info', name: 'Info', component: Info },
  { path: '/Toko', name: 'Toko', component: Toko },
  { path: '/Register', name: 'Register', component: Register },
  { path: '/list', name: 'List', component: List }, // リストページ
  { path: '/mypage', name: 'Mypage', component: Mypage }, // マイページルート
  {
    path: '/details/:id',
    name: 'Detail',
    component: Detail,
    props: true, // URL パラメータを props として渡す
  },
  // { path: '/details/:id', name: 'Detail', component: Detail, props: true },
  { path: '/Favo', name: 'Favo', component: Favo },//お気に入り一覧
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
