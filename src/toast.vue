<template>
    <div class="wrapper" :class="toastClasses">
        <div class="toast" ref="toast" >
            <div class="message">
                <!--        如果没有enableHtml，就用 slot-->
                <slot v-if="!enableHtml"></slot>
                <!--        如果有enableHtml,就用下面的div-->
                <div v-if="enableHtml" v-html="$slots.default"></div>
            </div>
            <!--        因为在plugin.js里面传入参数的时候就是toast.$slots.default=message-->
            <div class="line" ref="line"></div>
            <span class="close" v-if="closeButton" @click="onClickClose">
            {{closeButton.text}}
        </span>
        </div>
    </div>
</template>

<script>
    //这个对象是组件的一个选项,它并不是组件本身
    export default {
        name:'GuluToast',
        props:{
            autoClose:{//是否自动关闭
                type:[Boolean,Number],
                default:5,
                validator(value){
                  console.log(value);
                    return value === false || typeof value === 'number';
                }
            },
            // autoCloseDelay:{//自动关闭的延迟时间
            //     type:Number,
            //     default: 5
            // },
            closeButton: {//是否有关闭按钮
                type: Object,
                default(){
                    return {
                        text: '关闭', callback: undefined
                    }
                }
            },
            enableHtml:{
                type:Boolean,
                default:false
            },
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','bottom','middle'].indexOf(value)>=0
                }
            }
        },
        computed:{
          toastClasses(){
              return {
               [`position-${this.position}`]:true//这里要加一个中括号
          }
            }
        },
        mounted(){
            this.updateStyles()
            this.execAutoClose()
        },
        methods:{//两个方法函数
            updateStyles(){
                this.$nextTick(()=>{
                    this.$refs.line.style.height=`${this.$refs.toast.getBoundingClientRect().height}px`
                })
            },
            execAutoClose(){
                if(this.autoClose){//mounted之后会定时的关闭自己
                    setTimeout(()=>{
                        this.close()
                    // },this.autoCloseDelay*1000)
                    },this.autoClose*1000)
                }
            },
            close(){//关闭自己
                this.$el.remove()//把这个元素删除
                this.$emit('beforeClose')//触发一个关闭之前操作的事件，他就是把toast设置为undefined
                this.$destroy()//他会把绑定的事件取消掉
            },
            log(){
              console.log('测试')
            },
            onClickClose(){//当用户点击关闭按钮的时候关闭自己，并且调用closeButton的回调函数。
                this.close()
                if(this.closeButton&&typeof this.closeButton.callback==='function' ){
                    this.closeButton.callback(this)//这里的this就是当前的toast组件实例
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    $font-size:14px;
    $toast-min-height:40px;
    $toast-bg:rgba(0,0,0,0.75);
    $animation-duration:300ms;
    @keyframes fade-in {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 100%;
        }
    }
    @keyframes slide-up {
        0%{
            transform:translateY(100%)
        }
        100%{
            transform:translateY(0%)
        }
    }
    @keyframes slide-down {
        0%{
            transform:translateY(-100%)
        }
        100%{
            transform:translateY(0%)
        }
    }
    .wrapper{
        left:50%;
        position:fixed;
        &.position-top{
            top:0;
            transform:translateX(-50%);
            .toast{
                animation:slide-down $animation-duration,fade-in $animation-duration;
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
            }
        }
        &.position-bottom{
            bottom:0;
            transform:translateX(-50%);
            .toast{
                animation:slide-up $animation-duration,fade-in $animation-duration;
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
            }
        }
        &.position-middle{
            top:50%;
            transform:translate(-50%,-50%);
            animation:fade-in $animation-duration;
        }
    }
    .toast{
        /*<!--animation:fade-in $animation-duration;-->*/
        font-size: $font-size;
        line-height:1.8;
        min-height: $toast-min-height;
        /*position:fixed;*/
        /*top:0;*/
        /*left:50%;*/
        /*<!--transform:translateX(-50%);-->*/
        display:flex;
        color:white;
        align-items: center;
        background: $toast-bg;
        border-radius:4px;
        box-shadow:0px 0px 3px 0px rgba(0,0,0,0.50);
        padding:0 16px;
    /*    一般padding都是4或者8的倍数*/
        .message{
            padding:8px 0;
        }
        .close{
            padding-left:16px;
            flex-shrink: 0;
        }
        .line{
            border-left:1px solid #666;
            height:100%;
            margin-left:16px;
        }
    }

</style>