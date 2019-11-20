<template>
    <div class="tabs-body">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsBody',
        inject:['eventBus'],
        created() {
            // console.log('传给body的eventBus')
            // console.log(this.eventBus)
        }
    }

</script>
<style>
    .tabs-body{

    }
</style>