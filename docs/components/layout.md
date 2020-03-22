---
title: Layout-布局
---
# Layout-布局

<ClientOnly>
  <layout-demo-1></layout-demo-1>
</ClientOnly>

```html
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
```


<ClientOnly>
  <layout-demo-2></layout-demo-2>
</ClientOnly>

```html
<g-layout style="color: white; overflow:hidden; margin-bottom:50px;">
    <g-header style="height: 50px; background:lightskyblue;">
        header
    </g-header>
    <g-layout>
        <g-sider style="height: 100px; background:#ddd; width:200px; color: black;">
            sider
        </g-sider>
        <g-content style="height: 100px; background:deepskyblue;">
            content
        </g-content>
    </g-layout>
    <g-footer style="height: 50px; background:lightskyblue;">
        footer
    </g-footer>
</g-layout>
```



<ClientOnly>
  <layout-demo-3></layout-demo-3>
</ClientOnly>


```html
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
```