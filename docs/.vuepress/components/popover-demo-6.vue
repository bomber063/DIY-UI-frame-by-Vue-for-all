<template>
    <div style="padding-top: 16px;">
        <h2>v-slot代替slot 和 slot-scope</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-popover position="top">
            <template v-slot:content="xxx">
                可以点击右边的关闭按钮关闭<g-button name="xxx" @click="xxx.close">关闭</g-button>
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
            <g-popover position="top">
                <template slot="content">
                    <div>弹出内容</div>
                </template>
                <g-button>上方弹出</g-button>
            </g-popover>
            <g-popover position="bottom">
                <template slot="content">
                    <div>弹出内容</div>
                </template>
                <g-button>下方弹出</g-button>
            </g-popover>
            <g-popover position="left">
                <template slot="content">
                    <div>弹出内容</div>
                </template>
                <g-button>左边弹出</g-button>
            </g-popover>
            <g-popover position="right">
                <template slot="content">
                    <div>弹出内容</div>
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
</style>