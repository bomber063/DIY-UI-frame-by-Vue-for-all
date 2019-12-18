## collapse组件
### collapse是什么
* collapse是手风琴组件，我们可以从[ant.design的collapse](https://ant.design/components/collapse-cn/)上面看到这个，它上面叫做Collapse折叠面板。它上面有些禁用的功能，但是禁用是否可以直接隐藏更好。
* 基本功能：
    * 就是点击一个按钮打开一个折叠面板。可以打开多个。
    * 点击打开一个按钮，点击另一个按钮的弹出折叠面板的时候关闭前面打开的折叠面板。也就是只能打开一个。
    * 还可以添加一个默认的箭头(这个先不做，以后再做)
    * 其他的功能基本都是改变样式或者动画(这个先不做，以后再做)
* 这个组件比较简单，基本都是前面用的知识，还有一些CSS样式
### 开始写代码
#### 下面的代码有部分最后还会修改
* [:first-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child) CSS pseudo-class 表示在一组**兄弟**元素中的**第一个元素**。
* **最下面的内容3如果没有的话，那么标题3下面就会有一点不好看，这个暂时先不解决**。
#### 只打开一个
* 第一个打开的时候，点击第二个，那么第一个就关闭。可以用到前面说的[eventBus](https://github.com/bomber063/DIY-UI-frame-by-Vue-for-all/tree/tabs)。当然也可以不用eventBus，因为结果比较简答， 只有两个组件。一个父组件，一个子组件，只要父子通信即可。我这里就用eventBus。
* 主要代码就看下面就好了，下面的代码是collapse-item，这里就可以实现只打开一个
```
        mounted() {
                this.eventBus.$on('update:selected',(vm)=>{//这里是eventBus上绑定update:selected这个事件。这里的vm是下面toggle的emit之后传过来的this。
                    // console.log('vm')
                    // console.log(vm)
                    // console.log('this')
                    // console.log(this)
                    if(vm!==this){//如果触发的vm不等于本身的this，那么就关闭本身的this。本身有三个this，有一个是vm等于本身的this，另外两个都关闭。
                        this.close()
                    }
                })
        },
        methods:{
            toggle(){//toggle里面的this跟上面mounted的里面的this是不同的
                if(this.open){
                    this.open=false
                    console.log(this)
                }
                else{
                    this.open=true
                    this.eventBus.$emit('update:selected',this)//这里是在eventBus上触发update:selected这个事件。这里的this是触发事件的this，也就是点击了哪个就是哪个,因为这个toggle是前面的@click绑定的事件点击触发后执行的函数
                    console.log(this)
                }
            },
            close(){
                this.open=false
            }
        }
```
#### 用户可以选择打开一个或者打开多个
* 这里就需要传入一个参数了，我们用single表示。
* 因为前面的eventBus主要功能就是打开一个，那么如果有single，那就不需要这个eventBus了。所以通过改变eventBus就可以实现打开一个或者多个了。
* 因为有没有single为false的时候是没有eventBus的，所以使用到eventBus的地方还需要做一个有eventBus的前提的代码说明
* 如果没有eventBus，那么该方法因为在子组件上面还是有inject注入这个eventBus，**所以还是会有一个警告**，但是不影响功能。
```
        inject:['eventBus'],
```
* collapse上的主要代码为
```
        props:{
          single:{
              type:Boolean,
              default:false
          }
        },
        data(){
            return {
                eventBus:new Vue()
            }
        },
        provide(){
            if (this.single) {
                return {
                    eventBus: this.eventBus
                }
            }
        }
```
* collapse-item上面主要修改做判断的两行代码，增加`this.eventBus&&`。
```
            this.eventBus&&this.eventBus.$on('update:selected',(vm)=>{//这里是eventBus上绑定
            this.eventBus&&this.eventBus.$emit('update:selected',this)
```
* 当在index.html上有传single的时候就会有eventBus来实现一个的功能，当没有传single就没有eventBus实现一个的功能。