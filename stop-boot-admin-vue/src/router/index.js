import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {getToken, setToken, removeToken} from '@/utils/cookieUtil'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import {constantRoutes} from './routes'
import defaultSettings from '@/config/settings'

import Layout from '@/components/Layout'
import da from "element-ui/src/locale/lang/da";

Vue.use(Router)

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// eslint-disable-next-line no-unused-vars
const whiteList = ['/login']

const title = defaultSettings.title || 'Vue Element Admin'

router.beforeEach(async (to, from, next) => {
  // console.log('to------' + to) // 即将要进入路由的对象
  // console.log('from------' + from) // 当前导航要离开的路由对象
  // console.log('next------' + next) // 调用next该方法，才能进入下一个路由
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  // 已登录
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({path: '/'})
      NProgress.done()
    } else {
      if (store.getters.loadMenus) {
        next()
      } else {
        try {
          let menuList = await store.dispatch('menus')

          let temp = menuList[0]["children"];
          let data = menuTree2Routes2(temp)
          console.log("data:", data)


          let accessRoutes = menuTree2Routes(menuList)
          let accessRoutes2 = await store.dispatch('permission/generateRoutes', data)
          router.addRoutes(accessRoutes2) // 动态添加可访问路由表
          next({...to, replace: true})
        } catch (e) {
          console.error("e:", e)
          store.dispatch('logout').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      }
    }
  } else {
    // 未登录
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})


function menuTree2Routes2(menuTree) {
  let routes = []
  for (let i = 0; i < menuTree.length; i++) {
    let children = []
    let submenu = menuTree[i]['children'];
    if (submenu != undefined && submenu.length > 0) {
      children = loadChildren(submenu, menuTree);
    }
    if (menuTree[i]['component'] == 'Layout') {
      routes.push({
        path: menuTree[i]["path"],
        name: menuTree[i]["name"],
        meta: {
          title: menuTree[i]['title'],
          icon: menuTree[i]['icon']
        },
        hidden: menuTree[i]["hidden"] == 1 ? true : false,
        component: Layout,
        children
      })
    } else {
      routes.push({
        path: menuTree[i]["path"],
        name: menuTree[i]["name"],
        meta: {
          title: menuTree[i]['title'],
          icon: menuTree[i]['icon']
        },
        hidden: menuTree[i]["hidden"] == 1 ? true : false,
        component: loadView(menuTree[i]['component']),
        children
      })
    }
  }
  return routes
}

function loadChildren(submenu, menuTree) {
  let routes = []
  for (let i = 0; i < menuTree.length; i++) {
    if (menuTree['pid'] == submenu['id']) {
      routes = menuTree2Routes2(submenu)
    }
  }
  return routes
}


function menuTree2Routes(menuTree) {
  let routes = []
  menuTree = menuTree[0]["children"];
  for (let i = 0; i < menuTree.length; i++) {
    let children = []
    let childrenMenus = menuTree[i]["children"];
    for (let j = 0; j < childrenMenus.length; j++) {
      children.push({
        path: childrenMenus[j]["path"],
        name: childrenMenus[j]['name'],
        meta: {
          title: childrenMenus[j]['title'],
          icon: childrenMenus[j]['icon']
        },
        hidden: childrenMenus[j]['hidden'] == 1 ? true : false,
        component: loadView(childrenMenus[j]['component']),
      })
    }

    if (menuTree[i]['component'] == 'Layout') {
      routes.push({
        path: menuTree[i]["path"],
        name: menuTree[i]["name"],
        meta: {
          title: menuTree[i]['title'],
          icon: menuTree[i]['icon']
        },
        hidden: menuTree[i]['hidden'] == 1 ? true : false,
        component: Layout,
        children
      })
    } else {
      routes.push({
        path: menuTree[i]["path"],
        name: menuTree[i]["name"],
        meta: {
          title: menuTree[i]['title'],
          icon: menuTree[i]['icon']
        },
        hidden: menuTree[i]["children"] == 1 ? true : false,
        component: loadView(menuTree[i]['component']),
        children
      })
    }
  }
  return routes
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}

export const tempRoutes1 = [
  {
    path: '/',
    component: Layout,
    name: 'Dashboard',
    redirect: 'dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'index'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: {title: '首页1', icon: 'index', noCache: true}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: '用户中心',
      icon: 'component'
    },
    children: [
      {
        path: 'center',
        component: () => import('@/views/user/center/index'),
        name: 'center',
        meta: {title: '个人中心', icon: 'guide', noCache: true}
      },
      {
        path: 'role',
        component: () => import('@/views/user/role/index'),
        name: 'role',
        meta: {title: '角色', icon: 'guide', noCache: true}
      }
    ]
  }, {
    path: '/course',
    component: Layout,
    name: '课程管理',
    meta: {
      title: '课程管理',
      icon: 'index'
    },
    children: [
      {
        path: '/list',
        component: () => import('@/views/course/list'),
        name: '课程列表',
        meta: {title: '课程列表', icon: 'index', noCache: true}
      }
    ]
  },
]

function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

router.afterEach(() => {
  NProgress.done()
})

export default router
