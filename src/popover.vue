<template>
    <div class="popover" @click.stop="xxx">
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
            xxx() {
                this.visible = !this.visible;
                if (this.visible === true) {
                    this.$nextTick(() => {
                        let {width, height, left, top} = this.$refs.triggerWrapper.getBoundingClientRect()
                        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                        document.body.appendChild(this.$refs.contentWrapper)
                    });
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