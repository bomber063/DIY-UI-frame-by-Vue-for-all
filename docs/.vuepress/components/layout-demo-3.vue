<template>
    <div style="padding-top: 16px;">
        <h2>设置sider作为侧边栏预览</h2>
        <p>
            可以点击<strong>关闭</strong>
        </p>
        <p>预览</p>
        <g-layout style="color: white; overflow:hidden; margin-bottom:50px;">
            <g-sider style=" background:#ddd; width:200px; color: black;">
                sider
            </g-sider>
            <g-layout>
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
            <g-layout style="color: white; overflow:hidden; margin-bottom:50px;">
              <g-sider style=" background:#ddd; width:200px; color: black;">
                sider
              </g-sider>
              <g-layout>
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