
// const flatMenu = (menus) => {
//   if (!menus || !menus.length) return []

//   return menus.reduce((pre, cur) => {
//     const submenu = cur.submenu
//     delete cur.submenu
//     return pre.concat(cur, ...flatMenu(submenu))
//   }, [])
// }

export const treeMenu = (menus) => {
  return menus.filter(menu => {
    menu.submenu = menus.filter(m => m.parentid === menu.id)
    return menu.parentid === '0'
  })
}

// function listToTree (oldData = [], id = null, newData = []) {
//   oldData.forEach(item => { item.parentid === id && newData.push(item) })
//   newData.forEach(i => {
//     i.children = []
//     listToTree(oldData, i.permit, i.children)
//     i.children.length || delete i.children
//   })
//   return newData
// }
