<template>
    <div style="padding-top: 16px;">
        <h2>设置弹出位置</h2>
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
            <g-button @click="$toast('点击弹出提示',{closeButton:false})">上方弹出</g-button>
            <g-button @click="$toast('点击弹出提示', {closeButton:false,position:'middle'})">中间弹出</g-button>
            <g-button @click="$toast('点击弹出提示', {closeButton:false,position:'bottom'})">下方弹出</g-button>
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
            <g-button @click="$toast('点击弹出提示',{closeButton:false})">上方弹出</g-button>
            <g-button @click="$toast('点击弹出提示', {closeButton:false,position:'middle'})">中间弹出</g-button>
            <g-button @click="$toast('点击弹出提示', {closeButton:false,position:'bottom'})">下方弹出</g-button>`
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