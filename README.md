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
    4. disable,虽然可以看见文字，但是不能输入信息。
    5. readonly,虽然可以看见写的文字，但是不能修改。这个跟disable差不多。
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
                                                                                           
                                                                                           然而，这个元素仍然能够响应鼠标事件，如果要启用这个元素，把disabled设置为false

## 其他学习参考
* 这里插入一个小知识，运行下面命令可以查看网页的信息，[更多curl命令](https://www.jianshu.com/p/07c4dddae43a)
```
curl -L 网站全称
```


