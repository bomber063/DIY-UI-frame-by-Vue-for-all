---
title: Button-按钮
---
# Button-按钮
<ClientOnly>
  <button-demo-1></button-demo-1>
</ClientOnly>

```html
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
```

<ClientOnly>
  <button-demo-2></button-demo-2>
</ClientOnly>

```html
<g-button-group>
    <g-button icon="left">上一页</g-button>
    <g-button>更多</g-button>
    <g-button icon="right">下一页</g-button>
</g-button-group>
```

::: warning
g-button-group的子元素应该全是g-button元素,否则会有警告提示。
:::
