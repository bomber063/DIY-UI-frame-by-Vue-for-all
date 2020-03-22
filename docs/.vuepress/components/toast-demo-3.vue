<template>
    <div style="padding-top: 16px;">
        <h2>设置自动关闭时间</h2>
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
            <g-button @click="$toast('我在5秒后会自动关闭哦',{closeButton:false})">默认上方弹出(默认5秒自动关闭)</g-button>
        </p>
        <p>
            <g-button @click="$toast('我在1秒后会自动关闭哦',{closeButton:false,autoClose:1})">上方弹出(设置1秒自动关闭)</g-button>
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
        <p>
            <g-button @click="$toast('我在5秒后会自动关闭哦',{closeButton:false})">默认上方弹出(默认5秒自动关闭)</g-button>
        </p>
        <p>
            <g-button @click="$toast('我在1秒后会自动关闭哦',{closeButton:false,autoClose:1})">上方弹出(设置1秒自动关闭)</g-button>
        </p>`
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