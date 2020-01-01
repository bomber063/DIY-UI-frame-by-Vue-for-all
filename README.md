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
##### 解决的bug1,没有安装sass-loader
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
* 把显示的效果的代码列在对应的组件下面用[code标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/code),并结合用[pre标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre),具体区别可以查看[code和pre竟然有区别！！！！](https://www.cnblogs.com/can-i-do/p/8497131.html).
##### 解决的bug2,用到ClientOnly
* 接着为了部署一个网站给别人观看，需要`"docs:build": "vuepress build docs"`,也就是
```
npm run docs:build
```
* 但是运行会报错如下
```
Rendering page: /components/button.html[Vue warn]: Failed to resolve async component: () => __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, 210))
Reason: ReferenceError: window is not defined
error Error rendering /components/button.html: false
undefined
Error: render function or template not defined in component: button-demos
    at normalizeRender (D:\jirengu\github收集\gulu-demo-for-all\node_modules\vue-server-renderer\build.dev.js:8247:13)
    at renderComponentInner (D:\jirengu\github收集\gulu-demo-for-all\node_modules\vue-server-renderer\build.dev.js:8397:3)
    at renderComponent (D:\jirengu\github收集\gulu-demo-for-all\node_modules\vue-server-renderer\build.dev.js:8368:5)
    at resolve (D:\jirengu\github收集\gulu-demo-for-all\node_modules\vue-server-renderer\build.dev.js:8436:9)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! gulu-bomber-1-1@0.0.3 docs:build: `vuepress build docs`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the gulu-bomber-1-1@0.0.3 docs:build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```
* 我把下面代码注释掉就可以不报错了
```
    //import Button from '../../../src/button'

    export default {
        components:{
            // gButton:Button
            // 'g-button':Button
        },
```
* 这个报错出现在vue-server-renderer,并不是平常使用的Vue的浏览器的方法，是不是因为这个组件是浏览器的方法，但是它这里用到的是vue-server-renderer方法来renderer。
* 通过google查询这个error，发现[Custom component vuepress CLI build error: render function or template not defined in component #844](https://github.com/vuejs/vuepress/issues/844)解决方案。
* 并且在[vuePress文档中也有响应的说明——浏览器的API访问限制](https://vuepress.vuejs.org/zh/guide/using-vue.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84-api-%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6),这里说到**简而言之，请确保只在beforeMount或者mounted访问浏览器/ DOM的API。**很有可能没有在这个期间方位这个DOM的API。
* SSR (Server-Side Rendered) ，文档还说了，如果您正在使用，或者需要展示一个关于SSR的方法，那么您可以将其封装在内置的`<ClientOnly>`组件中
* 因为报错信息显示在button-demos这个组件报错。有可能是还没进入到这个组件就报错了。
```
Error: render function or template not defined in component: button-demos
```
* 所以需要放到button.md的这个组件的最外面,也就是进入button-demos这个组件的外面。就可以正常运行`npm run docs:build`了.
```
    <ClientOnly>
<button-demos></button-demos>
    </ClientOnly>
```
* 小结解决该问题的过程
    1. google
    2. 删除代码再测试
    3. 得到能够用的版本后增加代码，没加一些代码运行一次，知道从不报错到报错位置就知道哪行代码导致的bug报错。
    4. 发现问题在import Button这里
    5. 在vuePress文档里面看到，请确保只在beforeMount或者mounted访问浏览器/ DOM的API。如果在之外的钩子里面访问这些DOM的API会被限制，但是可以通过增加代码解决。比如您正在使用，或者需要展示一个关于SSR的方法，那么您可以将其封装在内置的<ClientOnly>组件中
* 运行`npm run docs:build`之后你就可以在下面目录会产生一个index.html文件啦
```
success Generated static files in docs\.vuepress\dist.
```
### 接下来github页面部署
* [部署](https://vuepress.vuejs.org/zh/guide/deploy.html#%E9%83%A8%E7%BD%B2)
* 首先VuePress以本地依赖的形式被安装到你的项目中，并且配置了如下的npm脚本：
```
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```
* 增加base
    * 在`docs/.vuepress/config.js`中设置正确的base。
    * 如果你打算发布到`https://<USERNAME>.github.io/`，则可以省略这一步，因为交替base即是`"/"`。
    * 如果您打算发布到`https://<USERNAME>.github.io/<REPO>/`（确实你的仓库在`https://github.com/<USERNAME>/<REPO>`），则将base设置为`"/<REPO>/"`。
* 我的base仓库名字是DIY-UI-frame-by-Vue-for-all,所以增加为
```
    base:'/DIY-UI-frame-by-Vue-for-all/',
```
* 接着你的项目中，创建一个如下的deploy.sh文件（请自行判断有仓库名字和没仓库名字的选择其中一个，注释另一个）：
```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```
* 我的用户名是bomber063，仓库名字为DIY-UI-frame-by-Vue-for-all，我直接修改为如下,
```
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:bomber063/DIY-UI-frame-by-Vue-for-all.git master:gh-pages
```
* 如果是window用户可以直接运行了，如果是IOS苹果用户需要运行一个可行执行权限的命令如下,+x就是增加可执行权限的意思。
```
chmod +x deploy.sh
```
* 然后运行下面命令即可
```
./deploy.sh
```
* 然后会创建一个新的分支，名字为gh-pages
```
 * [new branch]      master -> gh-pages
```
* 然后你就可以在你的仓库里面点击settings，在GitHub Pages里面选中对应的gh-pages分支，就可以显示出预览页面了。
* 另外你运行下面命令后产生的目录变成了`http://localhost:8080/DIY-UI-frame-by-Vue-for-all/`
```
npx vuepress dev docs
```
### 补充其他组件及消除展示代码空隙
* 我们在目录`doc/componets/`里面运行下面命令创建其他组件
```
 touch input.md grid.md layout.md popover.md tabs.md toast.md
```
* 接着在config.js里面创建对应的路径
```
    {
        title: '组件',
        children: [
            '/components/button',
            '/components/grid',
            '/components/input',
            '/components/layout',
            '/components/popover',
            '/components/tabs',
            '/components/toast',
        ]
    },
```
* 消除展示代码空隙,用[replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)结合[正则的方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
* 比如， /Chapter (\d+)\.\d*/ 解释了额外转义的和特殊的字符，并说明了这部分pattern应该被记忆。它精确地匹配后面跟着一个以上数字字符的字符 'Chapter ' (**\d 意为任何数字字符，+ 意为1次以上**)，跟着一个小数点（在这个字符中本身也是一个特殊字符；小数点前的 \ 意味着这个pattern必须寻找字面字符 '.')，跟着任何数字字符0次以上。 (\d 意为数字字符， * 意为0次以上)。另外，插入语也用来记忆第一个匹配的数字字符。
  
  此模式可以匹配字符串"Open Chapter 4.3, paragraph 6"，并且'4'将会被记住。此模式并不能匹配"Chapter 3 and 4"，因为在这个字符串中'3'的后面没有点号'.'。
  
  括号中的"?:"，这种模式匹配的子字符串将不会被记住。比如，(?:\d+)匹配一次或多次数字字符，但是不能记住匹配的字符。      
* \d	
  * 匹配一个数字。等价于[0-9]。
  * 例如， /\d/ 或者 /[0-9]/ 匹配"B2 is the suite number."中的'2'。
* 正则表达式有四个可选参数进行全局和不分大小写搜索。这些参数既可以单独使用也可以一起使用在任何顺序和包含正则表达式的部分中。比如g代表全局搜索。
* 用到[trim](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)，trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。
* \t	
    * 匹配一个水平制表符 (U+0009)。也就是Tab键产生的符号。
* ^	
    * 匹配输入的开始。如果多行标志被设置为 true，那么也匹配换行符后紧跟的位置。
  
    * 例如，/^A/ 并不会匹配 "an A" 中的 'A'，但是会匹配 "An E" 中的 'A'。
  
    * 当 '^' 作为第一个字符出现在一个字符集合模式时，它将会有不同的含义。反向字符集合 一节有详细介绍和示例。
* \s	
    * 匹配一个空白字符，包括空格、制表符、换页符和换行符。等价于[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]。
  
    * 例如, /\s\w*/ 匹配"foo bar."中的' bar'。
* button-demos.vue代码修改及增加部分
```
        <pre><code>{{content}}</code></pre>
...
        data() {
            return {
                content: `
                <g-button>默认按钮</g-button>
                <g-button icon="setting">默认按钮</g-button>
                <g-button :loadings="true">默认按钮</g-button>
                <g-button disabled >默认按钮</g-button>
            `.replace(/\t+| +/g, '').trim()
            }
        }
```
* 每次修改之后需要运行一下下面命令更新和部署github页面的分支信息。
```
./deploy.sh
```
### 如果需要放到其他的仓库
* 可以把`/docs/.vuepress/dist/`目录下面的内容拷贝过去即可，还需要注意修改config.js里面的base。
### 最后再次借用饥人谷的图片总结
* 第一部分内容就是各个轮子的总结
* ![](https://static.xiedaimala.com/xdml/image/3ac7c224-c23d-491f-84b5-4fabfbeab9b8/2018-8-11-1-50-36.png)
* 第二部分内容就是用[vuePress](https://vuepress.vuejs.org/zh/)把我们的文档不仅本地可以搭建，而且可以放在远程仓库搭建起来。这个其实react也有响应的搭建的东西(名字具体不记得了)。是react先出，然后Vue觉得不错，就自己也出了一套vuePress。
* 第三部分就是解决前面几次BUG的过程了。



