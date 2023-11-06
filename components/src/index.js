import {createStore} from "@xysfe/admin-menu-auth"
import Container from './packages/container.vue'

const baseOptions = {
    router: null,
    beforeEach: null,
    cache: false // 菜单权限缓存
}  
const usePlugin = (options) => {
    options = Object.assign({}, baseOptions, options)

    if (!options.router) {
        throw Error('xys-admin-menu: 请在Vue.use()中请传入vue-router实例')
    }

    Container.install = (app) => {
        app.component(Container.name, Container)
    }
    
}


export {
    usePlugin,
    Container
}