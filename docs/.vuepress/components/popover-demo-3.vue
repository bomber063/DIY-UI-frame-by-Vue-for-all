<template>
    <div style="padding-top: 16px;">
        <h2>通过trigger将触发方式改为 hover</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-popover position="top" trigger="hover">
            <template slot="content">
                <div>弹出内容</div>
            </template>
            <g-button>上方弹出</g-button>
        </g-popover>
        <g-popover position="bottom" trigger="hover">
            <template slot="content">
                <div>弹出内容</div>
            </template>
            <g-button>下方弹出</g-button>
        </g-popover>
        <g-popover position="left" trigger="hover">
            <template slot="content">
                <div>弹出内容</div>
            </template>
            <g-button>左边弹出</g-button>
        </g-popover>
        <g-popover position="right" trigger="hover">
            <template slot="content">
                <div>弹出内容</div>
            </template>
            <g-button>右边弹出</g-button>
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
            <g-popover position="top" trigger="hover">
                <template slot="content">
                    <div>弹出内容</div>
                </template>
                <g-button>上方弹出</g-button>
            </g-popover>
            <g-popover position="bottom" trigger="hover">
                <template slot="content">
                    <div>弹出内容</div>
                </template>
                <g-button>下方弹出</g-button>
            </g-popover>
            <g-popover position="left" trigger="hover">
                <template slot="content">
                    <div>弹出内容</div>
                </template>
                <g-button>左边弹出</g-button>
            </g-popover>
            <g-popover position="right" trigger="hover">
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