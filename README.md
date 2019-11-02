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



