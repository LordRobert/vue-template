import routes from 'src/apps/demo/routes'
import Index from 'src/apps/demo/demo.vue'

Vue.config.productionTip = false

import VueI18n from 'vue-i18n'
import cn from 'conf/i18n/cn.js'
import en from 'conf/i18n/en.js'
const i18n = new VueI18n({
    locale: 'en', // 语言标识
    messages: {
        cn: cn,
        en: en
    }
})

const router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    el: '#app',
    router,
    components: { Index },
    template: '<Index/>'
})
