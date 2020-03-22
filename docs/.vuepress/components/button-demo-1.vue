<template>
    <div style="padding-top: 16px;">
        <h2>按钮</h2>
        <ul>
            <li>可以设置禁按状态：disabled</li>
            <li>支持<strong>多个</strong>icon标签，比如设置、信息提示、错误提示、左拉，右拉、下拉、点赞、下载、加载等</li>
            <li>通过icon-right或者icon-left调整icon的<strong>方向</strong></li>
        </ul>
        <p>
            <strong>预览</strong>
        </p>
        <g-button>默认按钮</g-button>
        <g-button icon="setting">设置</g-button>
        <g-button icon="info">信息提示</g-button>
        <g-button icon="error">错误提示</g-button>
        <g-button icon="left">左拉</g-button>
        <g-button icon="right" class="icon-right">右拉</g-button>
        <g-button icon="down">下拉</g-button>
        <g-button icon="thumbs-up">点赞</g-button>
        <g-button icon="download">下载</g-button>
        <g-button :loadings="true">加载</g-button>
        <g-button disabled >禁用按钮</g-button>

        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
    </div>
</template>

<script>
    import Button from '../../../src/button'

    export default {
        components:{
            // gButton:Button
            'g-button':Button
        },
        data() {
            return {
                content: `
                <g-button>默认按钮</g-button>
                <g-button icon="setting">设置</g-button>
                <g-button icon="info">信息提示</g-button>
                <g-button icon="error">错误提示</g-button>
                <g-button icon="left">左拉</g-button>
                <g-button icon="right" class="icon-right">右拉</g-button>
                <g-button icon="down">下拉</g-button>
                <g-button icon="thumbs-up">点赞</g-button>
                <g-button icon="download">下载</g-button>
                <g-button :loadings="true">加载</g-button>
                <g-button disabled >禁用按钮</g-button>`
            .replace(/^ {8}/gm, '').trim()
            }
        }
    }
</script>