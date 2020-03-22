<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'GuluButtonGroup',
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

<style lang="scss" scoped>
    $border-radius:4px;
    .g-button-group {
        display: inline-flex;
        vertical-align: top;

        .g-button {
            border-radius: 0px;
            &:not(:first-child){margin-left:-1px;}
            &:first-child {
                border-bottom-left-radius: $border-radius;
                border-top-left-radius: $border-radius;
            }

            &:last-child {
                border-bottom-right-radius: $border-radius;
                border-top-right-radius: $border-radius;
            }
            &:hover{
                position: relative;
                z-index: 1;
            }
        }
    }
</style>