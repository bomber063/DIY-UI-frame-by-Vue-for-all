# DIY-UI-frame-by-Vue-for-input
* 本节是在[DIY-UI-frame-by-Vue](https://github.com/bomber063/DIY-UI-frame-by-Vue)的基础上继续写轮子。
## 解决一个BUG（因为增加了mocha库，但是并未完全下载它的全部依赖de-indent，再次运行parcel会报错）
* 运行下面代码报错
```
npx parcel index.html --no-cache
```
* 报错信息如下:
```
×  Cannot find module 'de-indent'
```
* 所以需要安装de-indent依赖，可以直接安装,这种方式你的package.json会告诉你安装了什么。但是node_modules会增加100多MB的文件
```
npm i de-indent
```
* 也可以运行`npm i`，不过这种方式你的package.json不会告诉你安装了啥。同样node_modules会增加100多MB的文件。
* **因为我的git hub仓库是忽略了node_modules的**，所以并没有记录这里面的变化，所以当时查询以往记录的时候没有查询到
* 具体可以见[de-indent在git-hub上面的说明](https://github.com/yyx990803/de-indent)和[de-indent在npm的说明](https://www.npmjs.com/package/de-indent)

## Readme.md文件要写什么
* 可以参考[Vue.js](https://github.com/vuejs/vue)的是怎么写的,尽量去模仿它怎么写的就好了。它的结构大致如下：
    1. 首先有一堆logo，一些是通过测试的标志，还有浏览器的兼容性。
    2. 有哪些赞助和支持Vue的机构和个人
    3. 介绍。
    4. 生态系统（也就是vue周边的一些工具）
    5. 文档
    6. 提出的问题
    7. 争论的问题
    8. 变更日记
    9. 联系方式
    10. 贡献者
    11. 执照
* 我们的可以简化为:
    1. 介绍
    2. 开始使用
    3. 文档
    4. 提问
    5. 变更记录
    6. 联系方式
    7. 贡献者（贡献代码）
### 介绍
[![Build Status](https://travis-ci.org/bomber063/DIY-UI-frame-by-Vue-for-input.svg?branch=master)](https://travis-ci.org/bomber063/DIY-UI-frame-by-Vue-for-input)
* 通过小图标说明我们的持续集成是通过的。
* 这是我在学习Vue的过程中做的一个UI框架，希望对你有用。
### 开始使用
1. 添加CSS样式
    使用本框架前，请在CSS中开启border-box
    ```
    *{box-sizing:border-box;}
    //因为默认*元素是不包括::before和::after的，所以要加上
    *::before{box-sizing:border-box;}
    *::afeter{box-sizing:border-box;}
    ``` 
    IE8及以上的浏览器都支持此样式。
    你还需要设置默认颜色等变量（后续会改为scss变量）
    ```
    :root{  
        --button-height:32px;
        --font-size:14px;
        --button-bg:white;
        --button-active-bg:#eee;
        --border-radius:4px;
        --color:#333;
        --border-color:#999;
        /*--border-color-hover:#666;*/
        --border-color-hover:#666;
    }
    //这里的:root也可以换成html，是一个意思
    ```
    这个的兼容性通过[caniuse](https://www.caniuse.com/)的网站查询css var发现兼容性不太好。IE 16及以上才全部支持此样式，IE15部分支持。
2. 安装轱辘(gulu)
```
npm i -S gulu-bomber-1-1
//-S是从npm5就默认增加了，但是低于版本5的需要加上这个-S，-S的全称是--save，他会保存到package里面。
```
3. 引入轱辘(gulu)
```
import {Button,ButtonGroup,Icon} from 'gulu-bomber-1-1'
import 'gulu-bomber-1-1/dist/index.css'

export default {
  name: 'app',
  components: {
    'g-button':Button,
    'g-icon':Icon
  }
}
```

### 文档
### 提问
### 变更记录
### 联系方式
### 贡献代码

## 怎么加通过测试的标记
* 通过在google上查询travis badge，我们可以找到[Embedding Status Images](https://docs.travis-ci.com/user/status-images/) 。
    1. 首先打开你的travis.ci，点击build passing这个小图标后打开一个Status Image
    2. 在对话框中选择分支和格式（比如markdown格式）。
    3. 复制文本并将其粘贴到您的自述文件或网站中。应该可以查看
### 其他标记
* 通过Google查询npm badge查询到[说明](https://www.quora.com/How-do-I-add-an-NPM-package-badge-for-my-project-on-Github)，通过说明我们找到[shield网站](https://shields.io),这个网站仅仅是加图标。具体如何添加要进入网站学习。
## 小技巧git open
* 通过安装git open
```
    npm i -g git-open
```
* 就可以通过`git open`命令打开你的远程仓库啦（用什么浏览器打开需要你在系统中设置默认浏览器即可）。比如我的默认浏览器是360浏览器，那么我在window10系统中设置默认浏览器为chrome就可以用chrome浏览器打开远程仓库了。
## SVG的icon引入方式修改
* 之前我们引入SVG的icon是通过script标签的方式，但是这样的话就无法在组件上来引入这个JS代码里面的script了，所以我们需要新增加一个svg.js文件。
* 我们把script标签引入的信息通过浏览器打开可以看到是一堆js代码，我们把它拷贝下来放到svg.js文件里面。接着在icon.vue里面增加引入svg的import，只需要在icon.vue中引入代码，然后把script注释或者删除掉就完成了
```
    import './svg'
```
* 现在运行下面代码也是可以执行的
```
npx parcel index.html --no-cache
```
## 为了以后parcel后面忘记增加index.html，我们就把命令写到scripts里面
* 在package.json里面增加代码，这样我们就只需要运行`npm start`就可以了，省去了很多命令。
```
  "scripts": {
    "start": "npx parcel index.html --no-cache",
  },
```
## input需求分析
* 一般可以有下面几种用例：
    1. 输入（包括输入错了会报错，输入之前会有提示需要输入什么信息，输入后想清空）
    2. 复制/粘贴
    3. 键盘Tab空位
    4. 敲击回车
    5. 不可输入
* input的状态：
    1. normal普通状态
    2. [focus](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)状态,focus事件在元素获取焦点时触发
    3. [hover](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover),适用于用户使用指示设备虚指一个元素（没有激活它）的情况
    4. [disable](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XUL/Attribute/disabled),虽然可以看见文字，但是不能输入信息。
    5. [readonly](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/XUL/Property/readOnly),虽然可以看见写的文字，但是不能修改。这个跟disable差不多。但是它可以聚焦（focus），disable聚焦（focus）都无法实现。如果设置为true，则用户无法修改元素的值。
    6. error，错误提示，当用户输入了错误信息后提示给用户的状态（error里面可以有focus或hover）
    7. success，写的没有问题，正确状态，（success里面可以有focus或hover）
    * 所以上面一般有15种状态——12345,4（6789,10），5（11，12，13,14,15）,但是这里只做10中状态，也就是success暂时不做，因为跟normal很像，只是修改了颜色而已。
    * 另外可能还有warning等其他状态，这些也暂时不做。
## input样式
* 首先删除或者注释掉app.js里面的测试代码，因为我们已经在src/button.test.js里面测试了。
* 创建一个input.vue文件，里面的内容就写上简单的template，script和style
```
<template>
    <div>
        <input type="text">
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    
</style>
```
* 然后从app.js引入它
```
import Input from './input'

Vue.component('g-input', Input)
```
* 需要注意新建的组件的标签必须要写出闭合标签，不然可能会报错，比如
```
    <g-input></g-input>//这个是不会出错的
    <g-input/>//这个会出错
```
* 因为vue的文档说过vue的模板使用的语法是html语法——[Vue.js 使用了基于 HTML 的模板语法](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8E%9F%E5%A7%8B-HTML),**而这里并没有说[xml语法](https://www.runoob.com/xml/xml-syntax.html)（xml语法是必须要自闭合,而html有些自定义标签可以不用自闭合）**
* 在使用name之前安装一个[vue开发者工具——Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd),可以在[chrome商城](https://chrome.google.com/webstore/category/extensions)里面**搜索vue-js**就可以找到了。安装之后你在chrome的开发者工具中就可以看到Vue了。他可以通过**组件的形式**让你看到各个标签，比如原生的element要直观和方便。
### 使用Vue的name
* 这时候我们可以通过[name](https://cn.vuejs.org/v2/api/#name),指定 name 选项的一个好处是便于调试。有名字的组件有更友好的警告信息。另外，当在有 vue-devtools，通过提供 name 选项，可以获得更有语义信息的组件树。比如我们把input.vue里面的增加name是'你好',那么在vue-devtools中我么就可以看到你好这个组件名字了
```
<script>
    export default {
        name:'你好'
    }
</script>
```
* 另外如果用**短横线命名的名字会被转换为驼峰命名的文字显示在vue-devtools上**，比如gulu-in会被转换为guluIn
```
<script>
    export default {
        name:'gulu-in'
    }
</script>
```
* 我们把其他的组件都使用name来修改名字。
```
button.vue里面修改为name:GuluButton
button-group.vue里面修改为name：GuluButtonGroup
icon.vue里面修改为name:GuluIcon
```
* name还有另外一个作用以后用到的时候再说明。
### scss的变量语法
* [变量 $](https://www.sass.hk/docs/),SassScript 最普遍的用法就是变量，变量以美元符号开头，赋值方法与 CSS 属性的写法一样：
```
$width: 5em;
```
* 直接使用即调用变量：
```
#main {
  width: $width;
}
```
### 使用scoped
* [scoped](https://cn.vuejs.org/v2/guide/comparison.html#%E7%BB%84%E4%BB%B6%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%86%85%E7%9A%84-CSS),这个可选 scoped 属性会自动添加一个唯一的属性 (比如 data-v-21e5b78) 为组件内 CSS 指定作用域，编译的时候 .list-container:hover 会被编译成类似 .list-container[data-v-21e5b78]:hover
* 它可以解决与别的名字重名的问题。
* 比如我把input.vue里面的style加上这个scoped
```
<style lang="scss" scoped>
```
* 会在浏览器里面显示为
```
<div data-v-c69b09 class="wrapper" style="margin: 20px;">
    <input data-v-c69b09 type="text">
</div>
```
* 我们在浏览器上再看下源代码
```
.wrapper > input[data-v-c69b09] {
  height: 32px;
  border: 1px solid #999;
```
* 所以添加了scoped之后Vue会做两件事情：
    1. 它会把里面所有有style属性的选择器中加上data-v-c69b09这个属性，这个就是这个组件的唯一ID。
    2. 它里面的所有子元素如果有style属性的选择器上加上data-v-c69b09这个属性。
* 但是svg里面的use没有，因为use是不能加样式的。
* 推荐在每一个Vue组件都加上这么一个属性
* 加了之后会有一个缺点，等遇到了这个缺点在说明
### 继续完善样式
#### 这个传值我总是弄错，为了便于区分我用valuea代替自定义变量。
* 我们给这个input一个初始值张三，在外面的valuea是一个自定义属性变量名字，可以赋值为张三，这里张三是字符串。
```
    <g-input valuea=张三></g-input>
```
* 而input.vue组件内部的value是CSS的属性，并且声明了props的变量属性valuea，然后用v-bind:就是相当于使用了JS语法，把自定义的属性变量valuea（这个变量已经被赋值为张三）赋值给CSS属性value。
```
<template>
    <div class="wrapper">
        <input v-bind:value='valuea' type="text">
    </div>
</template>

<script>
    export default {
        name:'GuluInput',
        props:{
            valuea: {
                type: String
            }
        }
    }
</script>
```
#### disabled属性
* [disabled](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XUL/Attribute/disabled),如果这个元素的disabled属性被设置为true，表示元素被禁用，被禁用的属性在页面上通常会显示灰色文本，它无法响应用户的操作，它也无法得到光标。
* 为了区分CSS属性和自定义属性，我把自定义属性后面增加一个a，也就是disableda
* 另外还要记得有冒号代表JS代码，没有冒号代表字符串。**不管是在组件内部还是外部**
* 外面的index.html上面的代码,这里的:disableda="true"可以直接写成disableda，因为HTML语法就是如果有一个属性那么就是true,就是你给了default:false，它也会是true
```
    <g-input valuea="李四" :disableda="true"></g-input>
    <g-input valuea="李四" disableda></g-input>//这个是也没问题的
```
* 在input.vue里面
```
<template>
    <div class="wrapper">
        <input v-bind:value='valuea' :disabled=disableda   type="text">
    </div>
</template>
<script>
    export default {
        props:{
            disableda:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
```
#### readonly属性
* 为了区分CSS属性和自定义属性，我把自定义属性后面增加一个a，也就是readonlya
* 在input.vue里面
```
<template>
    <div class="wrapper">
        <input v-bind:value='valuea' :disabled='disableda' :readonly="readonlya"  type="text">
    </div>
</template>

<script>
    export default {
        props:{
            readonlya:{
                type:Boolean,
                default: false
            }
        }
    }
</script>
```
* 外面的index.html上面的代码
```
    <g-input valuea="李四" readonlya></g-input>
```
#### error属性
* 为了区分CSS属性和自定义属性，我把自定义属性后面增加一个a，也就是errora
* 在input.vue里面,这里的`:class="{error:errora}`,如果你的自定义属性是error，就可以用析构的语法简写为`:class="{error}`
```
<template>
    <div class="wrapper" :class="{error:errora}">
        <input v-bind:value='valuea' :disabled='disableda' :readonly="readonlya" type="text">
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        props:{
            errora:{
                type:String
            }
        }
    }
</script>
```
* 外面的index.html上面的代码
```
    <g-input valuea="王五" errora="姓名不能少于两个字"></g-input>
```
#### input里面局部注册Icon
* 前面的app.js里面在Vue上面的注册都是[全局注册](https://cn.vuejs.org/v2/guide/components-registration.html)，比如
```
import Button from './button'

Vue.component('g-button', Button)
```
* **全局注册**使用标签都是使用写好的名字，比如上面的就是用**g-button这个自义定标签**。
* 在input.vue**局部注册**icon.vue,这的**标签名字就是components后面的名字Icon**。
```
<template>
    <div class="wrapper" :class="{error:errora}">
        <Icon name="setting"></Icon>
    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        components:{Icon},
        }
    }
</script>
```
#### 使用template而不使用div
* 我们需要在出现错误的时候出现icon，也就是error的时候在出现icon，那么就需要用v-if，此时还需要把error的错误信息传进来。所以在input.vue中写成这样
```
        <Icon v-if="errora" name="setting"></Icon>
        <span v-if="errora">{{errora}}</span>
```
* 如果你想省略掉一个v-if就需要在这两个标签（Icon和span）外面写一个div标签，但是div标签是block的，会换行，那么如果改成template就不会换行了.
```
        <template v-if="errora">
            <Icon name="setting"></Icon>
            <span>{{errora}}</span>
        </template>
```
#### cursor鼠标样式
* 给不能够点击的disabled和readonly加上not-allowed的样式
```
            &[disabled],&[readonly]{
                border-color: #ccc;
                color: #ccc;
                cursor: not-allowed;
            }
```                                                                                          
* 然而，这个元素仍然能够响应鼠标事件，如果要启用这个元素，把disabled设置为false
#### 增加Icon的错误样式
* 通过iconfont增加错误的提示样式，可以是一个**感叹号**。
* 这里修改颜色**可以直接用svg的语法**,比如`fill='red'`
```
        <Icon name="error" fill="red"></Icon>
```
* 这里我统一用一个class选择器和scss属性来修改颜色
```
<template>
    <div class="wrapper" :class="{error:errora}">
        <input v-bind:value='valuea' :disabled='disableda' :readonly="readonlya" type="text">
        <template v-if="errora">
            <Icon name="error" class="icon-error"></Icon>
            <span>{{errora}}</span>
        </template>
    </div>
</template>

<style>
        .icon-error{
            fill:$red;
        }
</style>
```
#### 这里用连接行（join line）快捷键压缩style代码
* 由于input的SCSS代码开始有点多了，所以用连接行把他们都缩进为一行，WebStorm默认的快捷键是Ctrl+Shift+J，我这里增加了Shift+J也是这个快捷键。
* 为了防止格式化代码后还原，我们需要在WebStorm中把CSS和SCSS保持当行块结构，通过设置->编辑器->Code Style->Style Sheets->CSS和SCSS里面的Keep single-line blocks打钩即可
* 但是这里**我暂时先不简化为一行，因为我怕自己不习惯**。
#### 增加一点间隙
* 我们使用了[:not](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)和[:last-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child)两个伪类，不是最后一个子类的增加右边的margin
```
    .wrapper {
        >:not(:last-child){
            margin-right:0.5em;
        }
    }
```
## input标签的事件
* input标签有哪些事件可以参考[input标签的事件汇总](https://www.cnblogs.com/pei123/p/9098650.html)
* 首先原生有很多[事件](https://developer.mozilla.org/zh-CN/docs/Web/Events),其中有一个是[原生的change事件](https://developer.mozilla.org/zh-CN/docs/Web/Events/change),change 事件被input标签, select标签, 和textarea标签 元素触发, 当用户提交对元素值的更改时。与  input 事件不同，change 事件不一定会对元素值的每次更改触发。如果是普通的input标签的change事件，文本修改后需要把鼠标移开点击之后才会触发，而input事件不需要把鼠标移开点击。
### 这里绑定change事件
* 首先在input.vue里面的代码`@change="$emit('changea',$event)"`,这里前面的`@`是`v-on:`的缩写，前面的change是原生的change事件，后面的changea（为了便于区分所以后面加了一个a）是自定义的一个事件，这个自定义的时间需要在外面index.html上传入，[$emit](https://cn.vuejs.org/v2/api/#vm-emit)是触发一个当前的实例事件，最后面的[$event](https://cn.vuejs.org/v2/guide/events.html#%E5%86%85%E8%81%94%E5%A4%84%E7%90%86%E5%99%A8%E4%B8%AD%E7%9A%84%E6%96%B9%E6%B3%95),有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法
* 在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 [$event](https://cn.vuejs.org/v2/api/#errorHandler) 属性：v-on:click="handle('ok', $event)"
* 如果没有这个$event就无法获取到原生事件传入的值。
```
<template>
    <div class="wrapper" :class="{error:errora}">
        <input v-bind:value='valuea' :disabled='disableda' :readonly="readonlya" type="text" @change="$emit('changea',$event)">
        </template>
    </div>
</template>
```
* 在index.html上代码
```
    <g-input valuea="王五" @changea="inputChange"></g-input>
```
* 这里把自定义事件赋值为inputChange,而这个inputChange需要看全局的methods里面找，也就是app.js里面,这里的e也就是前面的$event。通过e.target.value就可以获取到传入的文本。这个参数e叫什么无所谓，也可以叫其他的参数。
```
new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: true,
        loading3: false
    },
    methods:{
        inputChange(e){
            console.log(e.target.value)
        }
    }
})
```
* 你还可以传第三个参数，也就是
```
<template>
    <div class="wrapper" :class="{error:errora}">
        <input v-bind:value='valuea' :disabled='disableda' :readonly="readonlya" type="text" @change="$emit('changea',$event,'hi')">
        </template>
    </div>
</template>
```
* 这样通过下面参数a就可以获取到这第三个参数`hi`,**但是一般不需要传入第三个参数。只需要前面两个参数即可，第一个参数是自定义事件的名字，第二个参数是原生v-on:绑定的事件的一个对象**。
```
new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: true,
        loading3: false
    },
    methods:{
        inputChange(e,a){
            console.log(e.target.value)
            console.log(a)
        }
    }
})
```
## 测试用例
### 测试valuea这个自定义属性
* 因为自定义属性是valuea，它是传给了value,那么测试代码就写成
```
    it('可以接收value.', () => {
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData: {
                valuea: 'settings'
            }
        }).$mount()
        const inputElement = vm.$el.querySelector('input')
        expect(inputElement.value).to.equal('settings')
        vm.$destroy()
    })
```
* 这里用到点操作符
```
 expect(inputElement.value).to.equal('settings')
```
* 而不是去获取标签的属性，这样会出错。
```
       expect(inputElement.getAttribute('value')).to.equal('settings')
```
* 因为如果在Vue里面如果用了v-bind:就是一个JS语法，大部分都是一个对象，所以要用点操作符来取信息。而前面的svg中的use标签的属性xlink:href应该是一个字符串。可能它不支持JS语法。
```
        expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')
```
### 测试disableda这个自定义属性
* 跟前面的value一样
```
    it('可以接收disabled.', () => {
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData: {
                disableda: true
            }
        }).$mount()
        const inputElement = vm.$el.querySelector('input')
        expect(inputElement.disabled).to.equal(true)
        vm.$destroy()
    })
```
### 测试readonlya这个自定义属性
* 这个属性虽然代码中input.vue中的readonly没有把o写成大写，但是这里测试用例的时候必须要写成大写，可能是这个API浏览器就这么规定的吧
```
    it('可以接收readOnly.', () => {
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData: {
                readonlya: true
            }
        }).$mount()
        const inputElement = vm.$el.querySelector('input')
        expect(inputElement.readOnly).to.equal(true)//需要注意这里的readOnly的O必须是大写的，可能是这个API就是这样规定的吧
        vm.$destroy()
    })
```
### 测试errora这个自定义属性
* 因为input本身就已经传了name=error了,所以就不需要传入参数了。我们用的自定义属性是errora，我们这里传的是`你错了`
```
    it('可以接收error,并显示error的信息.', () => {
        const Constructor = Vue.extend(Input)
        const vm = new Constructor({
            propsData: {
                errora: '你错了'
            }
        }).$mount()
        const inputElement = vm.$el.querySelector('use')
        const spanElement=vm.$el.querySelector('span')
        expect(inputElement.getAttribute('xlink:href')).to.equal('#i-error')//这个因为input本省就已经传了name=error了
        expect(spanElement.innerHTML).to.equal('你错了')//这个因为我们用的自定义属性是errora，我们这里传的是'你错了'
        vm.$destroy()
    })
```
### 把以上的传参作为一个describe里面，并减少重复代码
```
    describe('props',()=>{
        it('各种props',()=>{
            
        })
    })
```
* 用到mocha的[hooks](https://mochajs.org/#hooks)，有before(), after(), beforeEach(), and afterEach()。
* 声明构造函数和声明vm的代码提取到整个props的作用域中。
* 把每次`$destroy()`提取到afterEach里面。
* 这里只列出了一个value，代码变为
```
    describe('props', () => {
        let vm
        const Constructor = Vue.extend(Input)
        afterEach(function() {
            vm.$destroy()
        });
        it('可以接收value.', () => {
            vm = new Constructor({
                propsData: {
                    valuea: 'settings'
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.value).to.equal('settings')
        })
        ...
    })
```
### 事件测试
#### 先测试原生change事件
* 首先要知道如何触发一个事件，比如change事件。我们在Google上面搜索js trigger change event ,可找到一个[说明——How can I trigger an onchange event manually? duplicate](https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually),了解到[dispatchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)和[fireEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/fireEvent),不过fireEvent是非标准的，所已经尽量不要用它。
* 在vue实例上我们测试触发一个事件，比如这里的自定义事件是changea。
```
        it('支持change事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('changea',callback)

            vm.$emit('changea',callback)
            expect(callback).to.have.been.called
        })
```
* 但是因为目前我们涉及到原生的change事件，那么就需要用到原生JS的触发事件的API，那就是前面说的[dispatchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)，这样就是
    1. 先触发原生event对应的change事件.
    2. 然后根据input.vue上的代码,一旦触发原生的change事件就会去`$emit('changea',$event)`,也就是触发自定义的changea事件。
    3. 然后这个callback就会被调用，那么sinon.fake()这个Mock函数就通知到位。
    ```
    <input :value='valuea' :disabled='disableda' :readonly="readonlya" type="text" @change="$emit('changea',$event)">
    ```
```
        it('支持change事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            
            vm.$on('changea',callback)
            var event = new Event('change');
            let inputElement=vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            
            expect(callback).to.have.been.called
        })
```
* 我们通过console.log(event)，这个event就是上面代码的var event这个变量存的事件，在测试代码input.test.js里面打出只有一个值，就是不可信
```
LOG: Event{isTrusted: false}
```
* 我们把代码放到app.js里面在浏览器的开发者工具控制台打出可以看到是一个对象哈希。有很多属性，当然也包括了前面的`Event{isTrusted: false}`
* 我们先通过在app.js上面使用created函数来创建并在开发者工具中查看，有几点注意
    1. 这需要用延迟的异步函数setTimeout，因为在created的周期阶段，子组件里面的标签还不一定渲染好了，如果不用setTimeout就获取不到子组件里面的信息。具体说明可以见[vue父组件获取子组件数据对象](https://segmentfault.com/q/1010000017405622)和[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
    2. 因为有很多input标签，用到change事件的是第五个input标签，也就是数组第四个元素，这里的this是整个Vue，所以取到第五个子组件`this.$children[4]`,然后第五个的根原生DOM元素就是`$el`，最后选择到input整个选择器。
    3. 接着用dispatchEvent触发原生的change事件，子组件就会去触发自定义的changea事件。通过index.html里面的`@changea="inputChange"`就会去触发app.js里面的methods对应的inputChange。然后就用参数，比如e可以获取到这个let event的event了，也就是原生的change事件。
    4.在开发者工具我们可以看到当第一次运行的时候（JS代码产生的）是isTrusted: false，当你修改input里面的值的时候（用户输入产生的），就会显示isTrusted: true
```
    created(){
        setTimeout(()=>{
            let event = new Event('change');
            let inputElement=this.$children[4].$el.querySelector('input')
            inputElement.dispatchEvent(event)
            console.log('hi')
        },1000)

    },
    methods:{
        inputChange(e){
            console.log(e)
        }
    }
```
* 原生change触发Vue的自定义changea事件成功了，那么怎么拿到原生change事件传的这个值是个问题。
* 我们通过[sinon-chai文档](https://github.com/domenic/sinon-chai),通过查看我们知道这个参数通过calledWith来查看。
```
        it('支持change事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('changea',callback)
            var event = new Event('change');
            let inputElement=vm.$el.querySelector('input')

            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })
```
#### 按照change事件的方式去增加blur,input,focus事件
* input.vue上面
```
        <input :value='valuea' :disabled='disableda' :readonly="readonlya" type="text"
               @change="$emit('changea',$event)"
               @input="$emit('inputa',$event)"
               @focus="$emit('focusa',$event)"
               @blur="$emit('blura',$event)">
```
* blur事件
```
        it('支持blur事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            
            vm.$on('blura',callback)
            var event = new Event('blur');
            let inputElement=vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            
            expect(callback).to.have.been.calledWith(event)
        })
```
* focus事件
```
        it('支持focus事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('focusa',callback)

            var event = new Event('focus');
            let inputElement=vm.$el.querySelector('input')

            inputElement.dispatchEvent(event)

            expect(callback).to.have.been.calledWith(event)
        })
```
* input事件
```
        it('支持input事件',()=>{
            vm = new Constructor({}).$mount()

            const callback=sinon.fake()
            vm.$on('inputa',callback)

            var event = new Event('input');
            let inputElement=vm.$el.querySelector('input')

            inputElement.dispatchEvent(event)

            expect(callback).to.have.been.calledWith(event)
        })
```
* chai是从哪里来的,karma.conf.js里面有一个frameworks，里面引入到sinon-chai
```
        frameworks: ['mocha', 'sinon-chai'],
```
#### 这几个事件测试有很多重复代码，用forEach优化重复的代码
* 用一个数组把它们放进去。我自己写的一个，这个还可以继续优化,需要特别注意，**在[]符号之前，let声明之后，必须要分号结束，如果没有分号结束会报错**,具体原因可以见[语法和数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types)和[词法文法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar)
```
        it('支持change,input,blur,focus事件,我自己写的',()=>{
            vm = new Constructor({}).$mount()
            const callback=sinon.fake()
            vm.$on('changea',callback)
            vm.$on('blura',callback)
            vm.$on('focusa',callback)
            vm.$on('inputa',callback)
             let event1 = new Event('change');
             let event2 = new Event('blur');
             let event3 = new Event('focus');
             let event4 = new Event('input');

            let inputElement=vm.$el.querySelector('input');
            [event1,event2,event3,event4].forEach((x)=>{
                inputElement.dispatchEvent(x)
                expect(callback).to.have.been.calledWith(x)
            })

        })
```
* 看了老师的视频之后发现更优化，结合自己的代码，因为我的自定义事件后面都有一个a，所以最后优化的代码如下
```
        it('支持change,input,blur,focus事件,看了老师的视频之后结合自己的代码继续优化的代码',()=>{

            ['change','input','blur','focus'].forEach((x)=>{
                vm = new Constructor({}).$mount()

                const callback=sinon.fake()

                vm.$on(x+'a',callback)

                var event = new Event(x);
                let inputElement=vm.$el.querySelector('input')
                inputElement.dispatchEvent(event)
                expect(callback).to.have.been.calledWith(event)
            })
        })
```
## karma,mocha,chai分别是什么作用
* [karma](https://karma-runner.github.io/latest/config/configuration-file.html)它有一个配置是karma.confi.js,它**主要是用来打开浏览器**，通过代码可以看到是无头的Chrome浏览器。打开浏览器才可以测试用例
```
        browsers: ['ChromeHeadless'],
```
* 然后引入[mocha](https://mochajs.org/)和[sinon-chai](https://github.com/domenic/sinon-chai)
```
        frameworks: ['mocha', 'sinon-chai'],
```
* 引入mocha之后就会有describe和it两个函数。在测试的时候，也就是`npm run test`的时候，这个函数都是直接挂在window上面的全局函数。
* 引入sinon-chai就是同时引入[sinon](https://sinonjs.org/releases/v7.5.0/)和[chai](https://www.chaijs.com/)。sinon就是做fake用的，比如`sinon.fake()`,引入的chai.js就是使用expect断言语句。并且chai.js因为sinon-chai这个东西，所以可以和sinon一起合作。于是有了`calledWith`。他是在chai上面添加的api。
* 然后通过files把测试用例引入到浏览器里面去
```
        files: [
            'dist/**/*.test.js',
            'dist/**/*.test.css'
        ],
```
* 然后呈现的报告，也就是运行npm run test之后在node.js上面呈现的字就是由report提供的,默认有一个`progress`，`progress`就是会报告一些进程。还有一个`dots`，`dots`它呈现出来的效果除了会报告一些进程，还会呈现一些点,比如`........`，成功的都是一个点。还提供了一个网站`https://npmjs.org/browse/keyword/karma-reporter`，里面有各种报告的呈现形式。这个以后再去探索。一般用默认的progress就OK了。
```
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],
```
## 双向绑定
* Vue很早之前是支持双向绑定的，后来不支持。目前我们的组件只支持传参和添加事件，暂时不支持双向绑定。
* 通过[jsbin](https://jsbin.com/wokasuvewo/1/edit?html,js,output)我们生成一段代码
* html上的代码为
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js"></script>
  
</head>
<body>
  <div id='app'>
    <input type="text" v-model='message'>
    <p>
      {{message}}
    </p>
  </div>
</body>
</html>
```
* JS上的代码为
```
var app=new Vue({
  el:'#app',
  data:{
    message:'hi'
  },
  created(){
    setInterval(()=>{
    this.message=this.message+'!'
  },1000)
  }
})
```
* 我们可以看到，**当用户输入信息的时候，对应的js代码会改变，当用created函数修改JS的时候，用户的输入内容也会改变**。
* 我们的Vue怎么支持双向绑定呢，其实Vue是不支持双向绑定的，它只是做了一个语法糖，当用户用input的[v-model](https://cn.vuejs.org/v2/api/#v-model)的时候，其实相当于写了两个绑定：
    1. 绑定value,这样就使得JS改变value这个属性对应的message的时候，也会改变用户输入的value。(相当于JS来改变用户的输入)
    ```
        <input type="text" :value=message>
    ```
    2. 绑定原生的input事件，当发生原生input事件的时候，把这个时间的值，也就是$event.target.value赋值给message。(相当于用户输入的信息改变JS)
    ```
        <input type="text" @input='message=$event.target.value'>
      </div>
    ```
* 所以两个结合起来就是双向绑定啦，也就是用户输入的信息改变JS，同时JS也可以代表用户输入的信息。在[JSbin](https://jsbin.com/xavepahayi/1/edit?html,js,output)上可以查看效果。
### 让自己的代码实现双向绑定
* 首先一个组件上的 v-model 默认会利用**名为 value** 的 prop 和**名为 input 的事件**,但是我们之前的用的是valuea和inputa，所以是不可以使用v-model的。
#### 先用valuea和inputa实现双向绑定 
* 我们先用`:valuea`和`@inputa`来实现双向绑定。 因为我们子组件自定义的就是后面加一个a.
* 在index.html上代码
```
    <g-input :valuea="message" @inputa="message=$event"></g-input>
    <span>{{message}}</span>

```
* 在app.js上增加一个`message:'hi'`
```
new Vue({
    el: '#app',
    data: {
        loading1: false,
        loading2: true,
        loading3: false,
        message:'hi'
    },
    methods:{
        inputChange(e){
            console.log(e)
        }
    }
})
```
* 在input.vue上面把`$event.target.value`传出去
```
           @input="$emit('inputa',$event.target.value)"
```
* 这样就实现了用户修改input的值的时候而自动更改JS变量
* 继续增加代码使得JS变量更改后去修改用户的input值
* 我们在index.html中代码增加如下，那么在点击+1的时候，input输入框里面的内容值也会通过时更改了。也就是实现了JS变量更改后去修改用户的input值。
```
        <button @click="message=message+1">+1</button>
```
#### 我们在用v-model实现双向绑定
* [自定义组件v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)中提到如果要用v-model，就必须使用value和input.因为子组件里面已经写了value和input了，但是原生的input触发的input也必须是input，不能是inputa，并且prop的value必须是value，不能是valuea。
* index.html代码
```
    <g-input v-model="message"></g-input>
```
* input.vue中的部分代码
```
<template>
    <div class="wrapper" :class="{error:errora}">
        <input :value='value' :disabled='disableda' :readonly="readonlya" type="text"
               @input="$emit('input',$event.target.value)"
    </div>
</template>

<script>
    import Icon from './icon'

    export default {
        components: {Icon},
        name: 'GuluInput',
        props: {
            value: {
                type: String
            }
        }
    }
</script>
```
* 这样就是v-model的双向绑定的效果。
***
* 在vue组件里面的template是不支持注释的。
* 还有有一点需要注意：就是如果当前的value如果与更改后的value是一样的，那么他就不会变化了，要不然会无限循环的改变下去。这个是vue的一个dom diff过程。
* 另外因为我们修改了`$event`这个传出去的信息，之前是传出去整个事件对象，而只是把这个时间对象对应的target.value值传出去，那么测试用例也需要修改，要不让无法通过。
* 因为在测试用例上面这个事件没有target属性，并且它还是只读属性你不能修改，在浏览器里面它是会自动补全这个值的。比如你这样写就不行
```
    event.target={value:'hi'}
```
* 那么通过google搜索js new event set target,可以找到[How to set target property when simulating mouseclick in javascript?](https://stackoverflow.com/questions/27108094/how-to-set-target-property-when-simulating-mouseclick-in-javascript)使用了[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty),该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。这里的event是在其定义的对象。target是要定义或修改的属性的名称。这个的value是默认的他的值。
```
  Object.defineProperty(event, 'target', {value: target, enumerable: true});
```
* 而我们需要他默认的这个value应该是`{value:'hi'}`
* 测试用例删除掉其他非循环的重复代码，包括优化循环后的代码，并且把这个最后的calledWith修改为hi,* 默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改的。夏敏的`enumerable: true`可以省略，不影响测试结果，因为这个是是否可以枚举的意思。最后我不太清楚为什么用Object.defineProperty就可以破除只读属性了。
```
        it('支持change,input,blur,focus事件,看了老师的视频之后结合自己的代码继续优化的代码',()=>{

            ['change','input','blur','focus'].forEach((x)=>{
                vm = new Constructor({}).$mount()

                const callback=sinon.fake()

                vm.$on(x+'a',callback)

                var event = new Event(x);
                Object.defineProperty(event, 'target', {value: {value:'hi'}, enumerable: true});

                let inputElement=vm.$el.querySelector('input')
                inputElement.dispatchEvent(event)
                expect(callback).to.have.been.calledWith('hi')
            })
        })
```
***
## 其他学习参考
* 这里插入一个小知识，运行下面命令可以查看网页的信息，[更多curl命令](https://www.jianshu.com/p/07c4dddae43a)
```
curl -L 网站全称
```

## 网格系统


