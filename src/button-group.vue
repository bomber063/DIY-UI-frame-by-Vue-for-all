<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        mounted(){
            // console.log(this.$el.children)
            for(let node of this.$el.children){
                if(node.nodeName.toLowerCase()!=='button'){
                    console.warn(`g-button-group的子元素应该全是g-button元素,但是你使用了${node.nodeName.toLowerCase()}元素`)
                }
            }
        }
    }
</script>

<style lang="scss">
    .g-button-group {
        display: inline-flex;
        vertical-align: top;

        .g-button {
            border-radius: 0px;
            &:not(:first-child){margin-left:-1px;}
            &:first-child {
                border-bottom-left-radius: var(--border-radius);
                border-top-left-radius: var(--border-radius);
            }

            &:last-child {
                border-bottom-right-radius: var(--border-radius);
                border-top-right-radius: var(--border-radius);
            }
            &:hover{
                position: relative;
                z-index: 1;
            }
        }
    }
</style>