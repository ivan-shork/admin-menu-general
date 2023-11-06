export function isValidArray (val) {
  return Array.isArray(val) && val.length > 0
}

export const findNodeByTag = (tag, isStrict = false) => {
  let search = null
  // eslint-disable-next-line no-unused-vars
  // let parentMenu = null
  // 全等匹配
  if (isStrict) {
    return function findNode (menuList, val, parent = null) {
      if (search) {
        return search
      }
      menuList.forEach(menu => {
        if ((!menu.submenu || !menu.submenu.length) && menu[tag] === val) {
          search = menu
          // 如果有父级菜单的话 需要这个索引来打开菜单
          if (parent) {
            search.parentIndex = `${parent.parentid}-${parent.id}-${parent.name}`
          }
        } else if (menu.submenu && menu.submenu.length > 0) {
          search = findNode(menu.submenu, val, menu)
        }
      })
      return search
    }
    // 模糊匹配
  } else {
    return function findNode (menuList, val) {
      if (search) {
        return search
      }
      menuList.forEach(menu => {
        if (menu[tag].includes(val)) {
          search = menu
        } else if (menu.submenu && menu.submenu.length > 0) {
          search = findNode(menu.submenu, val, search)
        }
      })
      return search
    }
  }
}

export const throttle = (func, wait = 300) => {
  let pre = 0
  let timeout
  return function (...args) {
    const context = this
    const now = Date.now()

    clearTimeout(timeout)

    if (now - pre >= wait) {
      func.apply(context, args)
      pre = now
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
        pre = now
      }, wait)
    }
  }
}

export const keyShow = (key, func) => {
  let pre = 0
  let time = 0
  return function (code) {
    const now = Date.now()
    if (key === code) {
      if (time === 1 && now - pre >= 500) {
        time = 0
      } else {
        time++
      }
    } else {
      time = 0
    }
    if (time === 2) {
      func.apply()
      time = 0
    }
    pre = now
  }
}
