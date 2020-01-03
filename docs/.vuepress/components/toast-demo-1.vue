<template>
    <div style="padding-top: 16px;">
        <h2>Toast</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-button @click="$toast('点击弹出提示',{closeButton:false})">上方弹出</g-button>
        <g-button @click="$toast('点击弹出提示', {closeButton:false,position:'middle'})">中间弹出</g-button>
        <g-button @click="$toast('点击弹出提示', {closeButton:false,position:'bottom'})">下方弹出</g-button>
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