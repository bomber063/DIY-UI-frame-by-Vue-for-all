<template>
    <div style="padding-top: 16px;">
        <h2>说明</h2>
        <ul>
            <li>position：设置弹出层的位置（默认是top）</li>
            <li>popover 弹出层内容默认支持 html</li>
            <li>trigger：设置弹出层触发方式（支持click触发和hover触发两种方式，默认为click）</li>
            <li>可为弹出层设置关闭按钮</li>
        </ul>
        <h2>position：设置弹出层的位置</h2>
        <p>
            <strong>预览</strong>
        </p>
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