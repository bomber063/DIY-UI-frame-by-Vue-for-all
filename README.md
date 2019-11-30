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