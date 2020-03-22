---
title: Input-输入框
---
# Input-输入框

<ClientOnly>
  <input-demo-1></input-demo-1>
</ClientOnly>

```html
<g-input></g-input>
<g-input valuea="默认"></g-input>
<g-input valuea="禁用1" disableda></g-input>
<g-input valuea="禁用2" readonlya></g-input>
<g-input valuea="错误信息提示" errora="错误"></g-input>
```


<ClientOnly>
  <input-demo-2></input-demo-2>
</ClientOnly>

```js
data:{
    value:'改变这里下面会跟着变化吗？'
}
```
```html
<g-input :valuea="value" @inputa="value=$event"></g-input>
<div>
  value: {{value}}
</div>
```


