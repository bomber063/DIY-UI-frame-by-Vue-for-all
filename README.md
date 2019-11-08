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
* 接下来把alert换成div的方式，如果不用Vue，用原生的JS很简单,但是目前整个代码都是用Vue写的，**那么使用Vue来创建一个组件比创建一个元素，并且可以在组件里面使用Vue的操作代码的方法，比如`<div class="toast" @click="methods">`**,如果用原生的那就需要`var div='...' div.addEventListener('click',function(){})`
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
### 增加更多功能
#### 自动关闭功能
* 在toast.vue组件里面增加props参数(autoClose,autoCloseDelay)和methods(close())事件,**就可以实现自动关闭啦**
```
        props:{
            autoClose:{
                type:Boolean,
                default:true
            },
            autoCloseDelay:{
                type:Number,
                default: 5
            }
        },
        mounted(){
            if(this.autoClose){
                setTimeout(()=>{
                  this.close()
                },this.autoCloseDelay*1000)
            }
        },
        methods:{
            close(){
                this.$el.remove()//把这个元素删除
                this.$destroy()//他会把绑定的事件取消掉
            }
        }
```
#### 手动关闭功能
* 不要自动关闭，添加一个手动关闭的按钮。我们在toast.vue里面增加一个props就是`closeButton`,**它是一个对象我们先写成不带函数的default，测试报错情况**
```
        props:{
            autoClose:{
                type:Boolean,
                default:true
            },
            autoCloseDelay:{
                type:Number,
                default: 5
            },
            closeButton:{
                type:Object,
                default:{
                    text:'关闭',callback:(toast)=>{
                        toast.close()
                    }
                }
            }
        },
```
* 我们通过点击这个按钮后在控制台看到报错。
```
vue.common.dev.js:630 [Vue warn]: Invalid default value for prop "closeButton": Props with type Object/Array must use a factory function to return the default value.

(found in <Root>)
```
* 根据[props在vue中的说明](https://cn.vuejs.org/v2/api/?#props)我们也了解到
    * default: any
      为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。**对象或数组的默认值必须从一个工厂函数返回。**
* 改写成这样的函数return形式就不报错了
```
            closeButton: {
                type: Object,
                default:()=>{
                    return {
                        text: '关闭', callback: (toast) => {
                            toast.close()
                        }
                    }
                }
            }
```
* 也可以直接按照ES6的函数的写法
```
            closeButton: {
                type: Object,
                default(){
                    return {
                        text: '关闭', callback: (toast) => {
                            toast.close()
                        }
                    }
                }
            }
```
#### export default后面的一个对象是什么，为什么函数和数组的默认default必须是一个函数
* 这个对象是组件的一个选项,**它并不是组件本身**，比如下面的就是定义了组件的名字(name),变量（props）等
```
<script>
    //这个对象是组件的一个选项,**它并不是组件本身
    export default {
        name:'GuluToast',
        props:{
            autoClose:{
                type:Boolean,
                default:true
            },
            autoCloseDelay:{
                type:Number,
                default: 5
            },
            closeButton: {
                type: Object,
                default:()=>{
                    return {
                        text: '关闭', callback: (toast) => {
                            toast.close()
                        }
                    }
                }
            }
        }
    }
```
* 我们写成全局注册的样子,就是这样
```
Vue.component('my-component-name', {
  // ... 选项 ...
  name:...,
  template:...,
  props:...
})
```
* 所以前面的的`export default`后面的东西就是**全局注册的第二个参数**。
* 如果我们每次在选项里面把一个对象或者数组不写成函数形式，那么每一次初始化一个组件的时候都会初始化同一个选项。如果页面里面有两个toast组件，那么其中一个toast改了这个选项，那么另外一个toast也会被影响到。[在vue中的组件基础中也有例子](https://cn.vuejs.org/v2/guide/components.html),但是如果你写成一个函数return返回，那么这里就是一个新的选项，就不会互相影响。
* 那么对于非对象的数字或者布尔这些呢，因为非对象的类型的拷贝是浅拷贝（老师说这里是浅拷贝）。因为非对象类型没有引用，是直接拷贝的，但是对象都是引用地址的。同一个地址对应的信息改变，那么就会影响到其他的引用这个地址的信息。
#### 我们可以在plugin.js里面传入这个选项来实现传参
* 在new创建的Vue实例中用[propsData](https://cn.vuejs.org/v2/api/#propsData)代表自定义变量
```
    install(Vue,options){
        Vue.prototype.$toast=function(message){
            let Constructor=Vue.extend(Toast)
            let toast=new Constructor({
                propsData:{
                    closeButton:{
                        text:'知道了',
                        callback(){
                            console.log('用户说他知道了')
                        }
                    }
                }

            })//toast.vue组件创造的实例就是toast
            toast.$slots.default=message//这个toast.$slots.default必须要放到$mount()之前,他是给toast穿了一个默认的插槽slot的内容
            toast.$mount()//这句话是使toast的所有生命周期的钩子执行
            document.body.appendChild(toast.$el)//如果没有提供 elementOrSelector 参数，这个参数就是vm.$mounte(elementOrSelector)里面的参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
        }
    }
```
* 接下来在toast.vue里面使用这个closeButton,我们就看到这个closeButton的值了。因为Vue原型链上(plugin.js上的代码)的closeButton会覆盖掉自己的(toast.vue上的代码)closeButton。最后出现的是`知道了`，而不是默认的`关闭`。
```
<template>
    <div class="toast">
        <slot></slot>
        <span v-if="closeButton">
            {{closeButton.text}}
        </span>
    </div>
</template>
```
#### 关闭按钮增加一条线隔开
* 增加CSS实现一条线隔开关闭按钮,toast.vue中增加
```
    <div class="line"></div>

    .line{
        border-left:1px solid #666;
        height:100%;
        margin-left:16px;
    }
```
#### 点击关闭按钮之后关闭
* 当点击关闭按钮的时候触发一个onClickClose事件,这是事件就是关闭toast这个组件，并且触发在plugin.js里面的覆盖默认（默认的在toast组件closeButton参数里面）回调函数的回调函数callback。
```
    <span class="close" v-if="closeButton" @click="onClickClose">
        {{closeButton.text}}
    </span>
    
    methods:{//两个方法函数
        close(){//关闭自己
            this.$el.remove()//把这个元素删除
            this.$destroy()//他会把绑定的事件取消掉
        },
        onClickClose(){//当用户点击关闭按钮的时候关闭自己，并且调用closeButton的回调函数。
            this.close()
            this.closeButton.callback()
        }
    }
```
#### 几个问题
* 问题1——销毁组件我们现在的代码是
    ```
        close(){//关闭自己
            this.$el.remove()//把这个元素删除
            this.$destroy()//他会把绑定的事件取消掉
        },
    ```
    * 单独`this.$destroy()`是不行的。经过测试发现`$destroy()`并不会把元素从页面中删除掉。
* 问题2——callback是从哪里来的
    * **用户**在调用plugin.js的时候传进来的**选项**参数里面有这个callback回调
    ```
        propsData:{
            closeButton:{
                text:'知道了',
                callback(){
                    console.log('用户说他知道了')
                }
            }
        }
    ```
    * 实际上我们如果不在插件plugin.js，那么**用户**就直接写到app.js里面也可以，其实就是**用户传进来**的，可以写到app.js的created()函数的`this.$toast`的**参数的选项**里面
    ```
        created(){
            this.$toast('我是toast',{
                closeButton: {
                    text: '知道了',
                    callback() {
                        console.log('用户说他知道了')
                        console.log()
                    }
                }
            })
    ```
    * 然后插件里面修改为,把这个closeButton从用户(app.js)的选项里面通过`closeButton:toastOptions.closeButton`获取这个选项(toastOptions)，作为propData传给toast.vue组件，然后toast.vue组件拿到这个closeButton就可以使用了。
    ```
    install(Vue,options){
        Vue.prototype.$toast=function(message,toastOptions){//增加一个选项toastOptions
            let Constructor=Vue.extend(Toast)
            let toast=new Constructor({
                propsData:{//从toastOptions中获取到closeButton
                    closeButton:toastOptions.closeButton
                }

            })//toast.vue组件创造的实例就是toast
        }
    }
    ```
    * toast.vue组件拿到这个closeButton就可以使用了三个地方
        1. `<span class="close" v-if="closeButton" @click="onClickClose">`
        2. `{{closeButton.text}}`
        3. 
        ```
        onClickClose(){//当用户点击关闭按钮的时候关闭自己，并且调用closeButton的回调函数。
                this.close()
                this.closeButton.callback()
            }
        ```
* 问题3——当用户不传这个closeButton的时候。我们先把默认的closeButton的callback改为undefined
    ```
                closeButton: {//是否有关闭按钮
                    type: Object,
                    default(){
                        return {
                            text: '关闭', callback: undefined
                        }
                    }
                }
    ```
    * 那么我们就用if来增加一些检查它是否有closeButton和是否传的callback是一个函数,如果没有为false，那么就不调用这个回调函数callback。
    ```
                onClickClose(){//当用户点击关闭按钮的时候关闭自己，并且调用closeButton的回调函数。
                    this.close()
                    if(this.closeButton&&typeof this.closeButton.callback==='function' ){
                        this.closeButton.callback()
                    }
                }
    ```
* 问题4——如果callback想调用组件里面的某个方法，这里比如是log()方法,**这里我们就把这个组件的实例作为this传入到这个callback的参数里面**，并且在别的地方的参数就可以调用这个而组件上的log方法啦
    * 在toast.vue组件上增加一个log方法,**并且把这个组件的实例作为this传到这个callback的参数里面**
    ```
                log(){
                  console.log('测试')
                },
                onClickClose(){//当用户点击关闭按钮的时候关闭自己，并且调用closeButton的回调函数。
                    this.close()
                    if(this.closeButton&&typeof this.closeButton.callback==='function' ){
                        this.closeButton.callback(this)//这里的this就是当前的toast组件实例
                    }
                }
    ```
    * 在app.js里面就可以通过**回调函数callback传参调用这个toast.vue组件的log方法啦**
    ```
        created(){
            this.$toast('我是toast',{
                closeButton: {
                    text: '知道了',
                    callback(a) {//这里的a就是toast.vue组件的实例
                        a.log()
                    }
                }
            })
        },
    ```
* 问题5——能否往组件的选项里面传元素。
    * 当然是可以的，简单做一些加粗和红色的字
    * 如果你直接写加粗strong标签就没有效果
    ```
            this.$toast('我是<strong>toast</strong>',{
                closeButton: {
                    text: '知道了',
                    callback(a) {
                        a.log()
                    }
                }
            })
    ```
    * 因为**直接传过去是传到toast.vue的slot标签上面。这个标签不能使用Vue的绑定**。
    * 我们改成[v-html](https://cn.vuejs.org/v2/api/#v-html)的[原始html](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8E%9F%E5%A7%8B-HTML)来实现,双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令：
    * 这个有v-html的div的内容将会被替换成为`$slots.default`,把原来的slot注释掉，用` <div v-html="$slots.default"></div>`代替，因为在plugin.js里面传入参数的时候就是`toast.$slots.default=message`,但是这种方式有受到**[XSS攻击的危险](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8E%9F%E5%A7%8B-HTML)**
    ```
    <template>
        <div class="toast">
    <!--        <slot></slot>-->
            <div v-html="$slots.default"></div>
    <!--        因为在plugin.js里面传入参数的时候就是toast.$slots.default=message-->
            <div class="line"></div>
            <span class="close" v-if="closeButton" @click="onClickClose">
                {{closeButton.text}}
            </span>
        </div>
    </template>
    ```
    * 这样我们就实现了前面的`我是<strong>toast</strong>`就**不是字符串形式出现，而是HTML格式的内容呈现在页面中**
    * 我们还可以写的更复杂
    ```
            this.$toast('<p>段落<strong>hi<a href="http://www.qq.com">qq</a></strong></p>',{
                closeButton: {
                    text: '知道了',
                    callback(a) {
                        a.log()
                    }
                }
            })
    ```
    * 因为传html是一种危险的操作代码，所以我们加一个选项。让用户选择是否开启，除了问题用户自己负责。
    * toast.vue组件里面
    ```
    <template>
        <div class="toast">
    <!--        如果没有enableHtml，就用 slot-->
            <slot v-if="!enableHtml"></slot>
    <!--        如果有enableHtml,就用下面的div-->
            <div v-if="enableHtml" v-html="$slots.default"></div>
        </div>
    </template>
    
    props:{
        enableHtml:{
            type:Boolean,
            default:false
        }
    },
    ```
    * plugin.js里面修改为
    ```
        Vue.prototype.$toast=function(message,toastOptions){
            let Constructor=Vue.extend(Toast)
            let toast=new Constructor({
                propsData:
                    toastOptions
            })//toast.vue组件创造的实例就是toast
        }
    ```
    * 然后再app.js里面设置enableHtml属性为true就是
    ```
            this.$toast('<p>段落<strong>hi<a href="http://www.qq.com">qq</a></strong></p>',{
                closeButton: {
                    text: '知道了',
                    callback(a) {
                        a.log()
                    }
                },
                enableHtml: true
            })
    ```
    * 这样就实现了普通的字符串格式和html格式的代码切换。
    * 但是如果是enableHtml是false的时候会**导致关闭按钮被挤得由横向变成竖向**，我们通过在toast.vue组件里面设置CSS的[flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink),它的负值无效。默认为1,设置为0的时候就不缩进。
    ```
            .close{
                padding-left:16px;
                flex-shrink: 0;
            }
    ```
#### message内容如果过长，使用vue的ref
* 如果this.$toast(message,{})的message内容如果过长就会导致不能自适应。因为我们设置了不可自适应的高度`height`，把它改为`min-height`
```
<style lang="scss" scoped>
    $toast-min-height:40px;
    .toast{
        min-height: $toast-min-height;
    }
</style>
```
* 但是设置了`min-height`之后**隔开的线消失了**.**因为把`height`改为`min-height`之后，那么子元素的的`height:100%`就不生效了。**，我们可以通过绝对定位`position:absolute`来测试发现定位出现在奇怪的位置。所以最后我们选择用JS代码来解决，这里用到[ref](https://cn.vuejs.org/v2/api/#ref)来[访问子组件实例或子元素](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)
* 简单的来说定义了`ref`的标签，可以通过`this.$refs`来调用这个标签。
* 我们toast.vue里面代码增加ref
```
    <div class="toast" ref="wrapper">
        <div class="line" ref="line"></div>
    </div>
```
* 然后如果通过下面的使用是不行的，获取不到高度`height`，因为[HTMLElement.style](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/style)属性返回一个 CSSStyleDeclaration 对象，**表示元素的 内联style 属性（attribute），但忽略任何样式表应用的属性。**
```
        mounted(){
            if(this.autoClose){//mounted之后会定时的关闭自己
                setTimeout(()=>{
                  this.close()
                },this.autoCloseDelay*1000)
            }
            this.$refs.line.style.height=this.$refs.wrapper.style.height//这种方式获取不到高度
        },
```
* 我们使用[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect),Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。,包括 left, top, right, bottom, x, y, width, height。**还要注意一点，它是没有单位的，需要自己加上**
* 并且这里还需要**加上setTimeout异步**，这也是一个检查问题(debugger)的方法，如果发现一个元素有高度，但是没有加异步的时候没有高度，那就加上异步吧
```
        setTimeout(()=>{
            this.$refs.line.style.height=this.$refs.wrapper.getBoundingClientRect().height+'px'
        },1000)
```
* 因为前面在plugin.js的代码里面我们是先mounted，然后再放到页面里面的。
```
  toast.$mount()//先mount
    document.body.appendChild(toast.$el)//然后放到页面
```
* 除了使用setTimeout还可以使用Vue提供的api——[vm.$nextTick( [callback] )](https://cn.vuejs.org/v2/api/#vm-nextTick),它是一种[异步队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)的方式，将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。而且这里不用谢延迟时间，也就是不需要等延迟时间，比如
```
        this.$nextTick(()=>{
            this.$refs.line.style.height=this.$refs.wrapper.getBoundingClientRect().height+'px'
        })
```
***
> 小结
* 当我们把高度由`height`变成`min-height`之后，**虽然解决了字的容纳，字体可以自适应**，但是引发了另一个BUG，白色的分隔的线**没有办法根据父元素计算**。
* 解决这个BUG就是在mounted之后，在**异步(vm.$nextTick，也就是下一次事件队列执行的时候)的前提**下用`ref`和`Element.getBoundingClientRect()`把这个高度用JS赋值做修改
* 从`height`修改为`min-height`的[JSbin示例](https://jsbin.com/fobofurabu/1/edit?html,css,js,output)
***

    

