<template>
    <div style="padding-top: 16px;">
        <h2>用户需知</h2>
        <ul>
            <li>g-tabs（ 必须传入默认选择的tab）</li>
            <li>g-tabs-item（ 必须传入name属性）（可选属性：disabled）</li>
            <li>g-tabs-pane（ 必须传入name属性）</li>
        </ul>
        <h2>简单用法</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-tabs :selected="selected">
            <g-tabs-head>
                <g-tabs-item name="1">1</g-tabs-item>
                <g-tabs-item name="2">2</g-tabs-item>
            </g-tabs-head>
            <g-tabs-body>
                <g-tabs-pane name="1">content 1</g-tabs-pane>
                <g-tabs-pane name="2">content 2</g-tabs-pane>
            </g-tabs-body>
        </g-tabs>

        <p>
            <strong>代码</strong>
        </p>
<!--        <pre><code>{{content}}</code></pre>-->
    </div>
</template>

<script>
    import Tabs from '../../../src/tabs'
    import TabsBody from '../../../src/tabs-body'
    import TabsItem from '../../../src/tabs-item'
    import TabsHead from '../../../src/tabs-head'
    import TabsPane from '../../../src/tabs-pane'

    export default {
        components: {
            'g-tabs': Tabs,
            'g-tabs-body': TabsBody,
            'g-tabs-head': TabsHead,
            'g-tabs-item': TabsItem,
            'g-tabs-pane': TabsPane
        },
        data() {
            return {
                selected: '1',
                content: `
        data() {
            return {
                selected: '1'
                }
        }

        <g-tabs :selected="selected">
          <g-tabs-head>
            <g-tabs-item name="1">1</g-tabs-item>
            <g-tabs-item name="2">2</g-tabs-item>
          </g-tabs-head>
          <g-tabs-body>
            <g-tabs-pane name="1">content 1</g-tabs-pane>
            <g-tabs-pane name="2">content 2</g-tabs-pane>
          </g-tabs-body>
        </g-tabs>
    `.replace(/^ {8}/gm, '').trim()
        }
    }
}
</script>