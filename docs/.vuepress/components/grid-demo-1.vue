<template>
    <div style="padding-top: 16px;">
        <h2>24格网格说明</h2>
        <ul>
            <li>网格就是把一个页面<strong>每一行分成 N 个部分</strong>（N = 12,16,24...），使用本组件通过行（row）和列（col）来定义你的页面</li>
            <li><strong>默认</strong>支持各种移动设备的<strong>响应式适配</strong></li>
            <li>支持<strong>设置gutter属性</strong>任意设置<strong>每一行所有</strong>元素之间的<strong>固定空隙</strong></li>
            <li>支持<strong>设置offset属性</strong>任意设置<strong>每一行两个</strong>元素之间的<strong>任意空隙</strong></li>
            <li>支持<strong>设置span属性</strong>来控制<strong>每一行每一个部分的宽度</strong></li>
        </ul>

        <h2>设置span控制宽度</h2>
        <p></p>
        <p>
            <strong>预览</strong>
        </p>
        <g-row class="demoRow">
            <g-col span="8">
                <div class="demoCol">8</div>
            </g-col>
            <g-col span="8">
                <div class="demoCol">8</div>
            </g-col>
            <g-col span="8">
                <div class="demoCol">8</div>
            </g-col>
        </g-row>
        <g-row class="demoRow">
            <g-col span="6">
                <div class="demoCol">6</div>
            </g-col>
            <g-col span="6">
                <div class="demoCol">6</div>
            </g-col>
            <g-col span="6">
                <div class="demoCol">6</div>
            </g-col>
            <g-col span="6">
                <div class="demoCol">6</div>
            </g-col>
        </g-row>
        <g-row class="demoRow">
            <g-col span="4">
                <div class="demoCol">4</div>
            </g-col>
            <g-col span="4">
                <div class="demoCol">4</div>
            </g-col>
            <g-col span="4">
                <div class="demoCol">4</div>
            </g-col>
            <g-col span="4">
                <div class="demoCol">4</div>
            </g-col>
            <g-col span="4">
                <div class="demoCol">4</div>
            </g-col>
            <g-col span="4">
                <div class="demoCol">4</div>
            </g-col>
        </g-row>
        <g-row class="demoRow">
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
            <g-col span="2">
                <div class="demoCol">2</div>
            </g-col>
        </g-row>

        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
    </div>
</template>

<script>
    import Col from '../../../src/col'
    import Row from '../../../src/row'

    export default {
        components:{
            gCol:Col,
            gRow:Row
        },
        data() {
            return {
                content: `
                        * {
                box-sizing: border-box;
            }
            .demoRow{
                margin: 10px 0;
            }
            .demoCol {
                height: 50px;
                border: 1px solid #ccc;
                background: #eee;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            <g-row class="demoRow">
                <g-col span="8">
                    <div class="demoCol">8</div>
                </g-col>
                <g-col span="8">
                    <div class="demoCol">8</div>
                </g-col>
                <g-col span="8">
                   <div class="demoCol">8</div>
                </g-col>
            </g-row>
            <g-row class="demoRow">
              <g-col span="6">
                  <div class="demoCol">6</div>
                </g-col>
                <g-col span="6">
                    <div class="demoCol">6</div>
                </g-col>
                <g-col span="6">
                    <div class="demoCol">6</div>
                </g-col>
                <g-col span="6">
                    <div class="demoCol">6</div>
                </g-col>
            </g-row>
            <g-row class="demoRow">
                <g-col span="4">
                    <div class="demoCol">4</div>
                </g-col>
                <g-col span="4">
                    <div class="demoCol">4</div>
                </g-col>
                <g-col span="4">
                    <div class="demoCol">4</div>
                </g-col>
                <g-col span="4">
                    <div class="demoCol">4</div>
                </g-col>
                <g-col span="4">
                    <div class="demoCol">4</div>
                </g-col>
                <g-col span="4">
                    <div class="demoCol">4</div>
                </g-col>
            </g-row>
            <g-row class="demoRow">
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
                <g-col span="2">
                    <div class="demoCol">2</div>
                </g-col>
            </g-row>`
            .replace(/^ {8}/gm, '').trim()
            }
        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .demoRow{
        margin: 10px 0;
    }
    .demoCol {
        height: 50px;
        border: 1px solid #ccc;
        background: #eee;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>