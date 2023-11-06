import http from '../util/axios'
import { treeMenu } from '../util/disposeMenu'
const _state = {
  userName: '',
  permits: [],
  department: {},
  menus: [], // 菜单
  pagePermits: [],
  btnPermits: []
}

export const createStore = (options = {}) => {
  const { cache } = options
  // const storageInfo = (localStorage.getItem('permitInfo') && JSON.parse(localStorage.getItem('permitInfo'))) || ''
  const store = {}
  const reactive = () => {
    Object.defineProperties(store, {
      userName: {
        get () {
          return _state.userName
        },
        set (val) {
          _state.userName = val
        }
      },
      department: {
        get () {
          return _state.department
        },
        set (val) {
          _state.department = val
        }
      },
      permits: {
        get () {
          return _state.permits
        },
        set (val) {
          const { pagePermits, btnPermits } = getPermitsByModule(val)
          _state.permits = val
          _state.menus = getMenusByModule(val)
          _state.pagePermits = pagePermits
          _state.btnPermits = btnPermits
          if (cache) {
            const storageInfo = JSON.stringify({
              menus: _state.menus,
              pagePermits: _state.pagePermits,
              btnPermits: _state.btnPermits,
              storeTime: Date.now()
            })
            localStorage.setItem('permitInfo', storageInfo)
          }
        }
      },
      menus: {
        get () {
          // if (cache && storageInfo.menus) return storageInfo.menus
          return _state.menus
        }
      },
      pagePermits: {
        get () {
          // if (cache && storageInfo.pagePermits) return storageInfo.pagePermits
          return _state.pagePermits
        }
      },
      btnPermits: {
        get () {
          // if (cache && storageInfo.btnPermits) return storageInfo.btnPermits
          return _state.btnPermits
        }
      }
    })
  }
  reactive()

  // 筛选出目录和页面 平级数据组装成菜单树
  // type 为 1、2 的是目录和页面, 3 为功能权限
  const getMenusByModule = (module = []) => {
    const menuModule = module.filter(module => [1, 2].includes(Number(module.type)) && ~~module.permit)
    const menus = treeMenu(menuModule)
    return menus
  }

  const getPermitsByModule = (module = []) => {
    // type为功能权限的
    const permitModule = module.filter(module => Number(module.type) === 3)
    const pagePermits = []
    const btnPermits = []
    permitModule.forEach(({ base = [], permit }) => {
      // 过滤出type是2的为页面的
      const pageModules = base.filter(item => Number(item.type) === 2).map(page => ({
        ...page,
        permit: Number(permit)
      }))
      // 过滤出type是3 4的为页面元素 接口元素的 并且有权限的
      const btnModules = base.filter(item => [3, 4].includes(Number(item.type)))
      pagePermits.push(...pageModules)
      if (Number(permit) === 1) {
        btnPermits.push(...btnModules)
      }
    })
    return {
      pagePermits,
      btnPermits
    }
  }

  const getAdminAuthority = () => {
    // 跨项目之间 距离上次缓存小于五分钟 不走请求 走缓存
    // if (cache && storageInfo && isOverdue(storageInfo.storeTime)) {
    // }
    if (store.userName) return Promise.resolve(store)
    return http.get('/admin/adminMenu/getAdminAuthority')
      .then(res => {
        if (!res.ret) {
          const { userName = '', module = [], department = [] } = res.data
          store.userName = userName
          store.department = department
          store.permits = module
          return store
        }
        return {}
      })
      .catch(_ => ({}))
  }

  // const isOverdue = (time) => {
  //   return time <= Date.now() - 60 * 5 * 1000
  // }

  return {
    store,
    getAdminAuthority
  }
}
