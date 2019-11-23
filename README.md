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
* ![饥人谷二分法的图片](https://static.xiedaimala.com/xdml/image/3ac7c224-c23d-491f-84b5-4fabfbeab9b8/2018-7-30-18-52-49.png)
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
### 开始新建tabs组件写代码
* 首先**要知道子组件是不能修改父组件的任何值的**,可以通过父组件(比如class为app)来修改，这里的selectedTab是class为app的数据
#### vue的sync语法糖
* 这里用到的vue的[sync](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6),就是下面的带sync的是vue提供的语法糖，两者是等价的，注意绑定的事件是`update:selected`,它中间是有一个**冒号**
```
<!--    <g-tabs :selected="selectedTab" @update:selected="selectedTab=$event">-->
上面的原版写法，下面的是语法糖，上下两者等价
    <g-tabs :selected.sync="selectedTab">
```
* 因为前面绑定了updated:selected,那么需要通过vm.$emit()触发才可以实现
```
        created(){
                // this.$emit('update:selected','xxx')
        }
```
#### vm.$on和vm.$emit一起使用
* [vm.$on](https://cn.vuejs.org/v2/api/#vm-on)( event, callback )是和[[vm.$emit]((https://cn.vuejs.org/v2/api/#vm-emit))[eventName, […args]],后面(vm.$emit)的args就是前面传递给前面(vm.$on)里面的callback，vm.$on通过$event可以拿到这个args
* tabs里面的数据有direction方向。各个子组件里面有disabled,就是被禁用的
#### 具名slot插槽
* 在tab-header组件里面都是一样的
```
<template>
    <div class="tabs-head">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
<!--        所有的tabs-item的会出现在上面,其他的插槽会出现在下面-->
            <slot name=actions></slot>
    </div>
</template>
```
* 在父组件上有两种写法传入给子组件这个具名插槽的信息，
    * 老师用的是Vue[废弃的写法slot特性的具名插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%BA%9F%E5%BC%83%E4%BA%86%E7%9A%84%E8%AF%AD%E6%B3%95),使用**slot加等于号**
    ```
            <g-tabs-head>
                <template slot=actions>
                    <button>设置</button>
                </template>
                <g-tabs-item name="woman">
                    <g-icon name="setting"></g-icon>美女
                </g-tabs-item>
                <g-tabs-item name="finance" disabled>
                    财经
                </g-tabs-item>
                <g-tabs-item name="sports">
                    体育
                </g-tabs-item>
            </g-tabs-head>
    ```
    * 还有[最新的具名插槽写法](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)是用**v-slot加冒号**
    ```
                <g-tabs-head>
                    <template v-slot:actions>
                        <button>设置</button>
                    </template>
                    <g-tabs-item name="woman">
                        <g-icon name="setting"></g-icon>美女
                    </g-tabs-item>
                    <g-tabs-item name="finance" disabled>
                        财经
                    </g-tabs-item>
                    <g-tabs-item name="sports">
                        体育
                    </g-tabs-item>
                </g-tabs-head>
    ```
#### head和body分开就可以单独写class了,不会覆盖
* 在标签上面写一个class，然后这个组件也有class，那么他们两个class是不会互相覆盖，而是会一起出现的。[Vue的原话是当在一个自定义组件上使用 class 属性时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。](https://cn.vuejs.org/v2/guide/class-and-style.html#%E7%94%A8%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A)
* 比如在tabs-head组件里面有`class="tabs-head"`
```
    <div class="tabs-head">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
<!--        所有的tabs-item的会出现在上面,其他的插槽会出现在下面-->
            <slot name=actions></slot>
    </div>
```
* 然后g-tabs-head标签上有`class="bomber"`,那么最后结果是既有bomber也有tabs-head的class。
```
        <g-tabs-head class="bomber">

        </g-tabs-head>
```

* **并且只有两个属性是不会被覆盖的，一个是class，另一个就是style**，其他属性就会被覆盖。
### 依赖注入和eventBus
#### 普通的传值过程
* 一般爷爷组件传给各个父组件，然后父组件传给各个子组件是很好传值的。
* 两个兄弟关系的组件是没有办法通信的。这样就当item自己被点亮后，还需要通知兄弟组件的item关掉就很难办到。
* 亮了item后还需要通知body里面对应的pane，比如item里面的体育对应body里面的pane的体育相关资讯
* 还需要熄灭body里面之前已经亮起的pane。
* 最后还需要通知用户对应的时间update:selected里面的事件改变成了对应的item
* 完整的逻辑
    1. 亮item自己
    2. 熄灭之前item的兄弟
    3. 亮对应body里面的对应的pane
    4. 熄灭之前body里面对应的pane的兄弟
    5. 改变update:selected里面对应的事件
* 详细可以查看![饥人谷的图片](https://static.xiedaimala.com/xdml/image/3ac7c224-c23d-491f-84b5-4fabfbeab9b8/2018-7-30-18-56-56.png)
* 如果走单线去通知，就既需要通知父还需要通知爷，还需要通知各种兄弟，上下已经左边旁边关系很复杂。
#### 通过第三者——事件中心eventBus来传值
* 有的地方叫做eventHub，有的叫做eventBus。
* item出现了变化就直接通知事件中心，然后由于事件中心通知给各个需要通知的组件（其他所有组件及节点）。
* 很类似于一个发布订阅模式，就是谁订阅了就发布给谁。这比之前的单线通知错综复杂的关系要简单很多。因为这里只需要发布事件，然后其他所有组件订阅这个事件就好而来，对于代码来说简单很多。
* 这里需要用到[vue里面的事件中心](https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2)和[依赖注入](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5),依赖注入用到两个Vue的API——[provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)
* 如果不把provide放到data里面，只能除了自己的组件以外的其他组件通过inject访问，**但是如果把它放到data里面,那么自己也可以访问到这provide返回的值。**
```
        data(){
            return {
                eventBus:new Vue()
            }
        },
        //provide选项应该是一个对象或返回一个对象的函数
        provide(){
            return{
                eventBus:this.eventBus
            }
        },
```
* 另外这里注意通过控制台查this会看到一些下划线开头的属性，这些属性不要随便用，因为是私有属性，是给Vue作者使用的。**他是$对应的属性的引用**，$开头及没有前缀的才是给用户使用的。
* 一旦爷爷组件用到的provide,那么provide的返回的对象里面的key通过别的地方(**任何后代**)使用inject插入，就可以使用了。
* 因为有是三个孙子item，**所以会打出三个同一个eventBus的引用**
* 我们在body,head,pane,item里面都写上代码，就可以访问到了,这里只举例body的
```
        inject:['eventBus'],
        created() {
            console.log('传给body的eventBus')
            console.log(this.eventBus)
        }
```
* 这样我们点击的时候就可以通知所有人了。比如在item这里增加一个click点击事件,然后在item里面emit触发`update:selected`事件,emit触发需要绑定事件，就用到[on](https://cn.vuejs.org/v2/api/#vm-on)
```
        <template>
            <div class="tabs-item" @click="xxx">
        <!--        如果这里不用slot插槽，会被Vue自动删除-->
                <slot></slot>
            </div>
        </template>


        created() {
            this.eventBus.$on('update:selected',(xxxname)=>{
                console.log(xxxname)
            })
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name)
            //    这里emit触发了update:selected事件，并且把this.name传给了上面的$on绑定的事件，
            }
        }
```
* 我们需要在tab-pane组件上面同样监听这个`update:selected`事件，因为这个组件上面也有name的值，这个是是标签上面的name
#### 组件事件不会从子组件冒泡到父组件，并且注意this.$emit和this.eventBus.$event的区别
* **需要注意**，如果在父组件g-tabs上面绑定事件`update:selected`，如果子组件item触发这个事件，那么**不会执行父组件g-tabs上面的这个绑定事件`update:selected`，因为Vue组件是像原生JS那样冒泡的**
    * 如果在父组件g-tabs上面绑定事件`update:selected`，这个地方监听的对象也有不同。因为子组件item里面监听的是前面g-tabs组件创建的一个`new Vue()`对象。
    ```
            data(){
                return {
                    eventBus:new Vue()
                }
            },
    ```
    * 而如果在父组件的标签上面写上`@update:selected="xxx"`,比如下面，那么**它监听的是g-tabs这个Vue组件对象的事件**
    ```
        <g-tabs :selected.sync="selectedTab" @update:selected="yyy"></g-tabs>
    ```
    * 这两个对象(new Vue()对象和g-tabs组件对象)是不同的对象。
    * 在app.js里面增加一个事件,这里的aaa就是emit传入的参数
    ```
        methods:{
            yyy(aaa){
              console.log(aaa)
            },
    ```
    * 那么g-tabs组件上面的触发是不用通过eventBus，因为在组件里面this就是g-tabs组件，下面的代码就会触发yyy函数，然后打印出`我是this.$emit触发的事件出来的数据`,而`我是this.eventBus.$emit触发的事件出来的数据`是不会打印，因为并没有触发。
    ```
        created(){
                this.$emit('update:selected','我是this.$emit触发的事件出来的数据')
                this.eventBus.$emit('update:selected','我是this.eventBus.$emit触发的事件出来的数据')
        }
    ```
    * 同理如果在g-head，也就是g-tabs的直接子组件上面的`this.$emit`触发`update:selected`,也是不会**冒泡**到父组件g-tabs上面去触发`update:selected`这个事件的。
    * 当然你可以使用[$root](https://cn.vuejs.org/v2/api/#vm-root)来主动使他冒泡，但是并不推荐这样去做。
* 最后总结就是要注意：
    1. 事件是在**哪个对象上面触发调用的**，在哪个对象上面触发调用就是只能在那个对象上面监听事件。
    2. 在**Vue中事件不会冒泡**，在子标签上面触发的事件不会自动传到父标签上面触发

#### 小问题关于管道符号
* 老师视频里面有一个错误把竖直线当成或了,写成了`String|Number`，此处是一个手误（方方老师说把 TypeScript 语法乱入进来了），正确写法是 `[String, Number]`,而在Vue文档里面用到很多**管道符竖直线**，但是大部分都是类型里面用到的。Vue中真正的管道符是[过滤器](https://cn.vuejs.org/v2/guide/filters.html),新旺老师在答疑群里面说道**类型 一般默认 一条线**
* 经过测试，发现写成下面两种方式(数组形式及竖线管道形式)都不会报错
```
          name:{
              type:[String,Number],
              // type:String|Number,
              required:true
          }
```
### 为什么一个new Vue()可以构造事件中心eventBus
* 这个其实在前面有链接也说明过,就是[Vue的事件中心](https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2),因为`var eventHub = new Vue()`,他就可以在组件中，可以使用 $emit, $on, $off 分别来触发、监听、取消监听事件,也就是说**一个对象可以$emit, $on, $off这三种接口,就可以当做事件中心,刚好new Vue()返回的对象全部都可以满足**,为什么要用它的原因就是单纯的知识它刚好也有这三个接口,其他的功能不需要使用。这就是为什么一个new Vue()就可以变成事件中心eventBus。因为行为完全一样。
* 如果你把这个eventBus不写成`new Vue()`,而写成this，也就是某个组件的对象，那么就不是隔离的对象，触发一个事件，外面也会知道,就会有影响。所以需要一个新的并且可以跟外界隔离的eventBus,尽量不要混在一起。
### 写CSS样式和实现切换Tab
***
* 用webStorm的小技巧，如果在CSS需要模糊搜索，这样就可以写出开头就可以自动提示你想要的代码，通过设置里面查询emmet然后对应的CSS里面勾选enable fuzzy search among CSS abbreviations，不仅支持emmet，还支持模糊搜索。然后第四个的auto insert css vendor prefix可以取消掉，因为现在已经不需要使用前缀的CSS代码啦。
***
* 这里用到[flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)和[flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)
    * flex-shrink是收缩规则，默认是1，也就是按照一倍的收缩,也就是自身大小宽度收缩，但是不会收缩小于字体内容宽度。如果写成0，它就不收缩了。就会变宽，如果字体太多就会超过它本身的宽度。**如果记不住，可以记住压抑，就是压缩为默认1**。
    * flex-grow是拉伸因子，默认是0，也就是0倍的拉伸，也就是不拉伸，就算设置无限大，它的拉伸也不会超过自己字体宽度或者所设定的宽度。**如果记不住，可以记住拉链，就是拉伸为默认0**。
* tabs-item的宽度最高不要太宽，并且使固定的。可以参考ant.design上面就是都靠左，那么就可以使用`justify-content: flex-start;`,**但是它会被tabs-item的`flex-grow:1`覆盖**，所以需要把`flex-grow:1`变成默认的`flex-grow:0`,也就是默认的0
* 然后我们需要把设置放到最右边去，**因为slot上面是不能用class**，所以需要增加一个div
```
        <div class="actions-wrapper">
            <slot name=actions></slot>
        </div>
```
* 靠右边可以通过margin来调整
```
        > .actions-wrapper{
            margin-left:auto;
        }
```
#### 为什么margin-left:auto可以靠右边
* 因为`'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' +'border-right-width' + 'margin-right' = width of containing block`
***
* **也就是在上述等式中，只有你设置的`margin-left: auto`,那么margin-left将会被设置为满足上述等式，而等式的右边是容器盒子宽度，等式中的其它值(除过width)都为0，因此margin-left = width of containing block - width(div)**,所以相当于`margin-left:整个容器的宽度`,详细可见[margin-left: auto;为什么可以使元素靠右](https://blog.csdn.net/gooodi/article/details/87110820)
***
#### 实现切换Tab显示相应的信息
* class=一个函数，整个函数的返回值是一个true or false，然后判断name来实现true和false的切换就实现了Tab切换。
* 首先需要一个激活active来存储true或者false,激活了就出现或者高亮某个，不激活的就保持原样。但是**这个激活的active应该放在date里面还是props里面呢**？
    * 如果你需要用户传(这个用户是指前端开发者)值给你，那么就需要用props，因为他是需要在自定义组件的**标签上面用属性来传值的**，因为props是你的输入参数，就比如一个函数的参数
    * 而data是内部的声明的局部变量，**不需要用户传值**，
    * 比如看下面的props1,props2,data1,data2，props相当于参数，data相当于局部变量，组件其实就是一个函数
    ```
    function(props1,props2){
        var data1
        var data2
    }
    ```
    * 而我们这里就使用data，因为不需要用户主动传值。
* 那么data里面的active代码就是
```
        data(){
          return {active:false}
        },
```
* 我们在tabs.vue组件里面**初始**触发($emit)把选中的selected传给绑定($on)事件,这里需要mounted，因为只有mounted才会使得所有子组件都生成了，然后把this.selected传给了`this.eventBus.$on`
```
        mounted(){
                //下面是初始选中的selected
                this.eventBus.$emit('update:selected',this.selected)
        }
```
* 然后在item和pane组件里面的`this.eventBus.$on`接受传过来的值,通过**当前的name和传过来的参数进行对比是否相等我们就知道谁被选中了**
```
        created() {
            this.eventBus.$on('update:selected',(xxxname)=>{
                if(this.name===xxxname){
                    console.log(`我${this.name}被选中了`)
                }
                else{
                    console.log(`我${this.name}没被选中了`)
                }
            })
        },
```
* 把active的值作为一个class,用计算属性通过active来操作这个class的truthiness。
```
    <div class="tabs-item" @click="xxx" :class="classes">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
    
    computed: {
        classes() {
            return{active:this.active}
        }
    },
```
* **一共有三个item组件和三个pane组件**，这样选中了的item或者pane就可以把item和pane组件里面的active变成true，没有选中的item或者pane就是 false,true就会加上这个绑定class的对象里面的属性作为class名字，false就不会加上这个class。
```
            this.eventBus.$on('update:selected',(xxxname)=>{
                if(this.name===xxxname){
                    this.active=true
                }
                else{
                    this.active=false
                }
            })
```
* 给class为active的增加CSS颜色来显示
```
        &.active{
            background: red;
        }
```
* 然后当item的某一项被**点击事件触发的时候**，会触发($emit)把选中的selected传给绑定($on)事件,我们在item组件里面写上xxx方法对应的把`this.nama`传给`this.eventBus.$on`绑定事件的参数
```
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name)
            }
        }
```
#### 不仅选中的组件背景颜色高亮，还需要没被选中的隐藏掉
* 就可以用到[v-if](https://cn.vuejs.org/v2/guide/conditional.html#v-if)
* 我们只需要在pane组件里面加上下面代码就可以实现了,只要有active的表达式返回 truthy 值的时候被渲染,返回false就不渲染。
```
<template>
    <div class="tabs-pane" :class="classes" v-if="active">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
```
#### 简化生成新文件代码的小技巧
* 新生成的文件可以初始化你写的代码，通过webStorm,当你新建一个vue文件，命名写一个x，那么就是在name里面写上为x
```
<script>
    export default {
        name: "x"
    }
</script>
```
* 加更多的初始化代码，可以在设置->File and Code template(文件和代码模板)里面增加
#### 小结
* 首先分析了需求并做了个5个tab用到的组件
    * tabs.vue组件里面
        1. props里面的selected——可以双向同步。
        2. props里面的direction——可以用来切换方向。
        3. 创建一个new Vue()，把它作为事件中心eventBus来provide给其他组件。
        3. emit(触发)一个update:selected事件，并传参数this.selected
    * tabs-head里面没有参数，只有一inject然后触发emit做测试用。目前主要用来做HTML结构的组件。
    * tabs-item里面
        1. props里面的disabled——禁用
        2. props里面的name，是必须要组件标签传值过来的，这里是必须写的。
        3. 它有一个计算值active
        4. 内部绑定了一个click事件
        5. data里面是否被激活active
    * pane和item激活一样
    * body和head几乎一样
* 然后这些组件都在created里面绑定了`update:selected`事件
```
this.eventBus.$on('update:selected',()=>{}
```
#### 不能随便修改props里面的属性的值
* 不能随便修改props里面的属性的值，不然会报错,比如我主动修改props里面的name
```
        created() {
            this.eventBus.$on('update:selected',(xxxname)=>{
                // 下面的代码可以用webStorm优化，但是我这里为了自己以后看明白就不优化了
                if(this.name===xxxname){
                    this.active=true
                }
                else{
                    this.active=false
                    //下面的代码我主动把传过来的参数xxxname赋值给当前的name，就会报错
                    this.name=xxxname
                }
            })
        },
```
报错如下，大概的意思就是避免直接改变属性
```
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "name"
```
* 相当于写一个函数,把接受的参数修改为别的值，原生的代码虽然没有大问题，但是我们坚持原则就是不要改，所以在Vue里面是默认不能修改，一旦修改了会直接报错。所以框架是提供给团队使用，计算水平很烂的程序员也不会也出比较不好维护的代码，因为一旦你写了不好的代码就直接报错，你就没有办法继续写代码了。要把报错修复才可以继续写代码。这样就可以保证代码的平均质量。
```
 function(obj){
    obj.a//修改这个对象里面的key为a对应的值
    return obj
 }
```
#### 好的框架的说明
* 目前vue能够提供这种提高代码平均质量的不够多，它只能算作变成框架的途中。真正的算作框架的应该是[angular](https://angular.io/)，因为**它强制要求你[测试](https://angular.io/guide/testing)，不测试就不让你发布。并且该怎么写代码都给了你非常主观的推荐,它对测试用了非常大的说明来给你介绍，基本上告诉你每一行代码应该怎么写**
### 优化样式
#### 增大item的可点击区域
* **可交互区域比较小**,文字上面和下面点击不到，必须要点击到中间的位置才可以实现click事件交互。因为里面的内容的高度要小于父元素的高度，所以小于的部分就点击不到了，那么就把里面的元素设置告诉为100%,增加display和align-items居中。
```
<style scoped lang="scss">
    .tabs-item{
        flex-shrink:0;
        padding:0 1em;
        cursor: pointer;
        height:100%;
        border:1px solid blue;
        display: flex;
        align-items: center;
        &.active{
            background: red;
        }
    }
```
* 接着增加样式做的和ant.design一样的样式，就是白底黑字，当active的时候就字体变成蓝色字体，同时下面有一条蓝色的线，切换tab的时候，这个下面的线会跟着字体滑动。
* 这里我们需要传入两个参数，提供给tabs.vue组件初始化的时候及在tab-item点击事件触发的时候使用。第二个参数就这个元素的位置。然后才可以通过获取位置来改变相应的下划线的位置。
* 这里需要用到原生的[getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)获取对应视口的位置。**但是这里要找到selected选中的和item一样的name的对应的组件的信息**,这里通过检查name(这个name是最开始的那么,比如GuluTabs)通过[$options.name](https://cn.vuejs.org/v2/api/#name)获取到。
* 在tabs组件里面初始化的时候，因为需要找到它的子组件的组件，所以第二个参数要找到它，代码相对复杂一点
```
        mounted(){
                //下面是初始选中的selected
            this.$children.forEach((x)=>{
                //第一次循环，因为有两个子组件，一个是head一个是body
                if (x.$options.name === 'GuluTabsHead') {
                    x.$children.forEach((item) => {
                        //第二次循环，因为有三个子组件都是item,但是name不一样。然后找到它的options里面的name和它props里面的name就找到对应的子组件了props可以省略。比如item.name
                        if (item.name === this.selected && item.$options.name === 'GuluTabsItem') {
                            this.eventBus.$emit('update:selected', this.selected, item)
                        }
                    })
                }
            })
        }
```
* 在item.vue组件里面被点击的元素就是自己，也就是第二个参数是this传值过去。
```
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name,this)
            //    这里emit触发了update:selected事件，并且把this.name传给了上面的$on绑定的事件，
            }
        }
```
* 然后在head.vue组件里面通过`vm.$el.getBoundingClientRect()`获取到它的宽度和距离左边的距离,赋值给line的宽度和距离左边的距离就可以啦,这里用到[ref](https://cn.vuejs.org/v2/api/#ref)
```
        mounted(){
            this.eventBus.$on('update:selected',(name,vm)=> {
                let {width,height,top,left}=vm.$el.getBoundingClientRect()
                this.$refs.line.style.width=`${width}px`
                this.$refs.line.style.left=`${left}px`
            })
        }
```
* 然后在head.vue组件里面给line增加CSS为transition的**动画**
```
    .tabs-head{
        > .line{
            position:absolute;
            bottom:0;
            border-bottom:1px solid $blue;
            transition: all 350ms;
        }
```
#### 用left还是transform(这里最后老师没有去完成)
* 前面我们用到left,但是如果使用transform还可以支持硬件3D加速，left是不能做3D加速。为了速度可以把left改成transform。
```
    this.$refs.line.style.transform=`translateX(${left}px)`
```
* 但是前面已经修改了宽度width，所以加速与否都无所谓，都会很慢
* 但是把left变为transform之后会使得一开始会从最左边滑进来，如果不想要这个最开始的滑动可以把CSS也设置为一样的距离左边的距离,因为我们可以获取到left的值是127px，所以直接就可以写到CSS里面,这样就不会出现一开始的滑动了。
```
        > .line{
            position:absolute;
            bottom:0;
            border-bottom:1px solid $blue;
            transform:translateX(127px);
            transition: all 350ms;
        }
```
* 老师这里用到的是v-if设置为true或者false来使他刚开始隐藏。v-if会控制div是否会显示在DOM里面。当他由false变成true的时候，会新增一个更新UI任务到任务队列。所以还需要用到nextTick函数，因为渲染之后line就消失了，所以取不到对应的line的信息，所以需要使用nextTick把获取line信息的代码放到队列的最后，但是还是**存在滑动**
```
<template>
    <div class="tabs-head">
        <slot></slot>
<!--        v-if会控制div是否显示在DOM里面-->
        <div ref="line" class="line" v-if="x"></div>
        <div class="actions-wrapper">
            <slot name=actions></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsHead',
        inject:['eventBus'],
        data(){
            return {
                x:false
            }
        },
        mounted(){
            this.eventBus.$on('update:selected',(name,vm)=> {
                this.x=true
                //新增一个'更新UI任务'到任务队列里面
                this.$nextTick(()=>{
                    //新增一个函数，放到任务队列里面，由于this.x=true是先放进去的，所以这里比他靠后，这样就能获取到line，就不会显示undefined了
                    let {width,height,top,left}=vm.$el.getBoundingClientRect()
                    this.$refs.line.style.width=`${width}px`
                    this.$refs.line.style.transform=`translateX(${left}px)`
                })
            })
        }
    }
</script>
```
* 因为最后测试还是存在一开始的滑动，所以老师放弃了使用transform,还是使用left。
#### chrome浏览器的一个小数问题
* 我这里通过`vm.$el.getBoundingClientRect()`返回的数值保留了小数点后很多位，我不知道为什么，我在JSbin上用原生代码可以是一个整数，在edge浏览器上显示的也是一个整数
***
* **目前这个问题我解决不了，就先不解决了**
***