<template>
    <div class="tabs-pane">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsPane'
    }
</script>
<style>
    .tabs-pane{

    }
</style>