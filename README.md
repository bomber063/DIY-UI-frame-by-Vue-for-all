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