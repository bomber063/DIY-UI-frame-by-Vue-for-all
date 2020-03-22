<template>
    <div style="padding-top: 16px;">
        <h2>button-group（按钮组合）</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-button-group>
            <g-button icon="left">上一页</g-button>
            <g-button>更多</g-button>
            <g-button icon="right">下一页</g-button>
        </g-button-group>
        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
    </div>
</template>

<script>
    import Button from '../../../src/button'
    import ButtonGroup from '../../../src/button-group'

    export default {
        components:{
            // gButton:Button
            'g-button':Button,
            'g-button-group':ButtonGroup
        },
        data() {
            return {
                content: `
            <g-button-group>
                <g-button icon="left">上一页</g-button>
                <g-button>更多</g-button>
                <g-button icon="right">下一页</g-button>
            </g-button-group>`
            .replace(/^ {8}/gm, '').trim()
            }
        }
    }
</script>
