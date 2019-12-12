<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible"
        :class="{[`position-${position}`]:true}">
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
        mounted(){
            if(this.trigger==='click'){
                this.$refs.popover.addEventListener('click',this.onClick)
            }
            else{
                this.$refs.popover.addEventListener('mouseenter',this.open)
                this.$refs.popover.addEventListener('mouseleave',this.close)
            }
        },
        destroyed(){
            if(this.trigger==='click'){
                this.$refs.popover.removeEventListener('click',this.onClick)
            }
            else{
                this.$refs.popover.removeEventListener('mouseenter',this.open)
                this.$refs.popover.removeEventListener('mouseleave',this.close)
            }
        },
        computed:{
            openEvent(){
                if(this.trigger==='click'){
                    return 'click'
                }
                else{
                    return 'mouseenter'
                }
            },
            closeEvent(){
                if(this.trigger==='click'){
                    return 'click'
                }
                else{
                    return 'mouseleave'
                }
            }
        },
        props:{
          position:{
              type:String,
              default:'top',
              validator(value){
                  return ['top','bottom','left','right'].indexOf(value)>=0
              }
          },
          trigger:{
              type:String,
              default:'click',
              validator(value){
                  return ['click','hover'].indexOf(value)>=0
              }
          }
        },
        methods: {
            positionContent(){
                const {contentWrapper,triggerWrapper}=this.$refs;
                document.body.appendChild(contentWrapper)
                const {width, height, left, top,bottom} = triggerWrapper.getBoundingClientRect();
                const {height:height2}=contentWrapper.getBoundingClientRect();
                let positions={
                    top:{
                        top:top + window.scrollY,
                        left:left + window.scrollX
                    },
                    bottom:{
                        top:top + height + window.scrollY,
                        left:left + window.scrollX
                    },
                    left:{
                        left:left + window.scrollX,
                        top:height2>height?top - (height2-height)/2 + window.scrollY:top + (height-height2)/2 + window.scrollY,
                        // top1:top - (height2-height)/2 + window.scrollY,
                        // top2:top + (height-height2)/2 + window.scrollY
                    },
                    right:{
                        left:left + width + window.scrollX,
                        top:height2>height?top - (height2-height)/2 + window.scrollY:top + (height-height2)/2 + window.scrollY,
                        // top1:top - (height2-height)/2 + window.scrollY,
                        // top2:top + (height-height2)/2 + window.scrollY
                    }
                };
                contentWrapper.style.top=positions[this.position].top+'px'
                contentWrapper.style.left=positions[this.position].left+'px'

                // if(this.position==='top'){
                // contentWrapper.style.top = top + window.scrollY + 'px'
                // contentWrapper.style.left = left + window.scrollX + 'px'
                // }
                // if(this.position==='bottom'){
                //     contentWrapper.style.top = top + height + window.scrollY + 'px'
                //     contentWrapper.style.left = left + window.scrollX + 'px'
                // }
                // if(this.position==='left'){
                //     //出现在左右的时候需要判断button高度和弹出气泡框高度的差，为了让他们居中对齐。
                //     contentWrapper.style.left = left + window.scrollX + 'px'
                //     if(height2>height){
                //         contentWrapper.style.top = top - (height2-height)/2 + window.scrollY + 'px'
                //     }
                //     if(height2<height){
                //         contentWrapper.style.top = top + (height-height2)/2 + window.scrollY + 'px'
                //     }
                // }
                // if(this.position==='right'){
                //     //出现在左右的时候需要判断button高度和弹出气泡框高度的差，为了让他们居中对齐。
                //     contentWrapper.style.left = left + width + window.scrollX + 'px'
                //     if(height2>height){
                //         contentWrapper.style.top = top - (height2-height)/2 + window.scrollY + 'px'
                //     }
                //     if(height2<height){
                //         contentWrapper.style.top = top + (height-height2)/2 + window.scrollY + 'px'
                //     }
                // }
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
                    else if(this.$refs.contentWrapper &&
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
        /*box-shadow: 0 0 3px rgba(0,0,0,0.5);*/
        filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));
        background:white;
        padding:.5em 1em;
        max-width: 20em;
        word-break: break-all;
        &::before,&::after {
            content: '';
            display: block;
            border: 10px solid transparent;
            width: 0px;
            height: 0px;
            position: absolute;
        }
        &.position-top{
            transform: translateY(-100%);
            margin-top:-10px;
            &::before,&::after{
                left:10px;
            }
            &::before{
                border-bottom:none;
                border-top-color: black;
                top:100%;
            }
            &::after{
                border-bottom:none;
                border-top-color: white;
                top:calc(100% - 1px);
            }
        }
        &.position-bottom{
            margin-top:10px;
            &::before,&::after{
                left:10px;
            }
            &::before{
                border-top:none;
                border-bottom-color: black;
                bottom:100%;
            }
            &::after{
                border-top:none;
                border-bottom-color: white;
                bottom:calc(100% - 1px);
            }
        }
        &.position-left{
            transform: translateX(-100%);
            margin-left:-10px;
            &::before,&::after{
                top:50%;
                transform: translateY(-50%);
            }
            &::before{
                border-right:none;
                border-left-color: black;
                left:100%;
            }
            &::after{
                border-right:none;
                border-left-color: white;
                left:calc(100% - 1px);
            }
        }
        &.position-right{
            margin-left:10px;
            &::before,&::after{
                top:50%;
                transform: translateY(-50%);
            }
            &::before{
                border-left:none;
                border-right-color: black;
                right:100%;
            }
            &::after{
                border-left:none;
                border-right-color: white;
                right:calc(100% - 1px);
            }
        }
    }
</style>