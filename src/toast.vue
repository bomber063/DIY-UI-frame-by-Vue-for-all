<template>
    <div class="toast" ref="wrapper">
<!--        如果没有enableHtml，就用 slot-->
        <slot v-if="!enableHtml"></slot>
<!--        如果有enableHtml,就用下面的div-->
        <div v-if="enableHtml" v-html="$slots.default"></div>
<!--        因为在plugin.js里面传入参数的时候就是toast.$slots.default=message-->
        <div class="line" ref="line"></div>
        <span class="close" v-if="closeButton" @click="onClickClose">
            {{closeButton.text}}
        </span>
    </div>
</template>

<script>
    //这个对象是组件的一个选项,它并不是组件本身
    export default {
        name:'GuluToast',
        props:{
            autoClose:{//是否自动关闭
                type:Boolean,
                default:true
            },
            autoCloseDelay:{//自动关闭的延迟时间
                type:Number,
                default: 50
            },
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
            }
        },
        mounted(){
            if(this.autoClose){//mounted之后会定时的关闭自己
                setTimeout(()=>{
                  this.close()
                },this.autoCloseDelay*1000)
            }
            this.$nextTick(()=>{
                this.$refs.line.style.height=`${this.$refs.wrapper.getBoundingClientRect().height}px`
                console.log(this.$refs.line.style.height)
                console.log(this.$refs.wrapper.getBoundingClientRect().height)
            })


        },
        methods:{//两个方法函数
            close(){//关闭自己
                this.$el.remove()//把这个元素删除
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
    .toast{
        font-size: $font-size;
        line-height:1.8;
        min-height: $toast-min-height;
        position:fixed;
        top:0;
        left:50%;
        transform:translateX(-50%);
        display:flex;
        color:white;
        align-items: center;
        background: $toast-bg;
        border-radius:4px;
        box-shadow:0px 0px 3px 0px rgba(0,0,0,0.50);
        padding:0 16px;
    /*    一般padding都是4或者8的倍数*/
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