// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'01
/* eslint no-undef: 0 */
import App from './App'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
})
