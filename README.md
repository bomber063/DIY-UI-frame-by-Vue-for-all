## 阶段性总结(Stage summary)
### 前面的每一节用一句话总结
* 课前水平自测——JS、CSS、SVG非常了解才能造UI轮子
* 课程概览、UI设计——没有需求就不要写代码，没有设计稿也不要写代码，有需求也需要设计师给设计稿才可以开始写代码。
* 框架搭建，持续集成——这里主要讲了单元测试。单元测试是重构的前提。
* button文本输入框轮子——用到了ES6语法，SASS工具，以后会用到的webpack工具的知识一般都不太重要，会用即可。
    * 比如ES可以把阮一峰关于ES6的书全都读一遍，也可以学一个知识点用一个知识点，比如(这里就用到在对象里面用中括号表示一个用变量作为它的key,这句话是老师说的)，我从MDN上看到的是[其允许在[]中放入表达式，计算结果可以当做属性名。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0),这就是一个知识点，然后学一个用一个。学了10几个之后发现ES6常用的功能就是那么多。
    ```
    <button class="g-button" v-bind:class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')">
    ```
    * SASS语法也是一样，第一个学习的知识点就是可以把选择器嵌套起来。而且可以用&表示当前选择器，等等一个个的学习。一个个的学习才是工具的学法。
    ```
        .g-button{
            vertical-align: top;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font-size);
            height:var(--button-height);
            padding: 0 1em;
            border-radius:var(--border-radius);
            border:1px solid var(--border-color);
            background: var(--button-bg);
            &:hover{
                border-color: var(--border-color-hover);
            }
        }
    ```
    * 与它相对的，比如Vue的数据是响应式的，这个就是核心概念。Vue有一个工具就是Vue—Cli就是一种工具。核心概念一定要非常清楚，工具不需要弄的非常清楚。
* 其他的部分——设计模式
    * 发布订阅模式——在eventBus上面就用到了。比如在tabs组件里面就用到了。它满足三个API就可以用到了，分别是emit(触发或者发布),on(订阅),off(取消订阅)。一般用到一个中心化的事件处理器。就用这个模式。类似平时微博上面的关注一个人(订阅),当他更新内容的时候发布一个消息(触发或者发布)。发布订阅模式一般都是有三个角色的：分别是发布者，订阅者和时间中心(eventBus或者eventHub)。
    * 单向数据流模式——比如在我们的collapse组件特别明显。当用户选中第二项的时候，第二项并没有把自己改变成选中状态，而是把这个消息告诉他的父组件，然后由父组件来改变这个选中的第二项的子组件的选中状态。也就是由父组件来更新子组件。
        * collapse加上选中的项目(selected)就得到了对应的UI(就是第一项或者第二项被选中状态)，如果用户点击了某一项，那么selected就会变成另外一种状态，不要在局部处理这个事件，而是再次把这个selected传给collapse,然后新的collapse和新的selected就会得到新的UI，这样就是单向数据，会使得数据流变成相对简单很多。**以后学到react框架也会用到单向数据流，不过设计模式跟任何框架无关，设计模式其实就是写代码的套路**，react比较喜欢单向数据流，Vue一开始喜欢双向绑定，后来Vue偷偷的修改为了单向数据流。因为不好意说，所以说单向数据流和双向绑定都支持。
            * 如果d0是d1的父组件，d1是d2的父组件，那么只能父组件去更新子组件的信息，而子组件不可以更新父组件的信息，如果子组件更新父组件，父组件又更新子组件，那么就相关更新，形成一个环，就会互相影响。更新变的很复杂。**但是你可以通过子组件间接更新父组件，可以通过eventBus，也就是子组件通知eventBus,然后通过eventBus来更新父组件**，react中的eventBus就是Redux
    * 正交(尤其是props)——我们看看button的props,icon是控制按钮里面左边的图标。iconPosition是控制图标的位置的。loadings是控制是否显示loading状态的。**这三个props互相之间是不影响的**。
    ```
            props: {
                'icon': {},
                'loadings':{
                  type:Boolean,
                  default: false
                },
                'iconPosition': {
                    type: String,
                    default: 'left',
                    validator(xxx) {
                        return xxx === 'left' || xxx === 'right';
                    }
                }
            }
    ```
    * 我们看另外一个正交的组件，input组件。里面有value，控制里面的值，disable控制它是否可以选中或者更改。readonly跟disable一样，只是为了考虑兼容性而用它的。error是用来显示错误文字的。这些props之间没有互相影响的关系。互相没有交叉的部分。如果设置为不正交，也就是互相影响的，那么就是不对的设置props。在比如电脑显示器的消失效果的时候，上面有对比度，饱和度和色相三者。你在调任意一个的时候都不会影响另外两个。所有的属性不要控制同一个信息。
