<template>
    <div class="tabs-item">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsItem',
        disabled:{
            type:Boolean,
            default:false
        }
    }
</script>
<style>
    .tabs-item{

    }
</style>