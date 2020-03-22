<template>
    <div style="padding-top: 16px;">
        <h2>设置single</h2>
        <ul>
            <li>设置single后，多个打开变成只能打开<strong>唯一一个</strong></li>
        </ul>
        <p>
            <strong>预览</strong>
        </p>
        <g-collapse single :selected.sync="selectedTab">
            <!--        下面的代码功能跟上面的是一样的，上面的是缩写-->
            <!--    <g-collapse :selected="selectedTab" @update:selected="selectedTab=$event">-->
            <g-collapse-item title="标题1" name="1" style="background:#aaa">内容1</g-collapse-item>
            <g-collapse-item title="标题2" name="2" style="background:#ccc">内容2</g-collapse-item>
            <g-collapse-item title="标题3" name="3" style="background:#fff">内容3</g-collapse-item>
        </g-collapse>
        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
    </div>
</template>

<script>
    import Collapse from '../../../src/collapse'
    import CollapseItem from '../../../src/collapse-item'

    export default {
        components:{
            // gButton:Button
            'g-collapse':Collapse,
            'g-collapse-item':CollapseItem
        },
        data() {
            return {
                selectedTab:[],
                content: `
            <g-collapse single :selected.sync="selectedTab">
                <g-collapse-item title="标题1" name="1" style="background:#aaa">内容1</g-collapse-item>
                <g-collapse-item title="标题2" name="2" style="background:#ccc">内容2</g-collapse-item>
                <g-collapse-item title="标题3" name="3" style="background:#fff">内容3</g-collapse-item>
            </g-collapse>`
                    .replace(/^ {8}/gm, '').trim()
            }
        }
    }
</script>

<style scoped>
    /*.collapse > .collapseItem:nth-child(1){*/
    /*    background:#aaa;*/
    /*}*/
    /*.collapse > .collapseItem:nth-child(2){*/
    /*    background:#ccc;*/
    /*}*/
    /*.collapse > .collapseItem:nth-child(3){*/
    /*    background:#fff;*/
    /*}*/
</style>