* 可测试代码——有时候为了满足测试要求，我们需要添加一些属性，**为了测试的时候能够比较容易的选中某个元素**。
* 不要让人思考——就是如果一个地方命名为Classes，那么其他地方最好也这样做，这样就会让使用的人减少学习成本。
* 面向离职写代码
    1. 所有信息文档化。离职的时候可以把文档发给交接工作的人就可以离职了。
    2. 被观查感，为了离职后别人看自己的代码不要太难看。也就是尽量做到严格要求自己。
    3. 在团队中表现优异的感觉。就是要在走前给团队做出贡献，不然走的时候是一个平平无奇的人，就非常不好。让自己有一种紧迫感。
### 制作自己的初步官网
* 使用[vuePress](https://vuepress.vuejs.org/zh/),我这里不做全局安装，只做本地安装。如果多个人合作的话，别人可能就不知道你安装了哪些依赖。比如我就通过
```
npm i -D vuepress
```
* 我安装完了之后显示的版本是`vuepress@1.2.0`,老师的版本是` vuepress@0.13.1`
* 然后新建一个文件夹
```
# 新建一个 docs 文件夹
mkdir docs
```
* 然后写一些内容到docs文件夹里面去,老的文档下面用的是双引号，可能会不执行说引号没有关闭。需要修改为单引号。因为有些bash比较特殊，它会把#号认为是一个注释。如果用单引号就不是注释。
```
# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md
```
* 开始写作
```
# 开始写作
npx vuepress dev docs
```
* 这里出现了一个矛盾
* 就是我的vue-server-renderer和vue版本不一致，最后我都修改为2.6.10版本
```
npm i vue-server-renderer@2.6.10
```
* 接着继续，在 package.json 里加一些脚本:
```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
* 然后就可以开始写作了:
```
yarn docs:dev # 或者：npm run docs:dev
```
* 要生成静态的 HTML 文件，运行：
```
yarn docs:build # 或者：npm run docs:build
```
* 这里通过运行`npm run docs:dev`后，用ctrl+c关闭不了，需要通过ctrl+alt+delete关闭进程才可以。
* 然后我们跳到[基本配置](https://vuepress.vuejs.org/zh/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
* 在window里面的文档文件是README.md，在linux系统里面文档文件是window.md，在IOS系统里面文档文件是macOS.md
* 接着创建在vuepress目录里面创建config.js文件。内容为
```
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```
* 接下来在[默认主题配置里面找到侧边栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F)
* 然后[分组可以显示二级侧边栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E7%BB%84)
```
    themeConfig: {
        sidebar: [
            '/',
            //这里的install目录所以需要加斜杆。
            {
                title: '入门',
                children: [             '/install/',
                    // ['/get-started/','Explicit link text'],
                    //上面这句话是把/get-started/路径，但是名字按照Explicit link text显示
                    '/get-started/', ]
            },
            {
                title: '组件',
                children: [ '/components/button' ]
            },
        ]
    }
```
### 展示自己的组件
#### 先把button组件的HTML变量修改为SASS变量
* 为了引入之后可以使用变量，把HTML 变量修改为SASS变量
#### 增加组件代码
* [在 Markdown 中 使用 Vue](https://vuepress.vuejs.org/zh/guide/using-vue.html#%E5%9C%A8-markdown-%E4%B8%AD-%E4%BD%BF%E7%94%A8-vue)
* [使用组件](https://vuepress.vuejs.org/zh/guide/using-vue.html#%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6)
* 所有在 .vuepress/components 中找到的 *.vue 文件将会自动地被注册为全局的异步组件
***
* 这里我发现一个问题就是**没有安装sass-loader会不显示**，于是我安装了。一直不显示的这个bug我找了好久才发现。主要是通过比对老师的package.json内容发现我没有安装sass-loader，并通过安装sass-loader解决了。
```
$ npm i -D sass-loader
```
* 我安装完后显示的版本是`sass-loader@8.0.0`
* 另外发现button组件这里有一个错误，就是`:name="String('loading')"`，最外面还需要一个双引号。没有最外面的双引号还是会显示错误。
```
            <g-icon v-if="loadings" :name="String('loading')" class="loading-css icon"></g-icon>

```
* 还有另外一个问题，就是组件下面的Button一直不显示,也就是`title:Button`。最后自己突然间就好了。
```
title: Button
sidebarDepth: 2
```
***
* 


