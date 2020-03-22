<template>
    <div style="padding-top: 16px;">
        <h2>组件概述#</h2>
        <ul>
            <li>g-layout：布局容器，其下可嵌套 Header Sider Content Footer 或 <strong>Layout 本身</strong> ，可以放在任何父容器中。</li>
            <li>g-header：顶部布局，自带默认样式，其下可嵌套任何元素，<strong>只能放在 Layout 中</strong>。</li>
            <li>g-sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，<strong>只能放在 Layout 中</strong>，可以点击<strong>关闭</strong>。</li>
            <li>g-content：内容部分，自带默认样式，其下可嵌套任何元素，<strong>只能放在 Layout 中</strong>。</li>
            <li>g-footer：底部布局，自带默认样式，其下可嵌套任何元素，<strong>只能放在 Layout 中</strong>。</li>
        </ul>

            <h2>最基本的上中下布局</h2>
        <p>预览</p>

        <g-layout style="color: white; margin-bottom:50px;">
            <g-header style="height: 50px; background:lightskyblue;">
                header
            </g-header>
            <g-content style="height: 100px; background:deepskyblue;">
                content
            </g-content>
            <g-footer style="height: 50px; background:lightskyblue;">
                footer
            </g-footer>
        </g-layout>
        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
    </div>
</template>

<script>
    import GHeader from '../../../src/header'
    import GFooter from '../../../src/footer'
    import GContent from '../../../src/content'
    import GLayout from '../../../src/layout'
    import GSider from '../../../src/sider'

    export default {
        components:{
            GLayout, GHeader, GFooter, GContent, GSider
        },
        data() {
            return {
                content: `
            <g-layout style="color: white; margin-bottom:50px;">
                <g-header style="height: 50px; background:lightskyblue;">
                    header
                </g-header>
                <g-content style="height: 100px; background:deepskyblue;">
                    content
                </g-content>
                <g-footer style="height: 50px; background:lightskyblue;">
                    footer
                </g-footer>
            </g-layout>`
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