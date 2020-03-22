<template>
    <div style="padding-top: 16px;">
        <h2>简单用法</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-input></g-input>
        <g-input valuea="默认"></g-input>
        <g-input valuea="禁用1" disableda></g-input>
        <g-input valuea="禁用2" readonlya></g-input>
        <g-input valuea="错误信息提示" errora="输入内容必须符合规则"></g-input>

        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
    </div>
</template>

<script>
    import Input from '../../../src/input'

    export default {
        components:{
            gInput:Input
        },
        data() {
            return {
                content: `
            <g-input></g-input>
            <g-input valuea="中文"></g-input>
            <g-input valuea="中文" disableda></g-input>
            <g-input valuea="中文" readonlya></g-input>`
                    .replace(/^ {8}/gm, '').trim()
            }
        }
    }
</script>