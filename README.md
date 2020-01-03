## 完善官网页面的其他组件
* 正则表达式标志m	
    * 多行搜索。
* [正则表达式的量词](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers)
### button组件
* 增加了部分代码，其中下面这行代码，是前面需要空12个字符，也就是前面已经默认空出了4个字符了。
* 由这个
```
.replace(/\t+| +/g, '').trim()
```
* 修改为
```
    .replace(/^ {8}/gm, '').trim()
```
* 这么修改可能是为了在JS代码中比较好看，因为JS代码会有格式化的效果。
### tabs组件
* 这里发现原来的代码有存在问题，原来的代码整个tabs都是贴近视口的，item的绝对定位本来是参考的位置是head，此时head的边界和视口的边界是一样的。所以绝对定位和getBoundingClientRect()都是**靠在最左边的**。那么计算结果就相同，那么就没有发现这个问题。
* 但是我们部署的时候视口边界和item的绝对定位的参考位置head不同。所以需要减去它
* 修改的代码
```
    <div class="tabs-head" ref="head">

    mounted(){
        this.eventBus.$on('update:selected',(name,vm)=> {
            //left是点击的item组件的距离视口左边的距离
            let {width,height,top,left}=vm.$el.getBoundingClientRect();
            //left2是head组件距离视口左边的距离
            let {left: left2} = this.$refs.head.getBoundingClientRect()
            this.$refs.line.style.width=`${width}px`;
            //item在head里面，那么肯定是item距离左边视口要大，这部分大的就是多余的，减去这部分多余的就符合了距离要求了
            this.$refs.line.style.left=`${left-left2}px`;
        })
    }
```
### input组件
* 因为组件里面用的是inputa和valuea,所以用不了v-model,如果需要用v-model就需要把inputa修改为input,valuea修改为value才可以哦。
* 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件,但是我们之前的用的是valuea和inputa，所以是不可以使用v-model的。
```
        <g-input :valuea="value" @inputa="value=$event"></g-input>
<!--        因为组件里面用的不是value和input所以用不了v-model-->
<!--        <g-input v-model="value"></g-input>-->
        <div>
            value: {{value}}
        </div>
```
### grid组件
* 这个好像没有特别说明的，这里就是代码比较多，但是其实逻辑比较简单。

### layout组件
* 这个好像没有特别说明的.

### toast组件
* 这个组件我写了一段时间了，现在看起来还有点费劲。它本身是通过结果button组件，点击之后弹出的一个框。
* 这个组件通过电泳插件Vue.use(plugin)。
* plugin.js里面
    1. 我们没有import vue ,这个vue是外面的app.js通过Vue.use(plugin)传进来的，Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
    2. Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象，然后外面的app.js里面就可以通过Vue.use(plugin)使用它           
        ```
        install(Vue,options){//这个是安装
                   Vue.prototype.$toast=function(message,toastOptions){//原型上面定义了一个$toast方法,toastOptions是一个可选参数，里面很多值都是在app.js里面传进来
        ```
    3. 有一个函数createToast，它有四个参数，通过它下面的`Vue.prototype.$toast=function(message,toastOptions)`传进来。这个toastOptions是一个可选参数。
    4. 这个function会调用前面的函数createToast。然后传入这四个参数。Vue,message,propsData,onClose。
    5. 其中propsData参数通过plugin.js里面可以看到就是toastOptions
        ```
                propsData:toastOptions,
        ```
    6. 这个toastOptions是通过app.js里面的showToast(position)传过来
        ```
                showToast(position){
                    this.$toast(`你的智商为${parseInt(Math.random()*100)}需要充值！`,{
                        closeButton: {
                            text: '已充值',
                            callback() {
                                console.log('他说已经充值智商了')
                            }
                        },
                        autoClose:3,
                        // autoCloseDelay:3,
                        enableHtml: false,
                        position
                    })
                }
        ```
        
    7. 也就是说只需要写上button，然后给出showToast(position)，其中这个position就是一个位置信息。
    8. 而showToast这个函数是通过前面的函数调用它
        ```
                showToastTop() {
                    this.showToast('top')
                },
                showToastMiddle() {
                    this.showToast('middle')
                },
                showToastBottom() {
                    this.showToast('bottom')
                },
        ```
* 因为插件plugin.js里面已经引入了toast.
```
import Toast from './toast'
```
* 所以我们在toast-demo-1.vue引入的信息只需要button，vue，插件plugin.js，并且使用插件(通过Vue.use(plugin)使用插件)，这个use会去执行plugin里面的install方法,并且这个是用户主动写的。
```
    import Vue from 'vue'
    import plugin from '../../../src/plugin'
    import GButton from '../../../src/button'

    Vue.use(plugin)
```
* 这个toast一开始是隐藏的，通过触发点击事件后显示出来。点击事件之后去执行vue.$toast即可。也就是在app.js里面的this.$toast(message,toastOptions)，,具体看下面
```
            this.$toast(`你的智商为${parseInt(Math.random()*100)}需要充值！`,{
                closeButton: {
                    text: '已充值',
                    callback() {
                        console.log('他说已经充值智商了')
                    }
                },
                autoClose:3,
                // autoCloseDelay:3,
                enableHtml: false,
                position
            })
```
* 当然插件plugin.js里面是源头，是在Vue的原型上面增加的
```
export default {
    install(Vue,options){
        Vue.prototype.$toast=function(message,toastOptions){
            if(currentToast) {//如果有toast，就关闭这个toast。
                currentToast.close()
            }
            currentToast=createToast({
                Vue,
                message,
                propsData:toastOptions,
                onClose:()=>{
                    currentToast=null//关闭前把currentToast赋值为null，因为前面的close之后，currentToast其实还是存在的。
                }
            })
            console.log(currentToast)

        }
    }
}
```
* 因为在html中写Vue框架会帮你加上这个Vue，所以可以省略，只需要写上$toast(message,toastOptions)即可这个message是一个字符串,toastOptions是一个对象。比如
```
    <g-button @click="$toast('点击弹出提示', {position:'middle'})">点我</g-button>
```
* 另外上方弹出会被轱辘UI那一栏覆盖掉(也就是挡住了，其实已经显示了，但是你却看不到),所以需要让他显示在最外层,我把toast.vue组件的class修改为gulu-toast
```
    <div class="gulu-toast" :class="toastClasses">
```
* 在toast-demo-1.vue里面增加一个[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)
```
    .gulu-toast {
        z-index: 30 !important;
    }
```
* 为了体现没有关闭按钮我把toast.vue组件的line的部分也增加v-if
```
        <div class="line" ref="line" v-if="closeButton"></div>
```





