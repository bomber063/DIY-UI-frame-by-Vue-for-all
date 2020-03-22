<template>
    <div style="padding-top: 16px;">
        <h2>this.$toast=function(message,toastOptions)</h2>
        <ul>
            <li>
                <ul>
                    参数
                    <li>message：弹出框显示的内容</li>

                    <li>toastOptions包括下面四个参数
                        <ul>
                            <li>autoClose：是否自动关闭（<strong>默认5s后</strong>提示自动关闭,<strong>可以设置自动关闭的时间</strong>）</li>
                            <li>closeButton：关闭按钮选项（<strong>可以设置按钮文本以及后续操作</strong>）</li>
                            <li>position：提示弹出位置（<strong>默认为top</strong>,可以设置top,bottom和middle三个位置）</li>
                            <li>enableHtml：是否支持HTML（<strong>默认为false</strong>）</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>



        <h2>设置弹出消息</h2>
<!--        <p>this.$toast=function(message,toastOptions)</p>-->
<!--        <p>参数</p>-->
<!--        <ul>-->
<!--            <li>autoClose：是否自动关闭（<strong>默认5s后</strong>提示自动关闭,<strong>可以设置自动关闭的时间</strong>）</li>-->
<!--            <li>closeButton：关闭按钮选项（<strong>可以设置按钮文本以及后续操作</strong>）</li>-->
<!--            <li>position：提示弹出位置（默认为top,可以设置top,bottom和middle三个位置）</li>-->
<!--            <li>enableHtml：是否支持HTML（默认为false）</li>-->
<!--        </ul>-->
        <p>
            <strong>预览</strong>
        </p>
        <p>
            <g-button @click="$toast('你好看到我了吗？')">设置文字为'你好看到我了吗？'</g-button>
            <g-button @click="$toast('我在这里')">设置文字为'我在这里'</g-button>
            <g-button @click="$toast('你可以任意设置弹出消息')">设置文字为'你可以任意设置弹出消息'</g-button>
        </p>
            <strong>代码</strong>
<!--        <pre><code>{{content}}</code></pre>-->
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
            <g-button @click="$toast('你好看到我了吗？')">设置文字为'你好看到我了吗？'</g-button>
            <g-button @click="$toast('我在这里')">设置文字为'我在这里'</g-button>
            <g-button @click="$toast('你可以任意设置弹出消息')">设置文字为'你可以任意设置弹出消息'</g-button>`
            .replace(/^ {8}/gm, '').trim()
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