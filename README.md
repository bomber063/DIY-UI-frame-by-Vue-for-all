## toast组件
* toast就是烤面包机类似。参考[framework7的toast](http://www.framework7.cn/docs/toast.html)
* 用例需求如下：
    1. 弹出toast——自动关闭（可以设置n秒钟后自动关闭）
    2. 弹出toast——用户点击关闭——触发一个回调函数
    3. 第二次或多次弹出toast的时候，保证只有一个toast。（可选，允许多个toast，但是出现的位置最好是一个位置）
    * 关闭不使用传统PC电脑的×，而是用苹果系统的关闭两个字
## 开始写代码的准备
### 使用插件
* 创建一个toast.vue组件，组件里面的建议按照template,script,style的顺序写代码(主要按照重要性顺序)
* 我们用this.$toast()来触发这个toast组件。这里的toast换成message也行,那么如何做到this上面有一个$toast?，那就是[使用插件](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)和[install](https://cn.vuejs.org/v2/api/)
* [使用插件](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)，通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成：**用户**只要输入
```
// 调用 `MyPlugin.install(Vue)
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```
* 也可以传入一个可选的选项对象：
```
Vue.use(MyPlugin, { someOption: true })
```
* 看一下别的框架(比如ant.design,element等)并没有要求用户写上这个插件的代码， **那么就是需要开发者帮用户写上，所以需要写一个插件**。
#### 使Vue原型上面定义$toast
* 我们先不用插件，而使Vue的原型上增加$toast,这个在toast.vue组件上实现
```
    import Vue from 'vue'
    Vue.prototype.$toast=function(){
        console.log('我是toast')
    }
```
* 这样之后，Vue的所有实例上面都可以使用$toast这个函数了.于是我们在app.js里面在new Vue里面用created测试就可以打印出`我是toast`了
```
new Vue({
    created(){
        this.$toast('当前方法不稳定，如果遇到bug请关闭该功能')
    }
})
```
* 但是直接这样去改prototype其实并不好，他是一个工程问题。
    1. 有可能之前就已经有一个$toast，那么这样就强行把$toast值给覆盖掉了。就算你加了if,比如下面代码，如果真的不是undefined，就没有处理方案了。(侵入性太强，有可能造成bug)
    ```
        if (Vue.prototype.$toast === undefined) {
            Vue.prototype.$toast = function () {
                console.log('我是toast')
            }
        }
    ```
    2. 前面在toast.vue组件里面写了下面代码,这里有可能vue不是vue而是vue2(这里有非常小的可能，我不知道老师为什么这么说，那app.js上面不是也是vue么)
    ```
        import Vue from 'vue'
    ```
#### 所以需要弄一个插件(plugin.js)来代替上面的写法
* 根据文档所说，就是写一个[插件](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)，让用户主动去使用。
* 开发插件
    * Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：
    ```
    MyPlugin.install = function (Vue, options) {
      // 1. 添加全局方法或属性
      Vue.myGlobalMethod = function () {
        // 逻辑...
      }
    
      // 2. 添加全局资源
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // 逻辑...
        }
        ...
      })
    
      // 3. 注入组件选项
      Vue.mixin({
        created: function () {
          // 逻辑...
        }
        ...
      })
    
      // 4. 添加实例方法
      Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
      }
    }
    ```
* 使用插件
    * 你需要给插件定义一个install方法.然后用Vue。use来调用它比如
    ```
    // 调用 `MyPlugin.install(Vue)`
    Vue.use(MyPlugin)
    
    new Vue({
      // ...组件选项
    })
    ```
    * 也可以传入一个可选的选项对象：
    ```
    Vue.use(MyPlugin, { someOption: true })
    ```
* 那么我们在plugin.js里面就写成，这里没有写import vue，而是用的外面的外面的app.js通过Vue.use(plugin)传进来的vue。
```
//我们没有import vue ,这个vue是外面的app.js通过Vue.use(plugin)传进来的
export default {
    install(Vue,options){
        Vue.prototype.$toast=function(){
            console.log('I am toast')
        }
    }
}
```
* 在app.js里面通过Vue.use引用这个plugin.js，并且这个是用户主动写的，如果覆盖了原有的属性，用户可以自己选择不用。
```
import plugin from './plugin.js'

Vue.use(plugin)//这个use会去执行plugin里面的install方法,并且这个是用户主动写的
```
* 这样同样会打印出`I am toast`
* 然后继续在plugin.js插件上增加代码使得弹出toast。
* 在index.html上
```
<div id="app">
    <button @click="showToast">点我</button>
</div>
```
* app.js上增加一个methods
```
    methods:{
        showToast(){
            this.$toast('当前方法不稳定，如果遇到bug请关闭该功能')
        }

    }
```
* 这样就实现了一个button点击后弹出toast。
* 接下来把alert换成div的方式，如果不用Vue，用原生的JS很简单
```
export default {
    install(Vue,options){
        Vue.prototype.$toast=function(message){
            var div=document.createElement('div')
            div.textContent=message
            document.body.appendChild(div)
        }
    }
}
```
* 但是我们需要用Vue来实现。我们用js来动态创建组件实例(前面测试的时候用来一样的代码)，我们需要用到[Vue-extend](https://cn.vuejs.org/v2/api/#Vue-extend)
    1. 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。data 选项是特例.
    2. 需要注意 - 在 Vue.extend() 中它必须是**函数**,**这里就是另一种创建并挂载到元素的组件的方式**。
* 另外还需要用到[$slots](https://cn.vuejs.org/v2/api/?#vm-slots)
    1. 用来访问被插槽分发的内容。每个具名插槽 有其相应的属性 (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。
    2. default 属性包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
* [vm.$mount( [elementOrSelector] )](https://cn.vuejs.org/v2/api/?#vm-slots)
    1. 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
    2. 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
    3. 这个方法返回实例自身，因而可以链式调用其它实例方法。
* 在plugin.js里面操作toast.vue这个组件，从而就实现了点击按钮弹出toast。
```
import Toast from './toast'
export default {
    install(Vue,options){
        Vue.prototype.$toast=function(message){
            let Constructor=Vue.extend(Toast)
            let toast=new Constructor()//toast.vue组件创造的实例就是toast
            toast.$slots.default=message//这个toast.$slots.default必须要放到$mount()之前,他是给toast穿了一个默认的插槽slot的内容
            toast.$mount()//这句话是使toast的所有生命周期的钩子执行
            document.body.appendChild(toast.$el)//如果没有提供 elementOrSelector 参数，这个参数就是vm.$mounte(elementOrSelector)里面的参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
        }
    }
}
```
* 接下来在toast.vue组件上增加样式，让`message`这个变量里面出现的字出现在中间。
```
    $font-size:14px;
    $toast-height:40px;
    $toast-bg:rgba(0,0,0,0.75);
    .toast{
        font-size: $font-size;
        line-height:1.8;
        height: $toast-height;
        position:fixed;
        top:0;
        left:50%;
        transform:translateX(-50%);
        display:flex;
        color:white;
        align-items: center;
        background: $toast-bg;
        border-radius:4px;
        box-shadow:0px 0px 3px 0px rgba(0,0,0,0.50);
        padding:0 16px;
    /*    一般padding都是4或者8的倍数*/
    }
```
* 但是目前还存在bug,就是每次点击都会弹出一个toast，多次点击会在同一个地方弹出多个toast
### 修复弹出多个toast的bug
* 
