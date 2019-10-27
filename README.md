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
* 但是这样你需要把1——24的占用对应的CSS的width宽度都要计算并写出来。这时候**scss提供了一个简单的循环写法,通过[scss文档](https://www.sass.hk/docs/)找到`@for`.**
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
    <div class="col" :class="[span&&`col-${span}`]">
        <slot></slot>
    </div>
</template>
```
#### 增加offset，这里并不是gutter
* 在col.vue上面使用offset，为了避免offset不存在也就是undefined的前提下我们加上offset&&
```
    <div class="col" :class="[span&&`col-${span}`,offset&&`offset-${offset}`]">
```
* col.vue组件上面的props增加offset，style上面增加offset的样式
```
    <script>
        export default {
            name:'GuluCol',
            props: {
                span: [Number, String],
                //    span:{
                // type:[Number,String]
                // },
                offset:[Number, String]
            }
        }
    </script>
    
    <style lang="scss" scoped>
            $class-prefix: offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
    </style>
```
* 这样只需要offset和span加起来是24份即可。
#### 强制设置两个span之间有gutter
* 如果在col.vue组件上面用margin会使得最左边和最右边有空隙，这是不合适的，**如果使用padding，就会使得文字部分左边和右边会有空隙**，不过可以通过外父组件row.vue增加margin来使得文字部分刚好没有空隙
* col.vue上面
```
        padding:0 10px;
```
* row.vue上面
```
        margin:0 -10px;
```
* 这样**文字部分刚好与边框对齐**。
* 左右像素是10px,而此时中间空隙是20px。这样我们就实现了中间空隙的控制。
* 我们就需要在父组件上面的margin:0 -10px,通过参数修改。row.vue上面传入一个参数props，是gutter。
```
<script>
    export default {
        props:{
            gutter:[Number,String]
        }
    }
</script>
```
* 我们在组件里面使用这个参数gutter。注意这里的style后面是一个对象，对象的[key](https://wangdoc.com/javascript/basic/grammar.html#%E6%A0%87%E8%AF%86%E7%AC%A6)需要满足标识符的要求，也就是不可以使用中划线表示，可以使用驼峰表示。**所以这里的`marginLeft`不能写成`margin-left`**.
```
<template>
    <div class="row" :style="{marginLeft:gutter/2+'px',marginRight:gutter/2+'px'}">
        <slot></slot>
    </div>
</template>
```
* 接下来我们需要把父组件row.vue里面加上gutter的值对应的子组件col.vue里面的padding.
***
* 但是**父组件上面的这个参数gutter怎么传递给子组件呢**？
***
#### 父组件传参数给子组件
1. 比较笨的方法，用户当然也是体验不好的方法就是在子组件上面加一样的gutter
    * 最笨的方法是直接在子组件col上面直接写冒号gutter属性等于多少，然后再子组件col上面也声明一个props对应的gutter属性变量。写上paddingLeft和paddingRight.
    ```
    <template>
        <div class="col" :class="[span&&`col-${span}`,offset&&`offset-${offset}`]"
            :style="{paddingLeft:gutter/2+'px',paddingRight:gutter/2+'px'}">
            <div style="border:1px solid green;height:100px;">
            <slot></slot>
            </div>
        </div>
    </template>
    <script>
        export default {
            name:'GuluCol',
            props: {
                span: [Number, String],
                //    span:{
                // type:[Number,String]
                // },
                offset:[Number, String],
                gutter:[Number,String]
            }
        }
    </script>
    ```
    * 在index.html上面对col标签也谢上gutter的值
    ```
        <g-row :gutter="20">
            <g-col :gutter="20">1</g-col>
            <g-col :gutter="20">2</g-col>
            <g-col :gutter="20">3</g-col>
        </g-row>
    ```
2. 通过父组件row.vue的gutter传参数给子组件col.vue使用，这样只需要传一次就好了，也就是不需要在子组件上面再次传gutter参数。
    * 这里可以通过vue的钩子来实现传参数，比如[created](https://cn.vuejs.org/v2/api/#created),我们通过在row.vue上面使用created,**发现是一个空数组，但是点击之后看到里面是有相应的子Vue组件结构。**
    ```
            created(){
                console.log(this.$children)
            }
    ```
    * 我们可以通过一个控制台例子发现问题
    ```
    var a=[]
    console.log(a)
    打出的是[],但是先不要点开这个[]
    然后输入a.push(1)
    最后再点开这个数组发现里面有一个1
    ```
    * 通过这个例子我们发现当打印的时候数组a里面并没有内容，是个空数组，打印完了之后，我们在push，此时再点开发现里面是由一个1的。这里主要是**时间的问题**。
    * 但是我们用另外一个[mounted](https://cn.vuejs.org/v2/api/#mounted)钩子**发现是由内容的数组。**
    ```
            mounted(){
                console.log(this.$children)
            }
    ```
    * 那么mounted和created这两个钩子区别是什么？通过原生的JS代码来解释
    ```
    var div=document.createElement('div')//这个状态就是created，只是在内存里面生成，并没有放到页面里面
    document.body.appendChild(div)//这个就叫做mounted，也就是把这个生成的对象挂到页面里面去
    ```
    * 所以对于组件来说，created的就是创建一个组件，但是并没有放到页面里面。而mounted是把它放到页面里面的那一瞬间。
    * 那如果父组件上面还有子组件，那么创建并放入到页面中的顺序应该是怎么样？
        ```
        var div=document.createElement('div')//father created
        var childDiv=document.createElement('div')//child created
        //其中father和child的created 的顺序其实无所谓。其实也不重要，那么vue选择了哪个顺序呢？
        div.appendChild(childDiv)//child mounted
        document.body.appendChild(div)//father mounted
        ```
    * vue选择了先创建父组件还是子组件呢？并且使谁先挂载到页面里面呢。我们通过在父组件row.vue和子组件col.vue里面都使用created和mounted就可以测试了
    * 在父组件row.vue里面
        ```
            created(){
                console.log('row created')
            },
            mounted(){
                console.log('row mounted')
            }
        ```
    * 在子组件col.vue里面
        ```
            created(){
                console.log('col created')
            },
            mounted(){
                console.log('col mounted')
            }
        ```
    * 我们在控制台上面打印出来可以看到顺序是
        1. 首先是父组件row created
        2. 然后是三个子组件 col created
        3. 接着三个子组件 col mounted
        4. 最后是父组件 row mounted
        ```
        row created//首先是父组件row created
        3col.vue:21 col created//然后是三个子组件 col created
        3col.vue:24 col mounted//接着三个子组件 col mounted
        row.vue:17 row mounted//最后是父组件 row mounted
        ```
    * 我们知道了这个创建和挂在到页面的顺序有什么用，**我们看到最后一个是父组件row mounted，那么我们只需要通过父组件的mounted钩子就可以知道所有子子孙孙的组件都已经挂在到了页面中了。就可以获取到它们。**我们在父组件上面通过forEach循环把获取的gutter传递给子组件的gutter
        ```
                mounted(){
                    this.$children.forEach((x)=>{
                        x.gutter=this.gutter
                    })
        ```
    
    * 但是此时需要用到vue的[data](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0)属性.在col.vue里面默认给的是0.**这里如果用props而不用data会报错**
        ```
                data(){
                    return {
                        gutter:0
                    }
                }
        ```
        * 在col.vue的template里面加上它的style
        ```
                :style="{paddingLeft:gutter/2+'px',paddingRight:gutter/2+'px'}">
        ```
    * 这样我们在index.html的**子组件col上就不需要写gutter属性了**
    ```
        <g-row :gutter="20">
            <g-col >1</g-col>
            <g-col >2</g-col>
            <g-col >3</g-col>
        </g-row>
    ```
* 最后老师的**视频显示有个1像素的偏移边框问题没有对齐**，可能是四舍五入的问题导致的。
#### 小结
***
1. 首先在父组件row.vue上面接受一个props——gutter.这个gutter的值由index.html外面的标签传入进来
2. 然后在子组件col.vue上面使用**data定义**的gutter属性。这个gutter最后是通过父组件传进来。
3. 在父组件上面用钩子mounted里面forEach循环给this.$children传入这个gutter.
    ```
        mounted(){
            this.$children.forEach((x)=>{
                x.gutter=this.gutter
            })
    ```
4. 最后在父组件上面写上margin，子组件上面写上padding就完成了。
***
### 重构（提取变量法）与重写
* 重构就是通过**微小的调整**使代码变的更好。重构基本上每天都会去做
* 重写就是**巨大的调整代码**。隔了一段时间再去写的很多都是重新，因为很多东西都忘记了或者积累的问题太多了。
* 什么情况下需要重构与重写。
    1. 重复两次及以上的代码，重复的代码可能出现你改了第一个地方，忘记改第二个地方就会产生bug。可以通过一个函数把代码包围起来，下次使用只要调用这个函数即可，这只是其中一种方法。
    2. 一眼看，看不懂的代码。比如我们写在col.vue的style上面的代码，如果这个style有更多的CSS属性久会特别的长。**我们可以加一个中间变量(这里就用colStyle这个变量)即可，它其实就是一个对象，可以把这个对象放到computed里面去,这里不可以放到data里面，因为放到data里面只会在一开始的读取，再次变化就不会去读取了**。
        ```
    <div class="col" :class="[span&&`col-${span}`,offset&&`offset-${offset}`]"
        :style="{paddingLeft:gutter/2+'px',paddingRight:gutter/2+'px'}">

        ```
* 如果一个属性是根据另外一个属性变化的就用[computed](https://cn.vuejs.org/v2/api/#computed)，我们可以通过打印出父组件row.vue的代码
```
<script>
    export default {
        name:'GuluRow',
        props:{
            gutter:[Number,String]
        },
        created(){
            console.log('row created')
        },
        mounted(){
            this.$children.forEach((x)=>{
                x.gutter=this.gutter
                console.log('row mounted，此时循环把gutter传递给子组件col'+x.gutter)
            })
        }
    }
</script>
```
* 同时也打印出子组件col.vue的对应的代码
```
<script>
    export default {
        name:'GuluCol',
        props: {
            span: [Number, String],
            //    span:{
            // type:[Number,String]
            // },
            offset:[Number, String],
        },
        created(){
            console.log('col created')
        },
        mounted(){
            console.log('col mounted')
        },
        data(){
            console.log(`因为gutter在data里面变成了${this.gutter}，所以我也要变化`)
            return {
                gutter:0
            }
        },
        computed:{
            colStyle(){
                console.log(`因为gutter在computed里面变成了${this.gutter}，所以我也要变化`)
                return {
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }
        }
    }
</script>
```
* 发现变化的情况是(省略了一些重复的)
```
row created
col.vue:26 因为gutter在data里面变成了undefined，所以我也要变化
col.vue:20 col created
col.vue:33 因为gutter在computed里面变成了0，所以我也要变化
3col.vue:23 col mounted
3row.vue:19 row mounted，此时循环把gutter传递给子组件col20
19col.vue:33 在子组件col里面，因为gutter在computed里面变成了20，所以我也要变化
```
* 可以看到步骤如下：
    1. data里面是在子组件row.vue的created之后会有一个undefined（因为此时还没有产生col）.
    2. col.vue在**created之后会有一个0**(因为在产生col.vue之后，里面data里面的gutter默认就是0).
    3. 接着就是col mounted。
    4. 接着row mounted，此时再父组件row里面通过循环把gutter传递给子组件col为20
    5. 所以最后在子组件col里面，因为gutter在**computed里面变成了20，所以我也要变化**
* 所以**data**的数据只有在created创建的时候就诞生，并且**不会变化**。而**computed**是在mounted之后**如果有变化会更新**。
* 另外一个class我们用colClass这个变量来代替
```
<template>
    <div class="col" :class="colClass"
        :style="colStyle">
        <slot></slot>
    </div>
```
* 我们同样用computed来return这个函数,在css里面的可以不用加this，因为Vue会帮你默认增加，**但是在script里面的是需要增加this的，不然会报错**。
```
        computed:{
            colClass(){
                let {span,offset}=this
                return[
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`
                ]
            }
        }
```
* row.vue里面代码也一样重构一下,首先CSS标签你的style对应用一个rowStyle变量代替
```
    <div class="row" :style="rowStyle">
```
* 然后用一个computed来返回这个rowStyle对应的函数
```
        computed:{
            rowStyle(){
                let {gutter}=this
                return{
                    marginLeft:-gutter/2+'px',
                    marginRight:-gutter/2+'px'
                }
            }
        }
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

