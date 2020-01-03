<template>
    <div style="padding-top: 16px;">
        <h2>支持HTML</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-button @click="onClickButton">上方弹出</g-button>
        <p>
            <strong>代码</strong>
        </p>
        <pre><code>{{content}}</code></pre>
    </div>
</template>

<script>
    import Vue from 'vue'
    import plugin from '../../../src/plugin'
    import GButton from '../../../src/button'

    Vue.use(plugin)

    export default {
        components:{
            GButton
        },
        data() {
            return {
                content: `
            <style>
                .gulu-toast {
                    z-index: 30;
                }
            </style>
            
            <g-button @click="onClickButton">上方弹出</g-button>

            methods: {
                onClickButton () {
                    this.$toast('<strong style="color:red;">加粗的提示</strong>', {
                        enableHtml: true
                    })
                }
            }`
            .replace(/^ {8}/gm, '').trim()
            }
        },
        methods: {
            onClickButton () {
                this.$toast('<strong style="color:red;">加粗的提示</strong>', {
                    enableHtml: true
                })
            }
        }
    }
</script>

<style>
    /*.gulu-toast {*/
    /*    z-index: 30 !important;*/
    /*}*/
    .gulu-toast {
        z-index: 30;
    }
</style>

<style scoped>
    * {
        box-sizing: border-box;
    }
</style>