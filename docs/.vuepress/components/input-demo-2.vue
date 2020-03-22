<template>
    <div style="padding-top: 16px;">
        <h2>双向绑定</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-input :valuea="value" @inputa="value=$event"></g-input>
<!--        因为组件里面用的不是value和input所以用不了v-model-->
<!--        <g-input v-model="value"></g-input>-->
        <div>
            value: {{value}}
        </div>

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
                value:'改变这里下面会跟着变化吗？',
                content: `
            data:{
                value:'改变这里下面会跟着变化吗？'
            }

            <g-input :valuea="value" @inputa="value=$event"></g-input>
            <div>
              value: {{value}}
            </div>`
                    .replace(/^ {8}/gm, '').trim()
            }
        }
    }
</script>