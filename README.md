## popover组件
### popover是什么
* 我们通过[ant.design的popover](https://ant.design/components/popover-cn/)可以看到，他是点击一下就弹出一个气泡卡片。
* 通过[element](https://element.eleme.cn/#/zh-CN/component/popover)也是一样，通过点击或者hover可以弹出一个气泡卡片。一个小细节：**我们通过点击可以看到新增的气泡卡片并不在组件上，而是在body元素的最下面，这是为啥，可以接着往下看**。
### 需求
* 可以hover可以click激活。激活之后会显示一些复杂的气泡内容。点击之后出现一个按钮。
### 第一种方法（这种方式最后无法完成我们的需求，只做学习使用，不推荐）
* 首先我们知道通过下面两句话其实就可以实现popover的组件的功能，通过v-if和click点击就弹出上面的div。**所以popover组件的重点是在写CSS样式上面**
```
        <div v-if="x" class="xxx"></div>
        <button @click="x=true">点我</button>
```
* 所以使用本轮子的用户不需要写class，组件帮你搞定这个class的样式，**所以popover说到底就是一个CSS组件**.
* 我们可以让用户不写@click和v-if,然后让div和button两个元素产生关联。有两种方式
    1. 把这两个元素作为popover的子元素。
    ```
        <g-popover>
            <div v-if="x" class="xxx"></div>
            <button @click="x=true">点我</button>
        </g-popover>
    ```
    * 简单的一句话可以直接写到popover上面的一个变量上面比如content。如果是复杂的组件需要用到两个插槽slot来代替.我们这里就直接考虑复杂的情况，就是两个插槽
    * 可以写成下面的样式，默认的没有slot的（就是slot="default"）的可以省略掉template。
    ```
        <g-popover>
            <template slot="content">
                <div></div>
            </template>
    <!--   下面的不写slot就是默认slot="default，可以省略掉template"-->
            <template>

                <button>点我</button>
            </template>
        </g-popover>
    ```
    * [占默认插槽的缩写语法](https://cn.vuejs.org/v2/guide/components-slots.html#%E7%8B%AC%E5%8D%A0%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E7%9A%84%E7%BC%A9%E5%86%99%E8%AF%AD%E6%B3%95),**注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确**
    ```
    <!-- 无效，会导致警告 -->
    <current-user v-slot="slotProps">
      {{ slotProps.user.firstName }}
      <template v-slot:other="otherSlotProps">
        slotProps is NOT available here
      </template>
    </current-user>
    ```
    2. 另一个方式就是通过指令来传值,不过指令一般用到很少，以后在复杂的组件中在详细说明
    ```
        <div ref="xxx"></div>
        <button v-popover="$refs.xxx"></button>
    ```
* 这里的创建一个popover组件，组件里面的样式的display用inline-block，那么如果有两个popover组件就不是在一行并列排布，而是分成两行排列。这样的效果并不好。
* 下面就是我们初始创建的popover组件代码
```
<template>
    <div class="popover" @click="xxx">
        <div class="content-wrapper" v-if="visible">
        <slot name="content"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluPopover",
        data(){
          return{visible:false}
        },
        methods:{
            xxx(){
                this.visible=!this.visible
            }
        }
    }
</script>

<style scoped lang="scss">
    .popover{
        display: inline-block;
        vertical-align: top;
        position:relative;
        .content-wrapper{
            position:absolute;
            bottom:100%;
            left:0;
            border:1px solid red;
            box-shadow: 0 0 3px rgba(0,0,0,0.5);
        }
    }
</style>
```
* 在index.html中使用
```
<div id="app" style="padding-top:100px; padding-left:100px">
    <g-popover>
        <template slot="content">
            <div>popover内容</div>
        </template>
<!--        <template>-->
<!--            下面的不写slot就是默认slot="default，可以省略掉template"-->
            <button>点我</button>
<!--        </template>-->
    </g-popover>
    <g-popover>
        <template slot="content">
            <div>popover内容</div>
        </template>
        <!--        <template>-->
        <!--            下面的不写slot就是默认slot="default，可以省略掉template"-->
        <button slot>点我</button>
        <!--        </template>-->
    </g-popover>
</div>
```
#### 存在的BUG
* 点击弹出的popover之后，在点击popover的以外的其他地方应该隐藏掉。
    * 错误示范，下面的代码会导致执行完变成true，马上执行变成false，所以不会弹出popover气泡框。因为这里会有冒泡事件发生，先在子元素上变成true，然后冒泡到父元素上变成false。此时是同一个队列，按照代码先后出现的顺序执行,
    ```
            methods:{
                xxx(){
                    this.visible=!this.visible
                    console.log('visible切换为true')
                    if(this.visible===true){
                        document.body.addEventListener('click',()=>{
                            console.log('点击body把visible切换为false')
                            this.visible=false
                        })
                    }
                }
            }
    ```
    
    * 所以我们可以增加一个[nextTick()](https://cn.vuejs.org/v2/api/#vm-nextTick),这样就会先执行visible切换为true,然后下一个队列里面再去监听点击body把visible切换为false，这样就可以弹出popover气泡框啦。**下面的this.$nextTick只有在vue2.5.16版本中可以使用**
    ```
            methods: {
                xxx() {
                    this.visible = !this.visible;
                    console.log('visible切换为true');
                    if (this.visible === true) {
                        this.$nextTick(() => {
                            document.body.addEventListener('click', () => {
                                // this.$nextTick(() => {})
                                this.visible = false;
                                console.log('点击body把visible切换为false')
                            })
                        });
                        console.log('1')
                    }
                }
            }
    ```
* 上面的错误示范主要是需要点击在body区域才能关闭popover气泡框，那么我们如果监听不在body上面，而在document上面就可以解决这个问题了。
```
        methods: {
            xxx() {
                this.visible = !this.visible;
                console.log('visible切换为true');
                if (this.visible === true) {
                    setTimeout(() => {
                        document.addEventListener('click', () => {
                            // this.$nextTick(() => {})
                            this.visible = false;
                            console.log('点击body把visible切换为false')
                        })
                    });
                    console.log('1')
                }
            }
        }
```
* 但是还是存在bug,**第三次点击的时候不会弹出popover气泡框**,因为第三次点击的时候有两个监听器监听，一个是button按钮上面的监听，一个是document上的监听，而且顺序是先调用button的监听，然后再调用document的监听。而document一直都是让`this.visible = false`,所以一直都看不到popover气泡框。并且点击次数越多，监听的次数也越来越多，通过`conole.log`可以看到结果，所以它应该在完成本次监听后就需要被移除掉。这里用到[removeEventListene](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)
    * 第一种方案：需要监听函数(addEventListener)的一个名字。箭头函数是没有名字的,所以这里的箭头函数变成一个function函数，但是修改为function后里面的this是会改变的，那么就把这个函数`bind(this)`,但是由于bind会改变原来的函数，所以remove的函数和原来的函数不是同一个函数。所以这种方案也并不合适。
    ```
            methods: {
                xxx() {
                    this.visible = !this.visible;
                    console.log('visible切换为true');
                    if (this.visible === true) {
                        setTimeout(() => {
                            document.addEventListener('click', function x()  {
                                this.visible = false;
                                document.removeEventListener('click',x)
                                console.log('点击body把visible切换为false')
                            }.bind(this))
                        });
                        console.log('1')
                    }
                }
            }
    ```
    * 第二种方案,我们声明一个变量然后把箭头函数赋值给这个变量，那么这个箭头函数就有名字了。
    ```
        methods: {
            xxx() {
                this.visible = !this.visible;
                if (this.visible === true) {
                    console.log('visible切换为true');
                    setTimeout(() => {
                        let eventHandler = () => {
                            this.visible = false;
                            console.log('点击document把visible切换为false，隐藏popover');

                            console.log('增加click的点击事件绑定');
                            document.removeEventListener('click', eventHandler)
                        };
                        console.log('document移除click的点击事件绑定');
                        document.addEventListener('click', eventHandler)
                    });
                }
                else if(this.visible === false){
                    console.log('组件自身导致的visible切换为false,隐藏popover');
                }

            }
        }
    ```
    * 但是目前还有bug，我们继续优化代码方案。点击button弹出popover气泡框后，**点击这个popover气泡框应该不隐藏**，因为有可能想复制这个popover气泡框里面的文字，而且，**会隐藏两次popover气泡框，因为vue自身监听可以隐藏,document监听也可以隐藏,所以点击组件内部的时候，会冒泡到document，所以会隐藏两次，所以我们应该阻止冒泡**，这里使用[事件修饰符的.stop](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6),也就是`@click.stop`,这样就不会冒泡到document，只需要组件自己处理就好了。在popover内容区也增加`@click.stop`，这样点击popover气泡框内容区就不会隐藏了。
    ```
            methods: {
                xxx() {
                    this.visible = !this.visible;
                    if (this.visible === true) {
                        console.log('visible切换为true');
                        setTimeout(() => {
                            let eventHandler = () => {
                                this.visible = false;
                                console.log('点击document把visible切换为false，隐藏popover');
    
                                console.log('增加click的点击事件绑定');
                                document.removeEventListener('click', eventHandler)
                            };
                            console.log('document移除click的点击事件绑定');
                            document.addEventListener('click', eventHandler)
                        });
                    }
                    else if(this.visible === false){
                        console.log('组件自身导致的visible切换为false,隐藏popover');
                    }
    
                }
            }
    ```
* 这样我们就实现了，点击popover气泡框不会隐藏，点击document会隐藏，点击button只会隐藏一次。**但是还存在问题**：
    1. 用户有时候是需要hover上去后弹出popover，并不一定是click。
    2. 当用户在组件外面写了一个CSS样式`over-flow:hidden`，那么在弹出框是会被它的高度挡住的。因为弹出的部分肯定超过这个组件它本身的高度。这也是前面说明的，比如element组件等都是倾向于把它放到popover外面，而不在里面。放到外面，比如body上面就不会被`over-flow:hidden`，因为body足够高和宽。
    ```
        <div style="overflow: hidden">
        <g-popover>

        </g-popover>
        </div>
    ```
***
* 所以目前的代码只是一种理清的思路，就是这样写会出现一种`overflow:hidden`存在的问题，所以代码需要全部重写。
***
#### 注意上面的$this.nextTick()在此情况下有些版本的vue并不起作用
* 经过测试我发现,vue版本为2.6.1,2.3.0,2.3.4都不可以使用nextTick()弹出popover组件。**这里要注意vue和vue-template-compiler要配合使用，也就是要版本一致不然会报错**，可以参考[Vue和vue-template-compiler匹配的说明1](https://www.jianshu.com/p/482ce7d09b03)和[Vue和vue-template-compiler匹配的说明2](https://blog.csdn.net/kchangfu/article/details/78182302)，还有[Vue和vue-template-compiler匹配的说明3](https://www.cnblogs.com/lalalagq/p/9960228.html)
* 只有2.5.16(这是[老师github上面用的版本](https://github.com/FrankFang/frank-test-1/blob/popover/package.json))的Vue版本使用nextTick()可以弹出popover组件，其他版本我暂时没有去测试。可以去看看2.3-2.6版本之间到底改了什么，可以通过[vue的changelog查看](https://github.com/vuejs/vue/releases?after=v2.5.18-beta.0)
* 因为我使用的是Vue版本2.6.1,所以这里不能用this.nextTick,但是可以使用setTimeout来延迟弹出popover气泡框.
```
        methods: {
            xxx() {
                this.visible = !this.visible;
                console.log('visible切换为true');
                if (this.visible === true) {
                    setTimeout(() => {
                        document.body.addEventListener('click', () => {
                            // this.$nextTick(() => {})
                            this.visible = false;
                            console.log('点击body把visible切换为false')
                        })
                    });
                    console.log('1')
                }
            }
        }
```
### 第二种方法（推荐，但是也修复和很多BUG）
* 前面的bug在说一下：
    1. 如果前面的popover组件的父元素上面有一个`over-flow:hidden`样式，点击弹出这个popover的时候式看不到的，因为被高度限制了。所以不能把弹出的div放在按钮button的同一个层级。应该放到最外面，作为body的子元素。
    2. 第二个bug，就是阻止冒泡，也就是通过`@click.stop`阻止冒泡，但是当在这个组件的父元素上面写上`@click="yyy"`绑定事件后,点击button或者弹出的popover气泡框是不会去执行的yyy这个事件的。但是点击这个div上面就可以触发这个yyy事件，因为它被`@click.stop`打断了。只有在这个div本身才可以触发。
    ```
        <div style="overflow: hidden;border:1px solid red;padding:10px;" @click="yyy">
        <g-popover>

        </g-popover>
        </div>
    ```
* 通过[ref](https://cn.vuejs.org/v2/api/#ref)来获取然后移动它到body下面。但是这里**需要注意当[v-if](https://cn.vuejs.org/v2/guide/conditional.html#v-if)是false的时候是拿不到它的，也就是不出现在页面里(只是改变是否存在DOM树中)。这里可以改用[v-show](https://cn.vuejs.org/v2/guide/conditional.html#v-show),因为v-show是出现在页面里面，只是被CSS隐藏起来了(也就是只是改变CSS样式)，具体可以可查看[v-if vs v-show](https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)**，另外还用到[appendChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)
```
        <div ref="contentWrapper" class="content-wrapper" v-show="visible" @click.stop>
        <slot name="content"></slot>
        </div>
        
        mounted() {
            // setTimeout(()=>{
            document.body.appendChild(this.$refs.contentWrapper)
            // },1000)
        }
```
* 它虽然被移动走了,但是绑定的点击事件还是存在保持不变的，也就是不会影响它的任何功能，只是移动它的位置而已。这样就解决了放到同一级而被`over-flow:hidden`影响的问题.
* 前面用的是v-show，但是最好还是用v-if,因为不想让它刚开始就存在页面DOM里面，所以当它点击为true的时候才开始移动到body上面去。这里要延迟一下，可以使用this.$nextTick()
```
                if (this.visible === true) {
                    this.$nextTick(()=>{
                    document.body.appendChild(this.$refs.contentWrapper)
                    })
                    下面的代码省略
                }
```
* popover弹出框移动位置后，接下来就是写样式，让这个弹出的popover组件出现在button上面，通过CSS实现就好了,但是要先获取到这个切换器(trigger)这个button的信息，可以通过ref，但是slot是不支持ref的,所以要在外面加上一个span,在span上面使用ref。然后用.getBoundingClientRect来获取宽高等位置信息。然后通过把triggerWrapper的位置信息赋值给contentWrapper，这里需要注意使用绝地定位哦。但是这里因为使用了scoped，那么移出去的就不在popover这个class的里面，所以就要放到popover这个class的外面去。这样就是解决了`over-flow:hidden`的大概思路。
```
template部分代码
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
        
script部分代码
        this.$nextTick(() => {
            let {width, height, left, top} = this.$refs.triggerWrapper.getBoundingClientRect()
            console.log(width, height, left, top)
            this.$refs.contentWrapper.style.top = top + 'px'
            this.$refs.contentWrapper.style.left = left + 'px'
            document.body.appendChild(this.$refs.contentWrapper)
        })
SCSS部分代码
        .content-wrapper{
            position:absolute;
            border:1px solid red;
            box-shadow: 0 0 3px rgba(0,0,0,0.5);
            transform: translateY(-100%);
        }
```
#### 还存在可能的bug,它是getBoundingClientRect视口定位与绝对定位的差别的bug
* 如果最外面还有一个单独div，并且高度很高。从而popover组件上面部分有一个很高的div占据。
```
<div class="test" style="border:1px solid red; height:1000px;"></div>
```
* 因为[getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)是**相对于视口的距离**，而absolute的绝对定位是**相对于body(因为弹出的popover被移动到body下面)定位**的。解决其实很简单，为此我还专门写了[一篇博客getBoundingClientRect,clientHeight,scrollHeight等测试](https://zhuanlan.zhihu.com/p/95370151)来记录加深影响,增加一个[window.scrollY](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY)即可
```
    this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
```
* 但是有小部分浏览器可能不支持。兼容性不好，这里老师本来想在google上面搜索[js get elemen offset relative to document](https://www.google.com/search?sxsrf=ACYBGNTUJhkprs_6ROIM2wuIRQ4vhLuezA%3A1575546387524&ei=E-7oXdvJH4bt9QO27YHYCg&q=js+get+element+offset+relative+to+document&oq=js+get+element+offset+relative+to+document&gs_l=psy-ab.12..35i39.13503.13503..16021...0.0..0.107.301.2j1......0....1..gws-wiz.......35i304i39.v6Fo6OgdLLA&ved=0ahUKEwibn4XWt57mAhWGdn0KHbZ2AKsQ4dUDCAs),但是由于网络问题就没有继续搜索了，因为后续还会测试。
* 垂直方向增加了，同样的，水平方向也加上[window.scrollX](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollX)，左边有一个很宽的div或者某个元素或者属性使其出现bug。
```
    this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
```
* 现在**不管当前页面有没有滚动条都可以精准的定位了**。
#### 解决第二个问题，点击button的时候不能触发popover在index上面增加的事件
* 比如在index.html上增加一个点击事件yyy,点击button的时候，是不能触发的。
```
    <div style="overflow: hidden;border:1px solid red;padding:10px;" @click="yyy">
       <g-popover>

       </g-popover>
    </div>
```
* 因为冒泡被`.stop`阻止了
```
    <div class="popover" @click.stop="xxx">
```
* 如果只是简单的删除这个`.stop`，那么还是会存在bug。我们可以通过`console.log('关闭')`可以看到关闭了两次，一次是**document事件引起的关闭**，一次是**button上面的事件引起的关闭**
```
        methods: {
            xxx() {
                this.visible = !this.visible;
                if (this.visible === true) {
                    this.$nextTick(() => {
                        let {width, height, left, top} = this.$refs.triggerWrapper.getBoundingClientRect()
                        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                        document.body.appendChild(this.$refs.contentWrapper)
                    });
                    setTimeout(() => {
                        let eventHandler = () => {
                            this.visible = false;
                            document.removeEventListener('click', eventHandler)
                            console.log('关闭')
                        };
                        document.addEventListener('click', eventHandler)
                    });
                }
                else if(this.visible === false){
                    console.log('关闭')
                }
            }
        }
```
* 怎么解决也不难，因为点击button会冒泡，但是点击的元素是button，那么我们只需要确定点击的是什么元素，然后通过if来判断执行相关的代码即可。比如如果点击是`<span ref="triggerWrapper">`，那就切换弹出层这个popover气泡框是否显示。如果点击的是弹出层`<div ref="contentWrapper" class="content-wrapper" v-if="visible">`就什么也不做。那怎么知道用户点击的是弹出层还是button呢？
* 因为click函数的参数里面可以传入参数，这个参数的target就是这个被点击的元素，那么这个被点击的元素跟你的refs对比就知道了，通过[contains](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)来判断,具体看下面代码
```
        methods: {
            onClick(event) {
                if(this.$refs.triggerWrapper.contains(event.target)){
                    this.visible = !this.visible;
                    console.log('下面的button被点击')
                }
                else{
                    console.log('上面的弹出层的popover气泡框被点击')
                }
            }
        }
```
* 所以根据这个思路把详细代码，把document绑定的事件也加入。这里注意下面几点：
    * **这里由于this.$nextTick()又出现版本不同的原因，我把它修改为了setTimeout**。
    * 用到了**两个事件监听的参数**，一个是**document里面的,用e代表**，一个是**popover组件里面的，用event来代表**。
    * **老师此处漏了this.$refs.contentWrapper不存在的情况**，我也补充进去了,这个不存在的问题老师在重构代码的时候发现了。
    * 最后还是通过document来执行，只是**在document里面也做一个if判断区分**
    ```
            methods: {
                onClick(event) {
                    if(this.$refs.triggerWrapper.contains(event.target)){//这个event是整个popover组件里面的事件，那么event.target就是popover组件里面的元素，当然它包括了triggerWrapper所对应的元素
                        console.log(`我是button添加的event.target`)
                        this.visible = !this.visible;
                        console.log('下面的button被点击')
                        if (this.visible === true) {
                            setTimeout(() => {//这里由于Vue版本不同，所以把this.$nextTick修改为setTimeout来延迟
                                let {width, height, left, top} = this.$refs.triggerWrapper.getBoundingClientRect()
                                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                                this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                                document.body.appendChild(this.$refs.contentWrapper)
                                let eventHandler = (e) => {//这个e是整个document里面的事件，那么e.target就是整个document里面的元素，当然它包括了前面的triggerWrapper所对应的元素
                                    console.log('我是document添加的e.target')
                                    //当this.visible是true的情况下的判断document绑定的事件及元素
                                    if (this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)) {//这里老师漏了this.$refs.contentWrapper不存在的情况会报错
    
                                    } else {
                                        this.visible = false;
                                        document.removeEventListener('click', eventHandler)
                                        console.log('关闭')
                                    }
                                };
                                document.addEventListener('click', eventHandler)
                            });
                        }
                    }
                    else{
                        console.log('上面的弹出层的popover气泡框被点击')
                    }
                }
            }
    ```
#### 重构代码
* 老师在重构代码的这里发现了this.$refs.contentWrapper不存在的情况。
```
        methods: {
            positionContent(){
                let {width, height, left, top} = this.$refs.triggerWrapper.getBoundingClientRect()
                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                document.body.appendChild(this.$refs.contentWrapper)
            },
            listenToDocument(){
                let eventHandler = (e) => {//这个e是整个document里面的事件，那么e.target就是整个document里面的元素，当然它包括了前面的triggerWrapper所对应的元素
                    //当this.visible是true的情况下的判断document绑定的事件及元素
                    if (!(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target))) {
                        this.visible = false;
                        console.log('document监听导致的关闭')
                        document.removeEventListener('click', eventHandler)
                    }
                };
                document.addEventListener('click', eventHandler)
            },
            onShow(){
                setTimeout(() => {//这里由于Vue版本不通，所以把this.$nextTick修改为setTimeout来延迟
                    this.positionContent()
                    this.listenToDocument()
                });
            },
            onClick(event) {
                if(this.$refs.triggerWrapper.contains(event.target)){//这个event是整个popover组件里面的事件，那么event.target就是popover组件里面的元素，当然它包括了triggerWrapper所对应的元素
                    this.visible = !this.visible;
                    console.log('下面的button被点击')
                    if (this.visible === true) {
                        this.onShow()
                    }
                    else{
                        console.log('popover组件的关闭')
                    }
                }
            }
        }
```
#### 不用阻止冒泡的方法解决的bug(气泡框popover点击保持原样，点击button让popover组件切换visible，点击document然后document绑定事件切换visible，并且没有多次关闭的bug)
* **另外还存在关闭关两次的情况**。所以在document添加事件绑定的时候判断如果是popover组件里面的就不去处理，让popover自己去处理关闭就好了.老师这里没有继续详细的做了.而是从另外一条思路去处理，而我这里就完善了代码，但是代码逻辑有点复杂,主要是在绑定document事件里面增加if语句，**分了三种情况**
    1. 如果点击的是弹出的气泡框，就什么都不做，并且return，那么就不执行后面的操作.
    2. 如果点击没有点击button，那么因为前面做了判断，就只能点击popover组件以外的东西，那就是属于document，就切换visible，然后移除绑定事件.
    3. 如果气泡框弹出的状态并且点击button,那就就只是移除绑定事件,如果没有这一步就会导致多次关闭。
    ```
                listenToDocument(){
                    let eventHandler = (e) => {//这个e是整个document里面的事件，那么e.target就是整个document里面的元素，当然它包括了前面的triggerWrapper所对应的元素
                        //当this.visible是true的情况下的判断document绑定的事件及元素
                        if(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)){//如果点击的是弹出的气泡框，就什么都不做，并且return，那么就不执行后面的操作.
                            return
                        }
                        if (!(this.$refs.triggerWrapper.contains(e.target))) {//如果点击没有点击button，那么因为前面做了判断，就只能点击popover组件以外的东西，那就是属于document，就切换visible，然后移除绑定事件.
                            this.visible = false;
                            console.log('document监听导致的关闭')
                            document.removeEventListener('click', eventHandler)
                        }
                        if(this.$refs.triggerWrapper.contains(e.target)&&(this.visible===true)){//如果气泡框弹出的状态并且点击button,那就就只是移除绑定事件,如果没有这一步就会导致多次关闭。
                            document.removeEventListener('click', eventHandler)
                        }
    
                    };
                    document.addEventListener('click', eventHandler)
                },
    ```

* 如果一开始就去监听document是比较省事，不用考虑关闭多次的情况，但是如果有很多button进入网页就被监听，那么就比较浪费内存，因为有些是不一定需要监听。只有在点击打开的时候才需要监听器。如果是add然后remove一个监听，就比较需要考虑及时关闭和移除监听的问题。但是这样就把需要监听的监听，不需要监听的就不监听，比较节省内存。
#### 引入的内聚模式来继续重构代码，这种方法逻辑更清晰
* 很多人说高内聚(就是把关闭的入口收拢一下)，低耦合。高内聚大概意思就是
    > 如果这个代码是特别重要的就不要把它分散在各个地方了。而把它内聚到一个方法上面。
* 比如增加
    * onClickDocument方法.
    * close方法
    * open方法
    * onClick方法等
* 这里还需要把eventHandler提取出来作为一个全局方法，要不然别的地方访问不到，**但是这里没有用箭头函数，理论上来说不用箭头函数的function函数里面的this是会改变的，但是在这里的Vue组件里面居然没有改变，有点奇怪，可能是Vue组件它去优化了吧,但是Vue这样我觉得有点不合适，理论上说如果`document.addEventListener('click', this.eventHandler)`这里的的this是document。那么在eventHandler函数里面也应该是document，但是这里却是popover组件。**，我们可以通过[jsBin](https://jsbin.com/pakivapibo/1/edit?html,css,js,output)测试知道.
* **老师的onClickDocument里面的代码是这样的**，但是我测试后发现**点击弹出的popover气泡框是会消失关闭的**。按理论来说应该不要关闭，所以**还是存在bug**。
```
        onClickDocument(e){
                if(this.$refs.popover&&
                    (this.$refs.popover===e.target||this.$refs.popover.contains(e.target))
                ){return}
                this.close()
        },
```
* 我的onClickDocument里面的代码是这样的,这里点击弹出的popover气泡框是不会消失的。
```
            onClickDocument(e){
                // 这个e是整个document里面的事件，那么e.target就是整个document里面的元素，当然它包括了前面的triggerWrapper所对应的元素
                //     当this.visible是true的情况下的判断document绑定的事件及元素
                    if(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)){//如果点击的是弹出的气泡框，就什么都不做，并且return，那么就不执行后面的操作.
                        return
                    }
                    if (!(this.$refs.triggerWrapper.contains(e.target))) {//如果点击没有点击button，那么因为前面做了判断，就只能点击popover组件以外的东西，那就是属于document，就切换visible，然后移除绑定事件.
                        this.close()
                        console.log('document监听导致的关闭,如果已经关闭可以忽略')
                    }
                    if(this.$refs.triggerWrapper.contains(e.target)&&(this.visible===true)){//如果气泡框弹出的状态并且点击button,那就就只是移除绑定事件,如果没有这一步就会导致多次关闭。
                        document.removeEventListener('click', this.onClickDocument)
                    }
                //下面是老师的onClickDocument代码
                //     if(this.$refs.popover&&
                //         (this.$refs.popover===e.target||this.$refs.popover.contains(e.target))
                //     ){return}
                //     this.close()
            },
```
* 整个重构的代码,包括四个方法，这里不包括positionContent,因为它不是重构的代码。
    * onClickDocument方法.
    * close方法
    * open方法
    * onClick方法等
```
        methods: {
            onClickDocument(e){
                // 这个e是整个document里面的事件，那么e.target就是整个document里面的元素，当然它包括了前面的triggerWrapper所对应的元素
                //     当this.visible是true的情况下的判断document绑定的事件及元素
                    if(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)){//如果点击的是弹出的气泡框，就什么都不做，并且return，那么就不执行后面的操作.
                        return
                    }
                    if (!(this.$refs.triggerWrapper.contains(e.target))) {//如果点击没有点击button，那么因为前面做了判断，就只能点击popover组件以外的东西，那就是属于document，就切换visible，然后移除绑定事件.
                        this.close()
                        console.log('document监听导致的关闭,如果已经关闭可以忽略')
                    }
                    if(this.$refs.triggerWrapper.contains(e.target)&&(this.visible===true)){//如果气泡框弹出的状态并且点击button,那就就只是移除绑定事件,如果没有这一步就会导致多次关闭。
                        document.removeEventListener('click', this.onClickDocument)
                    }
                //下面是老师的onClickDocument代码
                //     if(this.$refs.popover&&
                //         (this.$refs.popover===e.target||this.$refs.popover.contains(e.target))
                //     ){return}
                //     this.close()
            },
            open(){
                this.visible = true
                setTimeout(() => {//这里由于Vue版本不通，所以把this.$nextTick修改为setTimeout来延迟
                    this.positionContent()
                    document.addEventListener('click', this.onClickDocument)
                });
            },
            close(){
                this.visible = false
                document.removeEventListener('click', this.onClickDocument)
                console.log('内聚的关闭')
            },
            onClick(event) {
                if(this.$refs.triggerWrapper.contains(event.target)){//这个event是整个popover组件里面的事件，那么event.target就是popover组件里面的元素，当然它包括了triggerWrapper所对应的元素
                    console.log('下面的button被点击')
                    if (this.visible === true) {//当前能看见就关闭
                        this.close()
                    }
                    else{//当前不能看见就打开
                        this.open()
                        console.log('popover组件的关闭')
                    }
                }
            }
        }
```
***
* 最后我们的功能就实现了:
    1. 两个button之间可以互相点击打开及关闭，并且只打开一个。
    2. 点击popover弹出气泡框不会关闭。
    3. 点击document只会关闭一次。
    4. 绑定事件也只有一次。
    5. 可以绑定index.html外面传进来的事件，不阻止index.html传进来的绑定事件。
***
#### 我今天才发现原来appendChild是直接移动，而不是复制
* Node.appendChild() 方法将一个节点添加到指定父节点的子节点列表**末尾**。
* appendChild 方法会把要**插入的这个节点引用作为返回值返回**.
``` 
var child = node.appendChild(child);
```
> node 是要插入子节点的父节点.    
  child 即是参数又是这个方法的返回值.
* **是直接移动，不是复制**。
* 具体测试见[jsBin](https://jsbin.com/reruwokore/1/edit?html,js,output)
### 开始写CSS(支持四个方位)
#### 首先回顾之前的三个bug
* 三个bug的问题和解决思路
    1. `overflow:hidden`导致bug,于是通过body.appendChild放到body里面,这个思路看起来简单，但是我们需要考虑是否需要增加window.scrollX和window.scrollY的问题。
    2. 多次关闭，重复关闭，点一次关闭会被关闭两次或者多次。通过职责分开管理，document值管外面，popover只管里面。不要交叉管理。
    3. 忘记取消document的监听。每次把visible变成false的时候都得取消这个document上的监听。这个忘记的原因主要是因为代码的结构不太好。通过把所有关闭的东西都收拢到一个方法里面比如close方法。最终就只有五个方法。
#### 优化比较好的代码一般只有五行代码(这个是老师的推荐的指导准则)
* 通过检查发现tabs组件里面mounted里面的代码超过了五行。
```
        mounted(){
            if(this.$children.length===0){
                    console&&console.warn&&console.warn('tabs的子组件应该是tabs-head和tabs-body,但你没有写子组件')
            }

            this.$children.forEach((vm)=>{
                if (vm.$options.name === 'GuluTabsHead') {
                    vm.$children.forEach((childVm) => {
                        if (childVm.name === this.selected && childVm.$options.name === 'GuluTabsItem') {
                            this.eventBus.$emit('update:selected', this.selected, childVm)
                        }
                    })
                }
            })
        }
```
* 优化后的代码只有两行。
```
        methods:{
            checkChildren(){
                if(this.$children.length===0){
                    console&&console.warn&&console.warn('tabs的子组件应该是tabs-head和tabs-body,但你没有写子组件')
                }
            },
            selectTab(){
                this.$children.forEach((vm)=>{
                    if (vm.$options.name === 'GuluTabsHead') {
                        vm.$children.forEach((childVm) => {
                            if (childVm.name === this.selected && childVm.$options.name === 'GuluTabsItem') {

                                this.eventBus.$emit('update:selected', this.selected, childVm)
                            }
                        })
                    }
                })
            }
        },
        mounted(){
            this.checkChildren();
            this.selectTab()
        }
```
* 因为tabs组件我们修改了代码，然后通过`npm run test`测试发现通过了，就没问题了，**这也是写测试的好处**，就是你修改了代码不需要一个个手动查找问题，手动测试一遍，多麻烦。现在只需要运行测试就知道是否满足要求了。
* 坏的代码的循环过程就是
    1. 写代码不写测试
    2. 发现问题，不敢或者不方便删除原来的代码，就继续增加代码
    3. 再次发现问题继续增加代码，于是代码变的越来越多。
* 好的代码的循环过程就是
    1. 写代码的过程中或者结束后写测试
    2. 发现问题直接回到原来的代码重新写。
    3. 因为你可以运行测试，就可以知道，如果通过就没问题了。
    4. 代码无论怎么修改，**都有测试来保证代码的质量至少不会有很大的问题**。
#### 开始写CSS代码
* 删除部分不需要的样式，使用我们的g-button组件的按钮。当修改为g-button之后，发现**老师的button组件上的代码`vertical-align: middle`,而我的button组件上的代码`vertical-align: top`**,所以我的会显示正常，如果这里写了不是top，那么就会出现问题，因为定位的位置是按照popover组件的`<span ref="triggerWrapper">`定位的,也就是
```
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
```
* 而span的高度只有不到20px，但是g-button的组件的高度有32px，所以就**存在交叉的bug**,解决方法很简单，把这个span变成块级元素即可，也就是写成`display:inline-block`，这样span和button就一样高了.
```
        <span ref="triggerWrapper" style="display: inline-block">
            <slot></slot>
        </span>
```
* 然后让弹出的popover好看一些。这里需要**做一个小三角形**，要用到[calc](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)，伪元素[::after](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)和[::before](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before),这样CSS代码就修改为下面：
```
<style scoped lang="scss">
    $border-color:#333;
    $border-radius:4px;
    .popover{
        display: inline-block;
        vertical-align: top;
        position:relative;
    }
    .content-wrapper{
        position:absolute;
        border:1px solid $border-color;
        border-radius: $border-radius;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
        transform: translateY(-100%);
        margin-top:-10px;
        padding:.5em 1em;
        &::before,&::after{
            content:'';
            display: block;
            border: 10px solid transparent;
            width:0px;
            height:0px;
            position:absolute;
            top:100%;
            left:10px;
        }
        &::before{
            border-top-color: black;
            top:100%;
        }
        &::after{
            border-top-color: white;
            top:calc(100% - 1px);
        }
    }
</style>
```

