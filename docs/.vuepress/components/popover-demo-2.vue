<template>
    <div style="padding-top: 16px;">
        <h2>支持HTML</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-popover position="top">
            <template slot="content">
                <div><p class="g-p">弹出内容</p></div>
            </template>
            <g-button>上方弹出</g-button>
        </g-popover>
        <g-popover position="bottom">
            <template slot="content">
                <div><p class="g-p">弹出内容</p></div>
            </template>
            <g-button>下方弹出</g-button>
        </g-popover>
        <g-popover position="left">
            <template slot="content">
                <div><p class="g-p">弹出内容</p></div>
            </template>
            <g-button>左边弹出</g-button>
        </g-popover>
        <g-popover position="right">
            <template slot="content">
                <div><p class="g-p">弹出内容</p></div>
            </template>
            <g-button>右边弹出</g-button>
        </g-popover>
        <p>
            <strong>代码</strong>
        </p>
        <pre><code>{{content}}</code></pre>
    </div>
</template>

<script>
    import GPopover from '../../../src/popover'
    import GButton from '../../../src/button'

    export default {
        components:{
            GPopover,GButton
        },
        data() {
            return {
                content: `
            <style>
                * {
                    box-sizing: border-box;
                }
                .g-p {
                    margin:0;
                    color:red;
                }
            </style>

            <g-popover position="top">
                <template slot="content">
                    <div><p class="g-p">弹出内容</p></div>
                </template>
                <g-button>上方弹出</g-button>
            </g-popover>
            <g-popover position="bottom">
                <template slot="content">
                    <div><p class="g-p">弹出内容</p></div>
                </template>
                <g-button>下方弹出</g-button>
            </g-popover>
            <g-popover position="left">
                <template slot="content">
                    <div><p class="g-p">弹出内容</p></div>
                </template>
                <g-button>左边弹出</g-button>
            </g-popover>
            <g-popover position="right">
                <template slot="content">
                    <div><p class="g-p">弹出内容</p></div>
                </template>
                <g-button>右边弹出</g-button>
            </g-popover>`
            .replace(/^ {8}/gm, '').trim()
            }
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .g-p {
        margin:0;
        color:red;
    }
</style>