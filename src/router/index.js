import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/sellers',
    component: Layout,
    redirect: '/sellers/index',
    meta: { title: '鸽舍管理', icon: 'el-icon-s-home', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/sellers/index'),
        name: 'sellers',
        meta: { title: '鸽舍列表'}
      },
      {
        path: 'write/:id',
        component: () => import('@/views/sellers/write/'),
        meta: { title: '编辑鸽舍'},
        hidden: true
      },
      {
        path: 'write',
        component: () => import('@/views/sellers/write/'),
        meta: { title: '添加鸽舍'},
        hidden: true
      }
    ]
  },
  {
    path: '/pigeons',
    component: Layout,
    redirect: '/pigeons/index',
    meta: { title: '鸽子管理', icon: 'el-icon-s-promotion', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/pigeons/index'),
        name: 'pigeons',
        meta: { title: '鸽子列表'}
      },
      {
        path: 'write/:id',
        component: () => import('@/views/pigeons/write/'),
        meta: { title: '编辑鸽子'},
        hidden: true
      },
      {
        path: 'write',
        component: () => import('@/views/pigeons/write/'),
        meta: { title: '添加鸽子'},
        hidden: true
      }
    ]
  },
  {
    path: '/auctions',
    component: Layout,
    redirect: '/auctions/index',
    meta: { title: '拍卖管理', icon: 'education', affix: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/auctions/index'),
        name: 'auctions',
        meta: { title: '拍卖列表'}
      },
      {
        path: 'orders',
        component: () => import('@/views/auctions/orders/index'),
        name: 'auctions-orders',
        meta: { title: '拍卖订单列表'}
      },
      {
        path: 'write/:id',
        component: () => import('@/views/auctions/write/'),
        meta: { title: '编辑拍卖'},
        hidden: true
      },
      {
        path: 'write',
        component: () => import('@/views/auctions/write/'),
        meta: { title: '添加拍卖'},
        hidden: true
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    redirect: '/articles/index',
    meta: { title: '新闻赛事管理', icon: 'el-icon-news' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/articles/index'),
        name: 'articles',
        meta: { title: '新闻赛事列表'}
      },
      {
        path: 'write/:id',
        component: () => import('@/views/articles/write'),
        meta: { title: '编辑新闻赛事'},
        hidden: true
      },
      {
        path: 'write',
        component: () => import('@/views/articles/write'),
        meta: { title: '添加新闻赛事'},
        hidden: true
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/index',
    meta: { title: '展售商品管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/goods/index'),
        name: 'goods',
        meta: { title: '展售商品列表'}
      },
      {
        path: 'write/:id',
        component: () => import('@/views/goods/write'),
        meta: { title: '编辑展售商品'},
        hidden: true
      },
      {
        path: 'write',
        component: () => import('@/views/goods/write'),
        meta: { title: '添加展售商品'},
        hidden: true
      }
    ]
  },
  {
    path: '/banners',
    component: Layout,
    redirect: '/banners/index',
    meta: { title: '广告管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/banners/index'),
        name: 'banners',
        meta: { title: '广告列表'}
      },
      {
        path: 'write/:id',
        component: () => import('@/views/banners/write'),
        meta: { title: '编辑广告'},
        hidden: true
      },
      {
        path: 'write',
        component: () => import('@/views/banners/write'),
        meta: { title: '添加广告'},
        hidden: true
      }
    ]
  },
  {
    path: '/configs',
    component: Layout,
    redirect: '/configs/user-term',
    meta: { title: '系统配置', icon: 'el-icon-s-tools', affix: true },
    children: [
      {
        path: 'user-term',
        component: () => import('@/views/configs/meta'),
        meta: { title: '会员服务条款', key: "user-term"}
      },
      {
        path: 'about-us',
        component: () => import('@/views/configs/meta'),
        meta: { title: '关于我们', key: "about-us"}
      },
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
