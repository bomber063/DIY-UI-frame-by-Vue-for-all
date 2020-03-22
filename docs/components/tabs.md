---
title: Tabs-标签
---
# Tabs-标签

<ClientOnly>
  <tabs-demo-1></tabs-demo-1>
</ClientOnly>

```html
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
```

```js
data() {
    return {
        selected: '1'
        }
}
```


<ClientOnly>
  <tabs-demo-2></tabs-demo-2>
</ClientOnly>

```html
<g-tabs :selected="selected">
    <g-tabs-head>
        <g-tabs-item name="1">1</g-tabs-item>
        <g-tabs-item name="2">2</g-tabs-item>
        <g-tabs-item name="3" disabled>3</g-tabs-item>
    </g-tabs-head>
    <g-tabs-body>
        <g-tabs-pane name="1">content 1</g-tabs-pane>
        <g-tabs-pane name="2">content 2</g-tabs-pane>
        <g-tabs-pane name="3">content 3</g-tabs-pane>
    </g-tabs-body>
</g-tabs>
```

```js
data() {
    return {
        selected: '1'
        }
}
```
