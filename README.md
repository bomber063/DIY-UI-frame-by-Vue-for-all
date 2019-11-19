## tabs组件
### 问题解答
#### github的警告提示
* git hub上有一个警告，内容为发现了一个潜在安全隐患在你的依赖（第三方库）里面
```
We found a potential security vulnerability in one of your dependencies
```
* 这么说的意思，可以推测部分依赖可能存在某种**病毒**,可以搜索到阮一峰的推特上面在**2018年7月13日**有说道ESLint的两个组件库的npm账户被窃，注入了恶意代码。会偷窥用户的`.npmrc`文件，里面包含用户发布到npm的token,为了这件事,npm把所有token都作废了。
* 这个`.npmrc`文件里面会有一些npm的publish的token,只要别人拿到这个token就可以伪装是真正的发布者来发布这个包。
* 一般可以点击Review vulnerable dependency进去看看，如果你也不知道，或者看不懂，就点击Dismiss忽略掉就好了。
#### cnpm问题
* 建议卸载掉cnpm,因为这个库的维护已经不是很活跃了。直接用npm就可以了，但是npm在大陆比较慢，但是之前有说过[可以设置淘宝的源](https://github.com/bomber063/DIY-UI-frame-by-Vue)可以解决这个问题。
* 为什么放弃cnpm，可以查看这篇文章——[是时候放弃用 cnpm 命令了](https://cnodejs.org/topic/552212ba01b6c9310d8e9959)
#### npm和yarn
* 如果一个项目里面最好只用一个，不要npm和yarn混着用，可能会出问题。
#### windows的&&命令不支持
* 就是package.json里面的test里面的用到一个`&`符号。它是让前面的一个命令`parcel watch test/* --no-cache`运行后保持在后台，然后同时运行后面的命令`--no-cache & karma start`。但是windows不支持这个符号
```
    "dev-test": "parcel watch test/* --no-cache & karma start",
```
* [解决的方案前面也说过了](https://github.com/bomber063/DIY-UI-frame-by-Vue),就是
    * 将 dev-test 对应的命令 parcel watch test/* --no-cache & karma start 分别运行，运行方式如下
    * 新开一个 Git Bash 窗口运行 npx parcel watch test/* --no-cache
    * 再开一个 Git Bash 窗口运行 npx karma start
#### vue有什么好的文章推荐
#### 这里我发现我的分支名字错了用下面命令修改分支名字
```
git branch -m old_branch new_branch # Rename branch locally 
git push origin :old_branch # Delete the old branch 
git push --set-upstream origin new_branch # Push the new branch, set local branch to track the new remote
```
* **注：红色为标注！不需要键入！**
* 具体见[文章——git-更改本地和远程分支的名称](https://www.cnblogs.com/wangzhichao/p/git.html)
* 看Vue官网就好了
### 解决前面的toast组件的一个bug
* 其实在前[面我自己已经发现并解决了](https://github.com/bomber063/DIY-UI-frame-by-Vue-for-all/tree/toast)，这里在说一下吧
* 报错error是`Cannot read property 'style' of undefined`,具体是在toast组件里面method的updateStyles函数
```
        updateStyles(){
            this.$nextTick(()=>{
                this.$refs.line.style.height=`${this.$refs.toast.getBoundingClientRect().height}px`
            })
        },
```
* 也就是`this.$refs.line.style`这里的style前面的对象是undefined。
* 这里老师主要讲了**是二分法来找到这个bug的地方，因为是测试的时候出错，所以报错代码肯定是在测试代码里面，那么就值显示一条测试代码通过二分法找。我是直接通过app.js里面写测试在浏览器上面看到红色报错信息的**，都可以
* 通过在mounted里面打出`console.log(this.$el.outHTML)`发现是有line的,但是在`$nextTick`之后打出来`console.log(this.$refs)`发现已经没有line了，所以说明在这两者之间就导致line不见了，或者被关闭了.然后再测试代码里面可以看到mount之后马上click关闭了,问题就在这里。
```
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text:'你好',
                        callback
                    }
                }
            }).$mount()
                let text=vm.$el.querySelector('.close').textContent.trim();
                expect(text).is.equal('你好');
            //    下面的点击之后就会触发toast.vue中的onClickClose事件和close事件
                vm.$el.querySelector('.close').click()
```
* 这里的原因就是**nextTick之前就已经把整个组件关闭掉了或者把这个line关闭掉了**，所以不可以马上用click事件点击，在click这里需要延迟一会再去点击，所以把这里增加一个延迟函数setTimeout即可解决了
```
        it('接受closeButton,这里老师写的，没有用异步,同时也测试了onClickClose事件和close事件', () => {
            //此方法在app.js里面测试会报错 Cannot read property 'style' of undefined,也就是updateStyles函数报错，可能是因为获取不到这里的style吧
            const callback=sinon.fake()
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text:'你好',
                        callback
                    }
                }
            }).$mount()
                let text=vm.$el.querySelector('.close').textContent.trim();
                expect(text).is.equal('你好');
            //    下面的点击之后就会触发toast.vue中的onClickClose事件和close事件
                vm.$el.querySelector('.close').click()
                expect(callback).to.have.been.called
        })
```
* 修改为
```
        it('接受closeButton,我自己用异步的方式，同时也测试了onClickClose事件和close事件。这个方法在app.js里面测试不报错', (done) => {
            const callback=sinon.fake()
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text:'你好',
                        callback(){},
                    }
                }
            }).$mount()
            let text=vm.$el.querySelector('.close').textContent.trim();
            // setInterval(()=>{//因为在toast里面的updateStyles方法是延迟的，所以这里也必须要延迟，不然会报错
            expect(text).is.equal('你好');
            setTimeout(()=>{
            //    下面的点击之后就会触发toast.vue中的onClickClose事件和close事件
            vm.$el.querySelector('.close').click()
            expect(callback).to.have.been.called
            },0)
            done()
        });
```
### 需求分析
* 每次写轮子之前考虑四个问题
    1. 需求分析
    2. UI
    3. 代码
    4. 测试
* 少了某一项可能都会导致问题。
* 效果大概就是有一行是一些标题，比如美女，财经，新闻，体育等，点击某一行标题后会显示响应的标题内容。
* 用例的功能可以参考（抄）业界的其他框架的UI和功能，因为软件工程里面最好是把轮子做的和业界大概相似，不要相差太远，**这是为了减少用户的学习成本**，比如可以借鉴[ant.design的tabs](https://ant.design/components/tabs-cn/)及[framework7](https://framework7.io/)
    * ant.design的tabs
    1. 可以切换tab
    2. 可以禁用某个按钮(这个功能可以直接隐藏，当然也可以设置禁用)
    3. 在tab上面增加一个icon
    4. 横竖切换方向（CSS的问题）
    5. 增加一个额外的按钮（可以在页签右边添加附加操作）
    * 下面的就暂时不做
    6. 调节字体大小
    7. 调节tab的位置
    8. 添加和删除tab
    9. 等等
    * framework7里面基本都是在手机端的，都是在最下面显示。
    1. Static Tabs
    2. Animated Tabs
    3. Swipeable Tabs(可以用鼠标拖动)
    4. Routable Tabs（路由模式）
* UI就可以用ant.design的，就是点击后按钮下面会有一个蓝色或者其他颜色的横条，然后tab也是这种颜色。然后切换的时候跟着一起动
#### 其他人如何使用这个组件
* element的写法是
```
    <g-tabs>
        <g-tabs-item laber="美女">
            <div>美女相关资讯</div>
        </g-tabs-item>
        <g-tabs-item laber="世界杯">
            <div>世界杯相关资讯</div>
        </g-tabs-item>
    </g-tabs>
```
* 增加一个icon的写法
```
    <g-tabs>
        <g-tabs-item>
            <template>
                <g-icon>
                </g-icon>
                美女
            </template>
            <div>美女相关资讯</div>
        </g-tabs-item>
        <g-tabs-item laber="世界杯">
            <div>世界杯相关资讯</div>
        </g-tabs-item>
    </g-tabs>
```
* **但是如果想在tab上面增加一个背景颜色就不好实现了**。因为没有地方可以增加了。因为tab-item既包括上面的标题也包括下面的内容。
* 更形象的一点就看下面
    * g-tabs下面结构
    1. g-tabs——g-tabs-item
    2. g-tabs——g-tabs-item
    3. ......
#### 我们要做的的结构
* g-tabs下面结构,这样nav就和content分开了，就可以单独给nav设置颜色
1. g-tabs——nav
    1. g-tabs——nav-item-1
    2. g-tabs——nav-item-2
2. g-tabs——content
    1. g-tabs——content-pane-1
    2. g-tabs——content-pane-2
* 这样如果我想在nav上面增加一个背景色，只需要在nav上面写一个class然后用 style实现red就好了
* 虽然这样**结构更加清晰，但是代码相对复杂**,同时需要在使用item的时候给一个name,默认选中（激活）哪一个需要在tabs上面用selected表示
* 总体结构如下：
```
<!--//tab1被激活-->
<g-tabs selected="tab1">
    <g-tabs-nav>
        <g-tabs-item name="tab1"></g-tabs-item>
        <g-tabs-item name="tab2"></g-tabs-item>
    </g-tabs-nav>
    <g-tabs-content>
        <g-tabs-pane name="tab2"></g-tabs-pane>
        <g-tabs-pane name="tab1"></g-tabs-pane>
    </g-tabs-content>
</g-tabs>
```