<template>
    <div class="tabs-head">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
<!--        所有的tabs-item的会出现在上面,其他的插槽会出现在下面-->
            <slot name=actions></slot>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsHead'
    }
</script>
<style>
    .tabs-head{

    }
</style>