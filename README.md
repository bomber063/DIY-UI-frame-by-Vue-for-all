## collapse组件
### collapse是什么
* collapse是手风琴组件，我们可以从[ant.design的collapse](https://ant.design/components/collapse-cn/)上面看到这个，它上面叫做Collapse折叠面板。它上面有些禁用的功能，但是禁用是否可以直接隐藏更好。
* 基本功能：
    * 就是点击一个按钮打开一个折叠面板。可以打开多个。
    * 点击打开一个按钮，点击另一个按钮的弹出折叠面板的时候关闭前面打开的折叠面板。也就是只能打开一个。
    * 还可以添加一个默认的箭头(这个先不做，以后再做)
    * 其他的功能基本都是改变样式或者动画(这个先不做，以后再做)
* 这个组件比较简单，基本都是前面用的知识，还有一些CSS样式
### 开始写代码
#### 下面的代码有部分最后还会修改
* [:first-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child) CSS pseudo-class 表示在一组**兄弟**元素中的**第一个元素**。