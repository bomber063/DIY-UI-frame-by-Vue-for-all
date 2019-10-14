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
[![Build Status](https://travis-ci.org/bomber063/DIY-UI-frame-by-Vue.svg?branch=master)](https://travis-ci.org/bomber063/DIY-UI-frame-by-Vue)
* 通过小图标说明我们的持续集成是通过的。
### 开始使用
1. 安装
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

