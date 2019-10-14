## 课件Vue和JS自测题
### 第一题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
window.n = 'window name'
let obj = {
    n: 'obj name',
    sayN(){
        console.log(this.n)
    }
}

let fn = obj.sayN
fn()
```
* 回答：'window name'
### 第二题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
window.n = 'window name'
let obj = {
    n: 'obj name',
    sayN: () => {
        console.log(this.n)
    }
}

obj.sayN()
```
* 回答：'window name'
### 第三题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
class A{
    constructor(){
        this.name = 'A'
    }
    sayName(){
        console.log(this.name)
    }
}
class B extends A{
    constructor(){
        super()
        this.name = 'B'
    }
}

let obj = new B()
console.log(obj.sayName())
```
* 回答：'B'
### 第四题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
Promise.reject('error')
    .then( ()=>{console.log('success1')}, ()=>{console.log('error1')} )
    .then( ()=>{console.log('success2')}, ()=>{console.log('error2')} )
```
* 回答：先输出 'error1' 再输出 'success2'
### 第五题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
<div id=app></div>
```
```
window.name = 'window name'
let app = new Vue({
    name: 'name 1',
    el: '#app',
    data(){
      return {name:'name 2'}
    },
    created(){
        console.log(this.name)
    }
})
```
* 回答：'name 2'
### 第六题
* 关于 Vue 中的 key 属性，下列说法正确的有
* 回答：
1. 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
2. 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。
3. 理想的 key 值是每项都有的且唯一的 id。
4. 2.2.0+ 的版本里，当在组件中使用 v-for 时，key 是必须的。
### 第七题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

var Component = Vue.extend({
  mixins: [myMixin],
  methods: {
    hello(){
      console.log('hello from options')
    }
  }
})

var component = new Component()
```
* 回答：'hello from options'
### 第八题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
function getSomething(){
    setTimeout(function(){
        return 'hello'
    })
}

let something = getSomething()
console.log(something)
```
* 回答：undefined
### 第九题
* 下面代码的输出结果是什么？（请用大脑推断，不要借助控制台来运行，下同）
```
let _name = 'MyName'
let obj = {}
Object.defineProperty(obj, 'name', {
    get(){
        return _name
    },
    set(value){
        _name = value
    }
})

obj.name = 'NewName'
console.log(_name)
```
* 回答：'NewName'