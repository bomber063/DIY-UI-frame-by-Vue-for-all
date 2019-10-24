## 网格系统(grid)
* [知乎问答](https://www.zhihu.com/question/19602912)
* 就是把一个 div 分成 N 个部分（N = 12,16,24...），每个部分无空隙或者有空隙。 
* 它是**web设计师**的一种方法论。
* 我们可以看淘宝网站可以看到大致分为横向和纵向布局。也就是左中右，上中下。
* 按照是否有空隙分为：
    1. 有gutter。
    2. 无gutter
* [gutter](http://www.iciba.com/gutter)英文的意思是天沟。
### 开始写代码
* 我们主要的标签前面最好都加一个g-，例如横向`<g-row>`，纵向（英文全称是column）`<g-col>`，因为Vue官方文档建议自定义标签最好是x-开头。x也可以随便，也就是一个东西中划线一个东西。同时也避免万一HTML6出来了，自带一个row标签就有可能冲突。
* 我们默认整体的宽度是24.也可以叫做span（跨度）24.gutter一般是像素，例如12px,一般gutter写到g-row上面，span写到g-col上面。就可以简单写成下面的代码
```
<g-row gutter="12">
    <g-col span="10"></g-col>
    <g-col span="14"></g-col>

</g-row>
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

