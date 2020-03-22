---
title: Popover-弹出层
---
# Popover-弹出层

<ClientOnly>
  <popover-demo-1></popover-demo-1>
</ClientOnly>

```html
<g-popover position="top">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>上方弹出</g-button>
</g-popover>
<g-popover position="bottom">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>下方弹出</g-button>
</g-popover>
<g-popover position="left">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>左边弹出</g-button>
</g-popover>
<g-popover position="right">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>右边弹出</g-button>
</g-popover>
```

<ClientOnly>
  <popover-demo-2></popover-demo-2>
</ClientOnly>

```html
<g-popover position="top">
    <template slot="content">
        <div><p class="g-p">弹出内容</p></div>
    </template>
    <g-button>上方弹出</g-button>
</g-popover>
<g-popover position="bottom">
    <template slot="content">
        <div><p class="g-p">弹出内容</p></div>
    </template>
    <g-button>下方弹出</g-button>
</g-popover>
<g-popover position="left">
    <template slot="content">
        <div><p class="g-p">弹出内容</p></div>
    </template>
    <g-button>左边弹出</g-button>
</g-popover>
<g-popover position="right">
    <template slot="content">
        <div><p class="g-p">弹出内容</p></div>
    </template>
    <g-button>右边弹出</g-button>
</g-popover>
```

```css
.g-p {
    margin:0;
    color:red;
}
```

<ClientOnly>
  <popover-demo-3></popover-demo-3>
</ClientOnly>

```html
<g-popover position="top" trigger="hover">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>上方弹出</g-button>
</g-popover>
<g-popover position="bottom" trigger="hover">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>下方弹出</g-button>
</g-popover>
<g-popover position="left" trigger="hover">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>左边弹出</g-button>
</g-popover>
<g-popover position="right" trigger="hover">
    <template slot="content">
        <div>弹出内容</div>
    </template>
    <g-button>右边弹出</g-button>
</g-popover>
```


<ClientOnly>
  <popover-demo-4></popover-demo-4>
</ClientOnly>

```html
<g-popover>
    <template slot="content" slot-scope="xxx">
        可以点击右边的关闭按钮关闭<g-button name='xxx' @click="xxx.close">关闭</g-button>
    </template>
    <g-button>点击弹出后会有关闭按钮</g-button>
</g-popover>
```


<ClientOnly>
  <popover-demo-5></popover-demo-5>
</ClientOnly>

```html
<g-popover>
    <template slot="content" slot-scope="{close}">
        可以点击右边的关闭按钮关闭<g-button @click="close">关闭</g-button>
    </template>
    <g-button>上方弹出</g-button>
</g-popover>
```

<ClientOnly>
  <popover-demo-6></popover-demo-6>
</ClientOnly>

```html
<g-popover position="top">
    <template v-slot:content="xxx">
        可以点击右边的关闭按钮关闭<g-button name="xxx" @click="xxx.close">关闭</g-button>
    </template>
    <g-button>上方弹出</g-button>
</g-popover>
```