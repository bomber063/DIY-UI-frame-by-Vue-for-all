## 默认布局
### 我们先看需求，可以参考已有的框架
* 第一个参考是[ant.design的布局Layout](https://ant.design/components/layout-cn/)
    1. 上-Header,中-Content,下-Footer
    ```
    <g-layout>
        <g-header></g-header>
        <g-content></g-content>
        <g-footer></g-footer>
    </g-layout>
    ```
    2. 上-Header,中(左边窄Sider,右边宽Content),下-Footer
    ```
        <g-layout>
            <g-header></g-header>
            <g-layout>
                <g-sider></g-sider>
                <g-content></g-content>
            </g-layout>
            <g-footer></g-footer>
        </g-layout>
    ```
    3. 上-Header,中(左边宽Content,右边窄Sider,),下-Footer
    ```
            <g-layout>
                <g-header></g-header>
                <g-layout>
                    <g-content></g-content>
                    <g-sider></g-sider>
                </g-layout>
                <g-footer></g-footer>
            </g-layout>
    ```
    4. 左-Sider,右(上-Header,中-Content,下-Footer)
    ```
            <g-layout>
                <g-sider></g-sider>
                <g-layout>
                    <g-header></g-header>
                    <g-content></g-content>
                    <g-footer></g-footer>
                </g-layout>
            </g-layout>
    ```
* 第二参考是[element的布局容器container](https://element.eleme.cn/#/zh-CN/component/container),它跟ant.design是一样的，不过它重复用的是container
### 知道需求我们开始写代码
* 首先我们创建content，footer,layout,sider组件。
* 建议高度让用户自己写,比如写到index.html上
* 在content组件上面加上[flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow),CSS flex-grow 属性定义弹性盒子项（flex item）的拉伸因子,它的[默认值为 0](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex),设置为1就比0大，那么就会撑满高度。
```
    .content{
        flex-grow:1;
    }
```
* 于是前面最简单的第一种布局(上-Header,中-Content,下-Footer)就是
```
<div id="app">
    <g-layout style="height:100vh">
        <g-header class="demo">header</g-header>
        <g-content class="demo">content</g-content>
        <g-footer class="demo">footer</g-footer>
    </g-layout>
</div>
```
* 接下来第二种布局(上-Header,中(左边窄Sider,右边宽Content),下-Footer),**我们通过参考ant.design发现只要有sider，那么就增加一个class，使得纵向排列变成横向排列。**
* 之前有介绍过[name](https://cn.vuejs.org/v2/api/#name)可以用来Vue的调试命名，现在还可以通过vm.options.name的方式找到这个自定义组件name变量对应的值。
```
<script>
    export default {
        name:'GuluLayout',
        data(){
            return {
                layoutClass:{
                    hasSider:false
                }
            }
        },
        mounted() {
                this.$children.forEach((vm)=>{//如果子组件里面有一个组件的名字（$options.name）是GuluSider,就改变class的布尔
                    if(vm.$options.name==='GuluSider'){
                        this.layoutClass.hasSider=true
                    }
                })
        }
    }
</script>
```
* 在template和style里面增加class
```
<template>
    <div class="layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .layout{
        border:1px solid pink;
        flex-direction: column;
        display: flex;
        &.hasSider{
            flex-direction: row;
        }
    }
</style>
```
* index.html上面
```
<div id="app">
    <g-layout style="height:100vh">
        <g-header class="demo">header</g-header>
        <g-layout>
            <g-sider class="demo">sider</g-sider>
            <g-content class="demo">content</g-content>
        </g-layout>
        <g-footer class="demo">footer</g-footer>
    </g-layout>
</div>
```
* 然后第三种布局(上-Header,中(左边宽Content,右边窄Sider,),下-Footer)就是sider和Content反过来就好了。
```
<div id="app">
    <g-layout style="height:100vh">
        <g-header class="demo">header</g-header>
        <g-layout>
            <g-content class="demo">content</g-content>
            <g-sider class="demo">sider</g-sider>
        </g-layout>
        <g-footer class="demo">footer</g-footer>
    </g-layout>
</div>
```
* 第四种布局(左-Sider,右(上-Header,中-Content,下-Footer))，把Sider放到外面去。
```
<div id="app">
    <g-layout style="height:100vh">
        <g-sider class="demo">sider</g-sider>
        <g-layout>
            <g-header class="demo">header</g-header>
            <g-content class="demo">content</g-content>
            <g-footer class="demo">footer</g-footer>
        </g-layout>
    </g-layout>
</div>
```
### 调宽度
* 第4种布局你还需要设置宽度，因为默认的flex-grow是0，只要设置为1即可填满宽度
```
<style lang="scss" scoped>
    .layout{
        flex-grow:1;
        border:1px solid pink;
        flex-direction: column;
        display: flex;
        &.hasSider{
            flex-direction: row;
        }
    }
</style>
```
* 第1,2,3种布局也可以通过flex-grow来调节宽度。
### 稍微增加颜色深度样式和关闭的交互操作
* 我们增加的CSS样式
```
    .sider{
        background: #333;
        width: 200px;
    }
    .header{
        background:#999;
        height: 100px;
    }
    .footer{
        background: #ccc;
        height:50px;
    }
```
* 增加[v-if](https://cn.vuejs.org/v2/guide/conditional.html#v-if)，v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。在点击事件触发的时候，这个true变成false就会不渲染，那么就隐藏了。sider组件里面的内容。
```
<template>
    <div class="sider" v-if="visible">
        <slot></slot>
        <button @click="visible=false">close</button>
    </div>
</template>

<script>
    export default {
        name:'GuluSider',
        data(){
            return{
                visible:true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sider{
        position: relative;
        button{
            position: absolute;
            top:0;
            right:0;
        }
    }
</style>
```
### 增加动画
* 用到[transition](https://cn.vuejs.org/v2/api/#transition)
* 在sider组件上用transition把要动画的元素包起来。
```
<template>
    <transition name="fade">
        <div class="sider" v-if="visible">
            <slot></slot>
            <button @click="visible=false">close</button>
        </div>
    </transition>
</template>
```
* 在sider组件上,增加动画的CSS
```
<style lang="scss" scoped>
    .sider {
        position: relative;

        button {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to {
        /*这个200px就是sider的宽度,但是作为用户可能并知道这个像素是多少，就需要通过JS来操作，目前暂时不用它，后续用到再说*/
        margin-left: -200px;
    }
</style>
```
* 因为这个这个200px就是sider的宽度,但是作为用户可能并知道这个像素是多少，最好要告诉用户在index.html上面加上样式,使得sider的宽度等于这个过度的动画变化宽度即可.
```
<style>
    .sider{
        background: #333;
        width: 300px;
    }
    .sider.fade-enter, .sider.fade-leave-to {
        /*这个200px就是sider的宽度,但是作为用户可能并知道这个像素是多少，就需要通过JS来操作，目前暂时不用它，后续用到再说*/
        margin-left: -300px;
    }
</style>
```
* 作为用户可能并知道这个像素是多少，就需要通过[JavaScript-钩子](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90)来操作，目前暂时不用它，后续用到再说
#### 动画小结
1. 首先在要动的元素上面加上transition标签
2. 在transition写上面属性name，用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v",这个name的名字可以随便取，最好是取名跟动画样子差不多，让人比较好理解
3. 增加动画样式名字,比如你用的name是slide，那么动画样式名字
    * 这两个样式代表进出的时候动画的时长
    ```
        .slide-enter-active, .slide-leave-active {
            transition: all .5s;
        }

    ```
    * 这个样式代表你开始和结束的时候的CSS某个属性的状态
    ```
        .slide-enter, .slide-leave-to {
            /*这个200px就是sider的宽度,但是作为用户可能并知道这个像素是多少，就需要通过JS来操作，目前暂时不用它，后续用到再说*/
            margin-left: -200px;
        }
    ```
4. 用户对这个-200px宽度不满意，还可以在index.html上修改为别的值，比如-400px
```
<style>
    .sider{
        background: #333;
        width: 400px;
    }
    .sider.slide-enter, .sider.slide-leave-to {
        margin-left: -400px;
    }
</style>
```
### 下一节用toast和Tab
* 可以参考[framework7](http://www.framework7.cn/docs/toast.html)的toast。toast是烤面包，这个功能就点击一下会弹出一个东西，就很像烤面包机。
* Tab可以参考[ant.design的Tabs](https://ant.design/components/tabs-cn/)和[element的Tabs](https://element.eleme.cn/2.0/#/zh-CN/component/tabs)



