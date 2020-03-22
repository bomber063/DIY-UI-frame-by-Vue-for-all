<template>
    <div style="padding-top: 16px;">
        <h2>用户需知</h2>
        <ul>
            <li>g-collapse（支持 <strong>single</strong> 属性，<strong>默认</strong>是<strong>没有single</strong>属性,添加 <strong>single</strong> 属性组件变为只能打开一个）</li>
            <li>g-collapse-item（<strong>必须</strong>传入 <strong>title</strong> 和 <strong>name</strong>）</li>
        </ul>
        <h2>默认打开多个</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-collapse :selected.sync="selectedTab">
            <!--        下面的代码功能跟上面的是一样的，上面的是缩写-->
            <!--    <g-collapse :selected="selectedTab" @update:selected="selectedTab=$event">-->
            <g-collapse-item title="标题1" name="1" style="background:#aaa;">内容1</g-collapse-item>
            <g-collapse-item title="标题2" name="2" style="background:#ccc;">内容2</g-collapse-item>
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
            <g-collapse :selected.sync="selectedTab">
                <g-collapse-item title="标题1" name="1" style="background:#aaa;">内容1</g-collapse-item>
                <g-collapse-item title="标题2" name="2" style="background:#ccc;">内容2</g-collapse-item>
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