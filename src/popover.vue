<template>
    <div class="popover" @click="onClick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper" style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "GuluPopover",
        data(){
          return {visible:false}
        },
        methods: {
            positionContent(){
                let {width, height, left, top} = this.$refs.triggerWrapper.getBoundingClientRect()
                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                document.body.appendChild(this.$refs.contentWrapper)
            },
            onClickDocument(e){
                // 这个e是整个document里面的事件，那么e.target就是整个document里面的元素，当然它包括了前面的triggerWrapper所对应的元素
                //     当this.visible是true的情况下的判断document绑定的事件及元素
                //     if(this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target)){//如果点击的是弹出的气泡框，就什么都不做，并且return，那么就不执行后面的操作.
                //         return
                //     }
                //     if (!(this.$refs.triggerWrapper.contains(e.target))) {//如果点击没有点击button，那么因为前面做了判断，就只能点击popover组件以外的东西，那就是属于document，就切换visible，然后移除绑定事件.
                //         this.close()
                //         console.log('document监听导致的关闭,如果已经关闭可以忽略')
                //     }
                //     if(this.$refs.triggerWrapper.contains(e.target)&&(this.visible===true)){//如果气泡框弹出的状态并且点击button,那就就只是移除绑定事件,如果没有这一步就会导致多次关闭。
                //         document.removeEventListener('click', this.onClickDocument)
                //     }
                //下面是老师的onClickDocument代码
                //     if(this.$refs.popover&&
                //         (this.$refs.popover===e.target||this.$refs.popover.contains(e.target))
                //     ){return}
                //     this.close()
                //
                //下面是老师修改后的onClickDocument代码
                    if(this.$refs.popover&&
                        (this.$refs.popover===e.target||this.$refs.popover.contains(e.target))
                    ){return}
                    if(this.$refs.contentWrapper &&
                        (this.$refs.contentWrapper===e.target ||this.$refs.contentWrapper.contains(e.target))
                    ){return}
                    this.close()

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
    }
</script>

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
        max-width: 20em;
        word-break: break-all;
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