
import { createStore } from './state'

export default (options = {}) => {
  const {
    store,
    getAdminAuthority
  } = createStore(options)

  const { router = {}, beforeEach: customBeforeEach } = options

  const checkPermit = (to, from, next) => {
    return () => {
      const base = router.options.base.trim().toLowerCase()
      let url = to.path.trim().toLowerCase()
      if (to.path.indexOf(base) < 0) {
        url = base + to.path
      }
      // url匹配的数组，可能会出现多个
      const pageItems = store.pagePermits.filter(page => page.url === url)
      let readable = true
      // 页面没有配置权限，默认有权限
      if (to.path === '/' || !pageItems.length) {
        readable = true
      } else {
        // 找出permit === 1的选项，只要有一个是允许进入，就直接允许
        const pageItem = pageItems.find(page => Number(page.permit) === 1)
        readable = !!pageItem
      }
      if (!readable && to.path !== '/404') {
        next('/404')
      } else {
        next()
      }
    }
  }

  const handleRoute = () => {
    router.beforeEach(async (to, from, next) => {
      // 获取权限相关信息后才进入
      await getAdminAuthority()
      const auth = checkPermit(to, from, next)
      if (typeof customBeforeEach === 'function' && customBeforeEach) {
        customBeforeEach(to, from, next, auth)
      } else {
        auth()
      }
    })
  }

  const auth = (permitId) => {
    return store.btnPermits.findIndex(item => parseInt(item.id) === parseInt(permitId)) > -1
  }

  const isInDepartment = (id) => {
    return store.department && store.department.findIndex(item => parseInt(item.wxDepartmentid) === parseInt(id)) !== -1
  }

  const createAuthDirective = () => {
    return {
      name: 'auth',
      bind (el, { value }) {
        if (el.style.display) {
          // 缓存本身的display
          el.dataset.display = el.style.display
        }
        el.style.display = 'none'
        const isHas = auth(value)
        if (!isHas) {
          el.parentNode && el.parentNode.removeChild(el)
        } else {
          if (el.dataset.display) {
            // 还原原来的display
            el.style.display = el.dataset.display
          } else {
            el.style.display = ''
          }
        }
      }
    }
  }

  return {
    handleRoute,
    auth,
    isInDepartment,
    createAuthDirective
  }
}
