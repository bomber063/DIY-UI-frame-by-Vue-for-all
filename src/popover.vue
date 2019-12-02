<template>
    <div class="popover" @click.stop="xxx">
        <div class="content-wrapper" v-if="visible" @click.stop>
        <slot name="content"></slot>
        </div>
        <slot></slot>
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
        .content-wrapper{
            position:absolute;
            bottom:100%;
            left:0;
            border:1px solid red;
            box-shadow: 0 0 3px rgba(0,0,0,0.5);
        }
    }
</style>