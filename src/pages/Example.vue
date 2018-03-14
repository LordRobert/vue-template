<template>
    <div>
        <div class="image bh-mt-32">
            <img src="static/dog.jpg">
        </div>
        <div class="language bh-mt-32">
            <Button @click="switchLang">{{$t("btnText")}}</Button>
        </div>
        <div class="ajax bh-mt-32">
            <div class="city"></div>
            <div class="pm25"></div>
            <Button @click="getPM25">异步调用测试</Button>
        </div>
    </div>
</template>
<script>
import util from 'conf/util'
import api from 'conf/api'
    export default {
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
            getPM25 () {
                let pms = {
                    "showapi_appid": '59166',
                    "showapi_sign": '7e6cee7e3046484fa4bd15869b0640fb',
                    "showapi_timestamp": '20180314161610',
                    "city": '南京'
                }
                util.httpPost(api.pm25, pms).then((res) => {
                    this.$Message.info(JSON.stringify(res))
                })
            },
            switchLang () {
                this.$i18n.locale = this.$i18n.locale === 'cn' ? 'en' : 'cn'
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
