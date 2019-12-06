<template>
    <div class="popover" @click="onClick">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
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
            onClick(event) {
                if(this.$refs.triggerWrapper.contains(event.target)){//这个event是整个popover组件里面的事件，那么event.target就是popover组件里面的元素，当然它包括了triggerWrapper所对应的元素
                    console.log(`我是button添加的event.target`)
                    this.visible = !this.visible;
                    console.log('下面的button被点击')
                    if (this.visible === true) {
                        setTimeout(() => {//这里由于Vue版本不通，所以把this.$nextTick修改为setTimeout来延迟
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
                // this.visible = !this.visible;

                // else{
                //     console.log('关闭')
                // }
            }
        }

    }
</script>

<style scoped lang="scss">
    .popover{
        display: inline-block;
        vertical-align: top;
        position:relative;
    }
    .content-wrapper{
        position:absolute;
        border:1px solid red;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
        transform: translateY(-100%);
    }
</style>