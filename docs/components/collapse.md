---
title: Collapse-手风琴
---
# Collapse-手风琴
 
<ClientOnly>
  <collapse/>
</ClientOnly>

```html
<g-collapse :selected.sync="selectedTab">
    <g-collapse-item title="标题1" name="1" style="background:#aaa;">内容1</g-collapse-item>
    <g-collapse-item title="标题2" name="2" style="background:#ccc;">内容2</g-collapse-item>
    <g-collapse-item title="标题3" name="3" style="background:#fff">内容3</g-collapse-item>
</g-collapse>
```



<ClientOnly>
  <collapse-demo-single/>
</ClientOnly>

```html
<g-collapse single :selected.sync="selectedTab">
    <g-collapse-item title="标题1" name="1" style="background:#aaa">内容1</g-collapse-item>
    <g-collapse-item title="标题2" name="2" style="background:#ccc">内容2</g-collapse-item>
    <g-collapse-item title="标题3" name="3" style="background:#fff">内容3</g-collapse-item>
</g-collapse>
```

::: tip
设定 single 同时建议 selectedTab 也为单个
:::

