<template>
    <div style="padding-top: 16px;">
        <h2>可为弹出层设置关闭按钮</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-popover>
            <template slot="content" slot-scope="xxx">
                可以点击右边的关闭按钮关闭<g-button name='xxx' @click="xxx.close">关闭</g-button>
            </template>
            <g-button>点击弹出后会有关闭按钮</g-button>
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
        <g-popover>
            <template slot="content" slot-scope="xxx">
                可以点击右边的关闭按钮关闭<g-button name='xxx' @click="xxx.close">关闭</g-button>
            </template>
            <g-button>点击弹出后会有关闭按钮</g-button>
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