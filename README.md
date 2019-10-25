## 网格系统(grid)
* [知乎问答](https://www.zhihu.com/question/19602912)
* 就是把一个 div 分成 N 个部分（N = 12,16,24...），每个部分无空隙或者有空隙。 
* 它是**web设计师**的一种方法论。
* 我们可以看淘宝网站可以看到大致分为横向和纵向布局。也就是左中右，上中下。
* 按照是否有空隙分为：
    1. 有gutter。
    2. 无gutter
* [gutter](http://www.iciba.com/gutter)英文的意思是天沟。
### 写代码前的准备
* 我们主要的标签前面最好都加一个g-，例如横向`<g-row>`，纵向（英文全称是column）`<g-col>`，因为Vue官方文档建议自定义标签最好是x-开头。x也可以随便，也就是一个东西中划线一个东西。同时也避免万一HTML6出来了，自带一个row标签就有可能冲突。
* 我们默认整体的宽度是24.也可以叫做span（跨度）24.gutter一般是像素，例如12px,一般gutter写到g-row上面，span写到g-col上面。就可以简单写成下面的代码
```
<g-row gutter="12">
    <g-col span="10"></g-col>
    <g-col span="14"></g-col>

</g-row>
```
### 用Vue钩子实现基本功能
#### 不用组件写，也就是在index.html中用style等各种标签写
* Vue没有说明的问题，由于app.js初始化了这个app,也就是
```
new Vue({
    el: '#app'
})
```
* 然后再index.html中使用id是app的div里面**不可以使用style标签,也不可以在初始化的template里面使用style标签，你加了，Vue会把它删除掉**
```
<div id="app">

</div>
```
* 平均分配宽度只需要使用flex即可
```
<style>
    .row{
        display: flex;
    }
    .col{
        border:1px solid red;
        height:100px;
        background:grey;
        width:50%;
    }
</style>
<div id="app">
    <div class="row">
        <div class="col"></div>
        <div class="col"></div>
    </div>
</div>
```
* 用data-span的HTML属性来占比分配,小数点后一般保留6位，2就是占用2/24，12就是占用22/24。
```
<style>
    .row{
        display: flex;
    }
    .col{
        border:1px solid red;
        height:100px;
        background:grey;
        width:50%;
    }
    .col[data-span="2"]{
        width:8.3333%;
    }
    .col[data-span="2"]{
        width:91.6667%;
    }
</style>
<div id="app">
    <div class="row">
        <div class="col" data-span="2"></div>
        <div class="col" data-span="22"></div>
    </div>
</div>
```
* 但是这样你需要把1——24的占用对应的CSS的width宽度都要计算并写出来。这时候**scss提供了一个简单的循环写法**,通过**[scss文档](https://www.sass.hk/docs/)找到`@for`**
* @for 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：@for $var from <start> through <end>，或者 @for $var from <start> to <end>，区别在于 through 与 to 的含义：当使用 through 时，条件范围包含 <start> 与 <end> 的值，而使用 to 时条件范围只包含 <start> 的值不包含 <end> 的值。另外，$var 可以是任何变量，比如 $i；<start> 和 <end> 必须是整数值。
* 还需要用到[插值语句 #{}](https://www.sass.hk/docs/)和[变量 $](https://www.sass.hk/docs/)。例如
```
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```
* 编译为
```
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```
#### CSS的flex换行与不换行
* CSS[flex-wrap ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap)指定 flex 元素单行显示还是多行显示 。如果允许换行，这个属性允许你控制行的堆叠方向。
* 如果你的display是flex，**默认情况下你是不换行的**，也就是默认的flex-wrap是
```
    .row{
        display: flex;
        flex-wrap: nowrap;
    }
```
* 此时就算你**写了宽度是50%，并且有是三个col，如果超过宽度也是不会换行的**。
* 这里老师释释放了下dat快捷键在 webStorm上面删除style标签，我这里不知道怎么使用。
* 如果在row上面改成wrap就会换行了
```
    .row{
        display: flex;
        flex-wrap: wrap;
    }
```
* 如果在col上面用[flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)，flex-shrink属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。它就不会收缩，会超过你设置的页面，跑到外面去。
```
<style lang="scss" scoped>
    .col {
        border: 1px solid red;
        height: 100px;
        background: grey;
        width: 50%;
        flex-shrink:0;
        }
```
#### 用Vue组件写
* 在scss里面不需要写data这种前缀，因为可以用scoped
* 生成一个col.vue文件，里面style标签是
```
<style lang="scss" scoped>
    .col {
        border: 1px solid red;
        height: 100px;
        background: grey;
        width: 50%;
        /*下面的就是*/
        /*.col.col-1*/
        /*.col.col-2等等一直到24*/
        $class-prefix: col-;

        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: $n / 24*100%;
            }
        }
    }

</style>
```
* 生成一个row.vue文件，里面style标签
```
<style lang="scss" scoped>
    .row{
        display: flex;
    }
</style>
```
* 然后再app.js里面引入col.vue和row.vue这两个组件。
* 通过开发者工具看到
```
.col.col-1[data-v-d44b62] {
  width: 4.1666666667%;
}
.col.col-2[data-v-d44b62] {
  width: 8.3333333333%;
}
.col.col-3[data-v-d44b62] {
  width: 12.5%;
}
.col.col-4[data-v-d44b62] {
  width: 16.6666666667%;
}
...后面还有到24
```
* 目前通过组件我们做到了平局分配宽度，如果需要自己控制宽度，需要加一个属性，接受一个叫做span的props就好了。
* 这里的[props](https://cn.vuejs.org/v2/api/#props)有两种写法，一种是数组形式，一种是对象形式（对象形式可以写更多参数）,我们可以在col.vue里面写成**数组形式**,它既可以接受数字也可以接受字符串
```
<script>
    export default {
        name:'GuluCol',
        props: {
             span: [Number, String]
        }
    }
</script>
```
* 写成**对象形式**
```
<script>
    export default {
        name:'GuluCol',
        props: {
               span:{
             type:[Number,String]
            }
        }
    }
</script>
```
* 我们在index.html里面使用下面的方法都可以，因为**既可以接受字符串也可以接受数字**。你可以用下面的方法，你还可以用[toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)把数字转换成字符串。
```
    <g-row>
        <g-col span="2">1</g-col>//这里的span是字符串2，因为前面没有冒号
        <g-col :span="'20'">2</g-col>//这里的span也是字符串2,虽然前面有冒号，但是后面的双引号里面有单引号，外面的双引号是html的引号，里面的单引号是JS语法的单引号
        <g-col :span="2">3</g-col>//这里有冒号并且双引号里面没有单引号，说明2是数字2.
    </g-row>
```
* 然后col.vue组件上面[绑定这个class](https://cn.vuejs.org/v2/guide/class-and-style.html#ad)就好了，绑定class有两种方式，一种是数组形式，另一种是对象形式，我们这里就用数组形式
```
<template>
    <div class="col" :class="[`col-${span}`]">
        <slot></slot>
    </div>
</template>
```

### 其他网格系统参考
* [ant.design](https://ant.design/docs/react/introduce-cn)
* [ant,design的grid](https://ant.design/components/grid-cn/)
* [element](https://element.eleme.cn/#/zh-CN)
* [element-layout布局](https://element.eleme.cn/#/zh-CN/component/layout)
### 用git 创建分支
* 使用命令创建分支
```
git branch 后面加分支的名字(例如git branch button-and-input)
```
* 使用命令推送本地分支名字到远程分支名字,前面的button-and-input是本地的分支名字，冒号后面的是远程仓库的分支名字button-and-input
```
git push origin button-and-input:button-and-input
```
* 切换到另一个分支
```
git checkout button-and-input
```

