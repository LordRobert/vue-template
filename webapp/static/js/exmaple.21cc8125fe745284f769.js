webpackJsonp([1],{"8DP/":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=[{path:"/",name:"Example",component:n("IDGY").a}],a=n("TXmL"),r=n("kGkY"),s=n("JHL2");Vue.config.productionTip=!1;const i=new a.a({locale:"en",messages:{cn:r.a,en:s.a}}),c=new VueRouter({routes:o,i18n:i});c.beforeEach((t,e,n)=>{t.meta.title&&(document.title=t.meta.title),n()}),new Vue({router:c}).$mount("#app")},IDGY:function(t,e,n){"use strict";var o=n("mvHQ"),a=n.n(o),r=function(t){if(!t||"0"!==t.code&&0!==t.code){if("1201"===t.code)return t;throw t}return t};function s(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n+"="+t[n]);return e}axios.interceptors.response.use(function(t){if(t&&t.data&&"1201"===t.data.code&&"unauthorized"===t.data.message){var e=window.location.href;return window.location.href=e.substring(0,e.lastIndexOf("#")+2)+"login",t}return t});var i,c={httpGet:function(t,e,n){var o={};return e&&!0===e.noCredentials&&(o.noCredentials=!0),axios.get(t,o).then(function(t){return n&&"function"==typeof n?n(t.data):t.data})},httpGetQuery:function(t,e,n,o){var a={};n&&!0===n.noCredentials&&(a.noCredentials=!0);var r=s(e);return r.length>0&&(t+="?"+r.join("&")),axios.get(t,a).then(function(t){return o&&"function"==typeof o?o(t.data):t.data})},httpPost:function(t,e,n){return axios.post(t,e,{}).then(function(t){return n&&"function"==typeof n?n(t.data):t.data}).catch(function(t){throw console.error("-- AXIOS POST 异常 START --"),t.response?(console.log(t.response.data),console.log(t.response.status),console.log(t.response.headers)):console.log("error",t.message),console.log("请求配置："),console.log(t.config),console.error("-- AXIOS POST 异常 END --"),t})},httpPostQuery:function(t,e,n,o){var a=s(e);return a.length>0&&(t+="?"+a.join("&")),axios.post(t,n,{}).then(function(t){return o&&"function"==typeof o?o(t.data):t.data}).catch(function(t){throw console.error("-- AXIOS POST 异常 START --"),t.response?(console.log(t.response.data),console.log(t.response.status),console.log(t.response.headers)):console.log("error",t.message),console.log("请求配置："),console.log(t.config),console.error("-- AXIOS POST 异常 END --"),t})},errorHandle:function(t){var e=$.extend(!0,{},t);throw e.message=t.message,sessionStorage.setItem("error",a()(e)),location.href=location.href.replace(/\/\w*$/,"/error"),t},getQueryParam:function(t){var e;return location.search.replace(/\?/g,"").split("&").forEach(function(n){if(n&&"string"==typeof n){var o=n.split("=");o.length>1&&o[0]===t&&(e=o[1])}}),e},getAllQueryParams:function(){var t={};return location.search.replace(/\?/g,"").split("&").forEach(function(e){if(e&&"string"==typeof e){var n=e.split("=");n.length>0&&(t[n[0]]=n[1])}}),t},handler:{CODE:r,ROWS:function(t){return(t=r(t))&&t.datas&&t.datas.rows?t.datas.rows:[]},DATAS:function(t){return(t=r(t))&&void 0!==t.datas?t.datas:[]},FIRST_ROW:function(t){return(t=r(t))&&t.datas&&t.datas.rows?t.datas.rows[0]:null}},log:function(t){console.log(t)}},l={pm25:(i="http://route.showapi.com/104-29",""+i)},u={data:function(){return{}},computed:{},methods:{getPM25:function(){var t=this;c.httpPost(l.pm25,{showapi_appid:"59166",showapi_sign:"7e6cee7e3046484fa4bd15869b0640fb",showapi_timestamp:"20180314161610",city:"南京"}).then(function(e){t.$Message.info(a()(e))})},switchLang:function(){this.$i18n.locale="cn"===this.$i18n.locale?"en":"cn"}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"image bh-mt-32"},[t._v("\n        hello\n    ")]),t._v(" "),n("div",{staticClass:"language bh-mt-32"},[n("Button",{on:{click:t.switchLang}},[t._v("\\"+t._s(t.$t("btnText")))])],1),t._v(" "),n("div",{staticClass:"ajax bh-mt-32"},[n("div",{staticClass:"city"}),t._v(" "),n("div",{staticClass:"pm25"}),t._v(" "),n("Button",{on:{click:t.getPM25}},[t._v("异步调用测试")])],1)])},staticRenderFns:[]};var h=n("VU/8")(u,f,!1,function(t){n("VWp4")},"data-v-908c2028",null);e.a=h.exports},JHL2:function(t,e,n){"use strict";e.a={title:"I18N DEMO, English here",switchLang:"Switch Language",btnText:"click here",welcome:"welcome"}},VWp4:function(t,e){},kGkY:function(t,e,n){"use strict";e.a={title:"测试多语言，这是中文",switchLang:"切换语言",btnText:"点我~~",welcome:"欢迎使用"}}},["8DP/"]);
//# sourceMappingURL=exmaple.21cc8125fe745284f769.js.map