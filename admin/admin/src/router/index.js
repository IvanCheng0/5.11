import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import CategoryCreate from '@/views/CategoryCreate'
import CategoryList from '@/views/CategoryList'
import ItemCreate from '@/views/ItemCreate'
import ItemList from '@/views/ItemList'
import HeroCreate from '@/views/HeroCreate'
import HeroList from '@/views/HeroList'
import ArticleCreate from '@/views/ArticleCreate'
import ArticleList from '@/views/ArticleList'
import AdCreate from '@/views/AdCreate'
import AdList from '@/views/AdList'
import AdminUserList from '@/views/AdminUserList'
import AdminUserCreate from '@/views/AdminUserCreate'
import Login from '@/views/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/categories/creat', component: CategoryCreate, },
        //props: true把URL参数注入到CategoryCreate页面里面
        { path: '/categories/edit:id', component: CategoryCreate, props: true },
        { path: '/categories/List', component: CategoryList, },

        { path: '/items/creat', component: ItemCreate, },
        //props: true把URL参数注入到CategoryCreate页面里面
        { path: '/items/edit:id', component: ItemCreate, props: true },
        { path: '/items/List', component: ItemList, },

        { path: '/heroes/creat', component: HeroCreate, },
        //props: true把URL参数注入到CategoryCreate页面里面
        { path: '/heroes/edit:id', component: HeroCreate, props: true },
        { path: '/heroes/List', component: HeroList, },

        { path: '/articles/creat', component: ArticleCreate, },
        //props: true把URL参数注入到CategoryCreate页面里面
        { path: '/articles/edit:id', component: ArticleCreate, props: true },
        { path: '/articles/List', component: ArticleList, },

        { path: '/ads/creat', component: AdCreate, },
        //props: true把URL参数注入到CategoryCreate页面里面
        { path: '/ads/edit:id', component: AdCreate, props: true },
        { path: '/ads/List', component: AdList, },

        { path: '/admin_users/creat', component: AdminUserCreate, },
        //props: true把URL参数注入到CategoryCreate页面里面
        { path: '/admin_users/edit:id', component: AdminUserCreate, props: true },
        { path: '/admin_users/List', component: AdminUserList, },
      ]
    }
  ]
})
