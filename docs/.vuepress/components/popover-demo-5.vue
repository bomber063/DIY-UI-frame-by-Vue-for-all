<template>
    <div style="padding-top: 16px;">
        <h3>ES6解析析构语法</h3>
        <p>
            <strong>预览</strong>
        </p>
        <g-popover>
            <template slot="content" slot-scope="{close}">
                可以点击右边的关闭按钮关闭<g-button @click="close">关闭</g-button>
            </template>
            <g-button>上方弹出</g-button>
        </g-popover>
        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
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
        <g-popover">
            <template slot="content" slot-scope="{close}">
                可以点击右边的关闭按钮关闭<g-button @click="close">关闭</g-button>
            </template>
            <g-button>上方弹出</g-button>
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
</style>