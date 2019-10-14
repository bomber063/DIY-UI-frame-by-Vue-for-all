## Vue自测题
### 第一题
* Vue 是一套______???_____框架
* 回答：用于构建用户界面的渐进式
### 第二题
html
```
<div id="app">
  __________???___________
</div>
```
js
```
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
* 问号处应该填入什么，才能使得页面可以显示 message 的值？
* 回答：{{message}}
### 第三题
html
```
<div id="app">
  <span ____________???____________>
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```
js
```
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
* 问号处应该填入什么，才能使得 span 的 title 为 message 的值？（多选）
* 建议你使用 [jsbin](https://jsbin.com/lecapid/1/edit?html,js,output) 或者 jsfiddler 试一下再回答。\
* 回答：
1. :title="message"
2. v-bind:title="message"
3. :title=message
4. v-bind:title=message
### 第四题
html
```
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```
js
```
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: false
  }
})
```
以下描述正确的是有（多选）
建议你使用 [jsbin](https://jsbin.com/lecapid/1/edit?html,js,output) 或者 jsfiddler 试一下再回答。
* 回答
1. 用户看不见该 p 元素
2. DOM 结构中不含该 p 元素
3. 用户看不见该 p 元素是因为该 p 元素没有出现在 DOM 结构中
### 第五题
html
```
<div id="app-4">
  <ol>
    <li v-for="________???_____">
      {{ todo.text }}
    </li>
  </ol>
</div>
```
js
```
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```
横线处应该填写什么，才能使得页面展示 todos 的三项内容？
建议你使用 [jsbin](https://jsbin.com/lecapid/1/edit?html,js,output) 或者 jsfiddler 试一下再回答。
* 回答：
1. todo in todos
2. todo of todos
### 第六题
html
```
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">逆转消息</button>
</div>
```
js
```
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  reverseMessage: function () {
    this.message = this.message.split('').reverse().join('')
  }
})
```
[开发者工具的控制台报错](https://jsbin.com/kegujer/1/edit?html,js,output) ReferenceError: reverseMessage is not defined，请问是为什么？
建议你使用 [jsbin](https://jsbin.com/lecapid/1/edit?html,js,output) 或者 jsfiddler 试一下再回答。
* 回答：因为reverseMessage应该放到methods对象里面
### 第七题
Vue 支持 IE8 及以下版本吗？
* 回答：不支持
### 第八题
Vue 2.5 有哪几个构建版本？（多选）
* 回答：
1. 一个同时包含编译器和运行时的版本（简称为完整版）
2. 一个只包含运行时的版本
### 第九题
关于不同版本的说话，正确的有
* 回答：
1. 如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版
2. 当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。
3. 运行时版本相比完整版体积要小约 30%
### 第十题
文档说我们可以通过哪些方式将 Vue 引入我们的页面中？
* 回答：
1. CDN
2. webpack
3. Rollup
4. Browserify
5. Parcel