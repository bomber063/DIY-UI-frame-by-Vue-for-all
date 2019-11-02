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
    * 我们知道了这个创建和挂在到页面的顺序有什么用，**我们看到最后一个是父组件row mounted，那么我们只需要通过父组件的mounted钩子就可以知道所有子子孙孙的组件都已经挂在到了页面中了。就可以获取到它们**。我们在父组件上面通过forEach循环把获取的gutter传递给子组件的gutter
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
### 根据淘宝网站手动测试
* 我们手动测试增加在index.html上的代码
```
    <g-row class="topBar">
        <g-col class="demoBox" span="9">
            <g-row align="left">
                <g-col style="width:50px;">1</g-col>
                <g-col>2</g-col>
                <g-col>3</g-col>
                <g-col>4</g-col>
            </g-row>
        </g-col>
        <g-col class="demoBox" span="15">
            <g-row align="left">
                <g-col>1</g-col>
                <g-col>2</g-col>
                <g-col>3</g-col>
                <g-col>4</g-col>
                <g-col>5</g-col>
                <g-col>6</g-col>
                <g-col>7</g-col>
            </g-row>
        </g-col>
    </g-row>
    <g-row class="logo-and-search-and-qrcode">
        <g-col class="demoBox" span="4"></g-col>
        <g-col class="demoBox" span="14"></g-col>
        <g-col class="demoBox" span="6"></g-col>
    </g-row>
```
* 这里需要给父组件row.vue增加一个靠左或者靠右的的CSS属性
```
    <div class="row" :style="rowStyle" :class="rowClass">
```
* props中,这里用到验证[validator: Function](https://cn.vuejs.org/v2/api/#props)，自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出,还用到[includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)或者[indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
* indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
* includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
```
            align:{
                type:String,
                validator(value){
                    return['left','right','center'].includes(value)//下面的也是一样的效果。
                    // return['left','right','center'].indexOf(value)!==-1
                }
```
* CSS的class加上[justify-content属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)
```
<style lang="scss" scoped>
    .row{
        display: flex;
        &.align-right{
            justify-content: flex-end;
        }
        &.align-left{
            justify-content: flex-start;
        }
        &.align-center{
            justify-content: center;
        }
    }
</style>
```
* 因为我们之前在子组件col.vue里面写了默认宽度50%，所以这里的justify-content属性是不生效的，需要注释或者删除掉这个默认宽度50%。
```
    .col {
        /*width: 50%;*/
}
```
* 然后我们从淘宝网站截图背景图片过来
```
    <g-row class="logo-and-search-and-qrcode">
        <g-col class="demoBox" span="4"><img src="http://img.alicdn.com/tps/TB1YZkPLpXXXXbzXXXXXXXXXXXX-213-57.png" alt=""></g-col>
        <g-col class="demoBox" span="14"></g-col>
        <g-col class="demoBox" span="6"></g-col>
    </g-row>
```
* 通过img的最大宽度和padding解决居中和布局问题。这里用`align="center"`，如果不想这么麻烦，也可以自己在log-wrapper这个class上写样式，而不用g-row和g-col
```
    <g-row class="logo-and-search-and-qrcode">
        <g-col class="demoBox" span="6">
            <g-row align="center">
                <g-col>
                    <div class="logo-wrapper">
<!--                        这里把logo-wrapper不放到go-col上面，而放到div上面，因为有可能go-col会有重复的class，因为g-col是有它自己的样式的-->
                        <img class="logo" src="http://img.alicdn.com/tps/TB1YZkPLpXXXXbzXXXXXXXXXXXX-213-57.png" alt="">
                    </div>
                </g-col>
            </g-row>
        </g-col>
        <g-col class="demoBox" span="12"></g-col>
        <g-col class="demoBox" span="6"></g-col>
    </g-row>
```
* 在index.html写上它的样式，这里用最大宽度。
```
<style>
    .demoBox{
        border:1px solid red;
        min-height:50px;
        background: grey;
    }
    img{
        max-width: 100%;
    }
    .logo-wrapper{
        padding:10px;
    }
</style>
```
### 灵活与限制
* 灵活是设计师想要的需求，而限制是工程师想要的需求，我们这个grid模式就是限制的模式。
* 工程师对于布局通过**几个固定的数字**就可以完成肯定是非常乐意的，因为很快就可以完成了。而设计师就想怎么设计就怎么设计，**数字千奇百怪**。
* 设计师奇怪的布局会使的工程师很难去实现，这样工程师的工作量会多很多，所以这就是设计师和工程师之间的权衡。
* 如果是做后台管理用grid肯定没问题，因为后台管理是给内部人员用的，好不好看无所谓。
* 如果你是做一个新的产品，比如漂亮的活动页。这就不需要用grid了，因为页面不好看，可能吸引不到客户。
### 实现响应式
* 响应式简单的说就是通过不同的设备宽度而现实不同的样式。也可以说当页面宽度变化的时候，页面的比例也跟着响应的变化。
* 很简单的布局就是如果在**pc上面**可能是**左右结构**，但是在**Phone手机**上面就变成了**上下结构**。
* 如果要添加行为，用CSS是做不到的。那就要单独写JS代码。
* 我们通过[ant.design的响应式](https://ant.design/components/grid-cn/#components-grid-demo-responsive)看到它参考的 Bootstrap 的 响应式设计。
#### UI库的历史
* 最开始的UI库是[yui](https://yuilibrary.com/)，它是基于yui的。它跟JQ是齐平的一个库，但是现在很少有人用了。
* 第一次UI组件库被打响是因为[Bootstrap](https://www.bootcss.com/)这个UI，它的中文名字翻译过来是启动的意思。它就做到了一个响应式。后面出来的基本上都是抄袭Bootstrap的理念的。包括ant.design，element，[material](https://www.material.io)的响应式.但是现在Bootstrap用的不多了，因为它是基于JQuery的。
### 开始写代码
* 为了减少代码，我们用一个phone变量来储存一个对象，对象里面包括了手机上对应的span和offset,比如
```
<g-col span=4 offset=1 :phone="{span:12,offset:2}">
```
* 增加一个phone的验证器,用到[Object.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)和[includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
* includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
* Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。如果对象的键-值都不可枚举，那么将返回由键组成的数组。
```
        props: {
            span: [Number, String],
            //    span:{
            // type:[Number,String]
            // },
            offset:[Number, String],
            phone:{
                type:Object,
                validator(value){
                    console.log(value)
                    let keys=Object.keys(value)//把对象value的key组成数组返回，并赋值给keys
                    console.log(keys)
                    let valid=true
                    console.log("循环外面"+['span','offset'].includes(keys[0]))
                    keys.forEach((value)=>{
                        if(!['span','offset'].includes(value)){//如果value是在数组['span','offset']里面的值就返回true
                            valid=false
                            console.log('循环里面'+valid)

                        }
                    })
                    return valid
                }
            },
        },
```
* 我们需要把phone的class加到computed的colClass里面去
```
        computed:{
            colClass(){
                let {span,offset,phone}=this//这里增加phone
                let phoneClass=[]
                if(phone){//如果有phone就把phone里面的span和offset放到phoneClass里面去
                    phoneClass=[`col-phone-${phone.span}`,`col-phone-${phone.offset}`]
                }
                return[
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`,
                    ...phoneClass//这里不用前面三点也可以，可能是也支持数组的形式吧。三点是把一个数组以拆开个体的形式放入到另外一个数组里面
                ]
            },
            colStyle(){
                // console.log(`在子组件col里面，因为gutter在computed里面变成了${this.gutter}，所以我也要变化`)
                return {
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }
        }
```
* 老师后面把代码省略为下面的，但是这个代码是有问题的，如果phone是undefined，那么就不会执行了，就会报错。
```
        computed:{
            colClass(){
                let {span,offset,phone}=this//这里增加phone
                
                return[
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`,
                    ... (phone && [`col-phone-${phone.span}`,`offset-phone-${phone.offset}`])//这里简写成这样，不要前面三点就不报错，有前面三点就报错，代表如果有phone,就返回&&后面的值
                ]//如果有phone就把phone里面的span和offset放到phoneClass里面去
            },
            colStyle(){
                // console.log(`在子组件col里面，因为gutter在computed里面变成了${this.gutter}，所以我也要变化`)
                return {
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }
        }
```
* 因为三点运算符是针对数组的，那么通过三元运算我们把不存在的时候加上一个空数组就可以不报错了
```
        computed:{
            colClass(){
                let {span,offset,phone}=this//这里增加phone

                return[
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`,
                    ... ( phone  ? [`col-phone-${phone.span}`,`offset-phone-${phone.offset}`]:[])//因为三点与运算符是针对数组的，那么后面就需要加上一个空数组。
                ]//如果有phone就把phone里面的span和offset放到phoneClass里面去
            },
            colStyle(){
                // console.log(`在子组件col里面，因为gutter在computed里面变成了${this.gutter}，所以我也要变化`)
                return {
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }
        }
```
* 各个设备的宽度的大小划分可以参考[element](https://ant.design/components/grid-cn/#components-grid-demo-responsive-more)
```
xs	<576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-	
sm	≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-	
md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-	
lg	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-	
xl	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-	
xxl	≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object
```
* 所以我们加上小于576px的CSS样式
```
        /*这个media查询是写在最下面，那么同样生效的同样的属性，上面的会被下面的覆盖掉，下面的样式优先级更高*/
        @media (max-width: 576px){
            $class-prefix: col-phone-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-phone-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
```
* 在把各个宽度的CSS样式都加上
```
        @media (min-width: 577px) and (max-width: 768px){
            $class-prefix: col-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 769px) and (max-width: 992px){
            $class-prefix: col-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 993px) and (max-width: 1200px){
            $class-prefix: col-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 1201px){
            $class-prefix: col-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
```
* 然后加上各个属性的自定义声明参数，因为有重复的代码，所以用一个函数 validator来代替，另外因为函数名字和自义定变量是相同名字，所以可以省略掉一些语法。
```
    let validator = (value) => {
        let keys = Object.keys(value)//把对象value的key组成数组返回，并赋值给keys
        let valid = true
        keys.forEach((value) => {
            if (!['span', 'offset'].includes(value)) {//如果value是在数组['span','offset']里面的值就返回true
                valid = false

            }
        });
        return valid
    };
    export default {
        name:'GuluCol',
        props: {
            span: [Number, String],
            //    span:{
            // type:[Number,String]
            // },
            offset:[Number, String],
            phone:{
                type:Object,
                validator//这里的意思就是validator:validator，如果key和value一样就可以简写为validator
            },
            ipad:{
                type:Object,
                validator
            },
            narrowPc:{
                type:Object,
                validator
            },
            pc:{
                type:Object,
                validator
            },
            widePc:{
                type:Object,
                validator
            },
        },
    }
```
* computed里面的代码
```
        computed:{
            colClass(){
                let {span,offset,phone,ipad,narrowPc,pc,widePc}=this//这里增加phone

                return[
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`,
                    ... ( phone  ? [`col-phone-${phone.span}`,`offset-phone-${phone.offset}`]:[]),//因为三点与运算符是针对数组的，那么后面就需要加上一个空数组。
                    ... ( ipad ? [`col-ipad-${ipad.span}`,`offset-ipad-${ipad.offset}`]:[]),
                    ... ( narrowPc ? [`col-narrowPc-${narrowPc.span}`,`offset-narrowPc-${narrowPc.offset}`]:[]),
                    ... ( pc ? [`col-pc-${pc.span}`,`offset-pc-${pc.offset}`]:[]),
                    ... ( widePc ? [`col-widePc-${widePc.span}`,`offset-widePc-${widePc.offset}`]:[])
                ]//如果有phone就把phone里面的span和offset放到phoneClass里面去
            },
```
* 在index.html上面就可以给各种样式传参了
```
    <g-row :gutter="20">
        <g-col span="2"
               :phone="{span:12}"
               :ipad="{span:8}"
               :narrow-pc="{span:4}"
               :pc="{span:2}"
               :wide-pc="{span:1}"
        >1</g-col>
        <g-col span="20" :offset="2"
               :phone="{span:12,offset:0}"
               :ipad="{span:16}"
               :narrow-pc="{span:20}"
               :pc="{span:22}"
               :wide-pc="{span:23}"
        >2</g-col>
    </g-row>
```
* 如果需要上下结构，可以都设置为span：24,但是需要把row.vue里面增加`flex-wrap:wrap`,**因为默认是不换行的(nowrap)**.
### 解决bug
#### 默认设置为phone的样式
* 目前如果五种都写了，那么默认的span就没有意义了，所以要选择一种作为默认的span。
* 如果这个UI定位是手机的UI框架，那么就把手机作为默认的样式，**可以把phone的内容删除了，把它作为默认的即可**。这里我发现之前`@media`代码写的一个错误就是`col-wide-pc-;`写成了`col-width-pc-`
* 然后index.html上面代码就可以省去phone
```
    <g-row :gutter="20">
        <g-col span="24"
               :ipad="{span:8}"
               :narrow-pc="{span:4}"
               :pc="{span:2}"
               :wide-pc="{span:1}"
        >1</g-col>
        <g-col span="24"
               :ipad="{span:16}"
               :narrow-pc="{span:20}"
               :pc="{span:22}"
               :wide-pc="{span:23}"
        >2</g-col>
```
* 这里在电脑上用开发者工具调试窗口的时候显示的尺寸大小是浏览器尺寸，需要点击手机(toggle device toolbar)，然后通过**responsive的尺寸显示查看**
#### 如果pc,narrowPc,widePc等等其中有一项没有写
* 如果有某项没有写，那么就根据默认样式显示，这个就由自己决定，需要权衡：
    1. 如果你面向手机的，那么你默认样式可以是phone，没有写的地方那就是phone的样式。如果你面向其他的，默认样式那就是其他样式。这是一个需求问题。
    2. 另一种可以就近选择，不过这个不太好控制，因为多近才算近呢？并不知道离开哪个更近，比较麻烦。
* 如何让响应式变得更加智能，就是**不要把限值写的太绝对，比如有一遍是一个开放的，并且把范围越大的放到越前面**。这样他就会尽量往下面（像素小的）靠。
```
        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: $n / 24*100%;
            }
        }
        $class-prefix: offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                margin-left: $n / 24*100%;
            }
        }
        /*这个media查询是写在最下面，那么同样生效的同样的属性，上面的会被下面的覆盖掉，下面的样式优先级更高*/
        @media (min-width: 577px){
            $class-prefix: col-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 769px){
            $class-prefix: col-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 993px){
            $class-prefix: col-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 1201px){
            $class-prefix: col-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
```
* 我们可以在index.html测试下
```
<style>
    .demo{
        background: grey;
        height:100px;
        border:1px solid red;
    }
</style>
    <g-row>
        <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
            <div class="demo"></div>
        </g-col>
        <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
            <div class="demo"></div>
        </g-col>
        <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
            <div class="demo"></div>
        </g-col>
        <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
            <div class="demo"></div>
        </g-col>
        <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
            <div class="demo"></div>
        </g-col>
        <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
            <div class="demo"></div>
        </g-col>
    </g-row>
```
* 这也叫做mobile first。也就是移动端优先。也就是默认的就是移动端走，因为现在市场就是移动端的占大多数。
### 继续重构优化重复的代码
* 在col.vue里面用一个methods里面放一个函数
```
        methods:{
                createClasses(obj,str=''){//这里的str=''是默认空字符串，也就是如果不传str就默认是''
                    return obj ? [`col-${str}${obj.span}`,`offset-${str}${obj.offset}`]:[]
                }
        },
```
* 然后computed的colClass里面，我自己用的是三元运算符
```
            colClass(){
                let {span,offset,ipad,narrowPc,pc,widePc}=this//这里增加phone

                let {createClasses}=this
                return[
                    ...createClasses({span,offset}),//这个意思就是...createClasses({span:span,offset:offset})
                    ...createClasses(ipad,'ipad-'),
                    ...createClasses(narrowPc,'narrow-pc-'),
                    ...createClasses(pc,'pc-'),
                    ...createClasses(widePc,'widePc-')
                ]
            },
```
* 老师视频里面methods的代码稍微复杂一点，用的是if语句。
```
        methods:{
                createClasses(obj,str=''){//这里的str=''是默认空字符串，也就是如果不传str就默认是''
                    if(!obj){return []}
                    let array=[]
                    if(obj.span){array.push(`col-${str}${obj.span}`)}
                    if(obj.offset){array.push(`offset-${str}${obj.offset}`)}
                    return array
                }
        },
```
***
* 目前完成的功能
    1. 一个24列布局
    2. 中间可以增加空隙。
    3. 它是响应式的。
***
### 开始写测试用例
#### row.vue的测试用例
* 分别创建col.test.js和row.test.js
* row的props里面有两个参数
    1. gutter
    2. align
    * 没有事件
* 因为是CSS属性需要渲染到页面中才可以测试，所以这里需要挂载到页面，也就是amount到自己创建的div(这个div是挂载到body上面，不可以直接挂载到body上面)
* 另外row里面还需要有个col。所以需要引入row的同时还需要引入col。
* 首先测试存在Row，然后测试接受接受gutter属性。
```
describe('Row', () => {
    '存在Row'
    it('存在.', () => {
        expect(Row).to.exist
    })
    it('接受gutter属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const RowConstructor = Vue.extend(Row);
        const row = new RowConstructor({
            propsData: {
                gutter: 10
            }
        }).$mount(div);
        const ColConstructor = Vue.extend(Col);
        const col = new ColConstructor();

        row.$destroy();
        col.$destroy()

    })
})
```
* 但是上面的测试是有问题的，因为父组件row在mounted的时候，子组件col还没有amounted。所以要先把子组件col和父组件row联系起来（也就是把一个组件做成另一个组件的子组件。）这个在html很好写，就像如下写就可以实现一个组件是另一个族简单的子组件
```
<g-row>
   <g-col>
   <g-col>
</g-row>
```
#### 如何动态的向row组件里面创建一个子组件col
* 因为在row.vue里面获取padding，根据前面的测试，会获取两次。第一次是0，第二次才是row传入的gutter参数给col。
```
            colStyle(){
                console.log('获取padding')//这里会获取两次

                // console.log(`在子组件col里面，因为gutter在computed里面变成了${this.gutter}，所以我也要变化`)
                return {
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }
```
* 用js代码暂时搜索不到怎么写，但是可以用下面的html标签的方法。
* 而在mocha里面，默认只会打印一次（第一次的时候gutter还没有传过来），所以需要等父组件row把gutter传参给给子组件col
* 我们需要等这个过程（因为Vue的create和amount就是异步的），等的这个过程就需要异步函数，那么就需要用到setTimeout。如果是异步函数的调用mocha默认也需要用到[done](https://mochajs.org/#detects-multiple-calls-to-done)这个函数。
```
    it('接受gutter属性',(done)=>{//这个测试框架默认打印一次之后会马上退出，如果要等异步的函数，需要用到这个done
        Vue.component('g-row',Row)
        Vue.component('g-col',Col)
        const div=document.createElement('div');
        document.body.appendChild(div);
        //用js代码暂时搜索不到怎么写，但是可以用下面的html标签的方法。
        div.innerHTML=`
        <g-row gutter="20">
            <g-col span="12"></g-col>
            <g-col span="12"></g-col>
        </g-row>
        `
        const vm=new Vue({
            el:div
        })
        // console.log(vm.$el.outerHTML)
        console.log(vm.$el.outerHTML)//这里的padding-left和right是0px

        setTimeout(()=>{

            console.log('我是setTimeout',vm.$el.outerHTML)//这里的padding-left和right是10px
            done()//这个测试框架默认打印一次之后会马上退出，如果要等异步的函数，需要调用这个done,也就是done()

        },0)//就算设置为0也是异步，就是下一次的时候在打印


        // vm.$destroy();//如果设置了这个就清楚了vm，清除vm是在异步之前，那么就导致打印的padding-left和right都是0px

    })
```
***
* 详细的解释下
* 我们再看看前面说的创建过程，原生的创建是同步的，**但是Vue的创建却是异步的。具体见下面(至于为什么不是同步的，可能是基于性能，这里只是猜测。)**
```
    var div=document.createElement('div')//father 原生JS是同步的created
    var childDiv=document.createElement('div')// 原生JS是同步的child created
    div.appendChild(childDiv)// 原生JS是同步的child mounted，这一步和上一步之间在Vue里面是异步的。因为它的钩子的调用不是同步的。如果这里在Vue里面的mounted钩子完成需要两秒钟，那么Vue会优先完成渲染而不会等这两秒钟。这个也是猜测
    document.body.appendChild(div)// 原生JS是同步的father mounted，父组件同样在Vue里面调用mounted钩子
    //如果里面增加一个console.log(div.outerHTML)此时就是一个队列，最先是console.log()打印，因为他是同步的，然后队列里面显示子组件mounted钩子，然后父组件mounted钩子，
```
* 为了主动来等这个Vue的异步函数，我们就需要用setTimeout，这样**上面的任务队列就会由最先放到最后。**
* **mocha里面如果不加done，不管你有没有写setTimeout，默认都是同步的，在你执行setTimeout这个函数的时候，还没有执行这个函数的内容就直接退出页面，页面退出那么setTimeout就会销毁了。所以需要增加done**
* 在mocha里面异步最长是等待不超过2秒，不然会报错。
***
*  针对gutter这个自定义组件变量测试，我们通过[getComputedStyle](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)就可以找到paddingLeft和paddingRight啦。
```
    it('接受gutter属性',(done)=>{//这个测试框架默认打印一次之后会马上退出，如果要等异步的函数，需要用到这个done
        Vue.component('g-row',Row)
        Vue.component('g-col',Col)
        const div=document.createElement('div');
        document.body.appendChild(div);
        //用js代码暂时搜索不到怎么写，但是可以用下面的html标签的方法。
        div.innerHTML=`
        <g-row gutter="20">
            <g-col span="12"></g-col>
            <g-col span="12"></g-col>
        </g-row>
        `
        const vm=new Vue({
            el:div
        })
        // console.log(vm.$el.outerHTML)
        console.log(vm.$el.outerHTML)//这里的padding-left和right是0px

        setTimeout(()=>{

            console.log('我是setTimeout',vm.$el.outerHTML)//这里的padding-left和right是10px
            const cols=vm.$el.querySelectorAll('.col')
            const row=vm.$el.querySelector('.row')

            console.log(cols)
            expect(getComputedStyle(row).marginRight).to.equal('-10px')//这里需要用到window.getComputedStyle
            expect(getComputedStyle(row).marginLeft).to.equal('-10px')//这里需要用到window.getComputedStyle

            expect(getComputedStyle(cols[0]).paddingRight).to.equal('10px')//这里需要用到window.getComputedStyle
            expect(getComputedStyle(cols[1]).paddingLeft).to.equal('10px')//这里需要用到window.getComputedStyle

            done()//这个测试框架默认打印一次之后会马上退出，如果要等异步的函数，需要调用这个done,也就是done()
            vm.$destroy()//这个销毁也要写到异步函数里面


        },0)//就算设置为0也是异步，就是下一次的时候在打印



        // vm.$destroy();//如果设置了这个就清楚了vm，清除vm是在异步之前，那么就导致打印的padding-left和right都是0px

    })
```
* align这个自定义属性参数测试，**这里我犯了一个原生querySelector()的低级错误，说明基础不好，具体见下面代码注释说明**
```
    it('可以接收align属性', () => {
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Row);
        const vm = new Constructor({
            propsData: {
                align: 'left'
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const row= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        //element.querySelector()是找element元素的第一个子元素的选择器。
        //document.querySelector()是找html根元素第一个元素的选择器
        expect(getComputedStyle(row).justifyContent).to.equal('flex-start')//这里需要用到window.getComputedStyle
        div.remove()
        vm.$destroy()
    })
```
#### col.vue的测试用例
* 这个组件里面有很多props，但是测试不难，因为都是class，所以要用到[element.classList](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)里面的**contains属性**,这里就写一个span和ipad。因为其他的都是一样的，
* span
```
    it('接受span属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                span: '3'
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('col-3')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
```
* widePc,这里我的在传字符串的时候错写成widePc了，应该是wide-pc。
```
    it('接受widePc属性',()=>{
        const div=document.createElement('div');
        document.body.appendChild(div);
        const Constructor = Vue.extend(Col);
        const vm = new Constructor({
            propsData: {
                widePc: {
                    span:3,
                    offset:4
                }
            }
        }).$mount(div);//因为要用到CSS属性没所以需要渲染后，所以要挂载到div上面
        const col= vm.$el;//因为挂载到div上面，所以就在div根元素就是div自己。
        expect(col.classList.contains('col-wide-pc-3')).to.equal(true)
        expect(col.classList.contains('offset-wide-pc-4')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
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

