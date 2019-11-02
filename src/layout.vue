<template>
    <div class="layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'GuluLayout',
        data(){
            return {
                layoutClass:{
                    hasSider:false
                }
            }
        },
        mounted() {
                this.$children.forEach((vm)=>{//如果子组件里面有一个组件的名字（$options.name）是GuluSider,就改变class的布尔
                    if(vm.$options.name==='GuluSider'){
                        this.layoutClass.hasSider=true
                    }
                })
        }
    }
</script>

<style lang="scss" scoped>
    .layout{
        flex-grow:1;
        flex-direction: column;
        display: flex;
        &.hasSider{
            flex-direction: row;
        }
    }
</style>