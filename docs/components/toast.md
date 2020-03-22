---
title: Toast-弹窗
---
# Toast-弹窗
:::tip

若点击按钮无显示，需要设置
:::

```css
.gulu-toast {
    z-index: 30;
}
```

<ClientOnly>
  <toast-demo-1></toast-demo-1>
</ClientOnly>

```html
<g-button @click="$toast('你好看到我了吗？')">设置文字为'你好看到我了吗？'</g-button>
<g-button @click="$toast('我在这里')">设置文字为'我在这里'</g-button>
<g-button @click="$toast('你可以任意设置弹出消息')">设置文字为'你可以任意设置弹出消息'</g-button>
```


<ClientOnly>
  <toast-demo-2></toast-demo-2>
</ClientOnly>

```html
<g-button @click="$toast('点击弹出提示',{closeButton:false})">上方弹出</g-button>
<g-button @click="$toast('点击弹出提示', {closeButton:false,position:'middle'})">中间弹出</g-button>
<g-button @click="$toast('点击弹出提示', {closeButton:false,position:'bottom'})">下方弹出</g-button>
```


<ClientOnly>
  <toast-demo-3></toast-demo-3>
</ClientOnly>

```html
<p>
    <g-button @click="$toast('我在5秒后会自动关闭哦',{closeButton:false})">默认上方弹出(默认5秒自动关闭)</g-button>
</p>
<p>
    <g-button @click="$toast('我在1秒后会自动关闭哦',{closeButton:false,autoClose:1})">上方弹出(设置1秒自动关闭)</g-button>
</p>
```



<ClientOnly>
  <toast-demo-4></toast-demo-4>
</ClientOnly>

```html
<g-button @click="onClickButton">上方弹出</g-button>
```

```js
methods:{
    onClickButton(){
        this.$toast(`可以手动点击关闭哦`,{
            closeButton: {
                text: '关闭',
                callback() {
                    console.log('已经关闭')
                }
            },
        })
    }
}
```

<ClientOnly>
  <toast-demo-5></toast-demo-5>
</ClientOnly>

```html
<g-button @click="onClickButton">上方弹出</g-button>
```

```js
methods: {
    onClickButton () {
        this.$toast('<strong style="color:red;">加粗的提示</strong>', {
            enableHtml: true
        })
    }
}
```