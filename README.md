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
    2. 在Vue中事件不会冒泡，在子标签上面触发的事件不会自动传到父标签上面触发

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
