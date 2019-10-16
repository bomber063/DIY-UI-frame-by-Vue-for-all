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

## 其他学习参考
* 这里插入一个小知识，运行下面命令可以查看网页的信息，[更多curl命令](https://www.jianshu.com/p/07c4dddae43a)
```
curl -L 网站全称
```


