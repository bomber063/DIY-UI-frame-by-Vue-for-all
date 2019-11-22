<template>
    <div class="tabs-head">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
<!--        所有的tabs-item的会出现在上面,其他的插槽会出现在下面-->
        <div class="actions-wrapper">
            <slot name=actions></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsHead',
        inject:['eventBus'],
        created(){
            // console.log('爷爷给爸爸的eventBus')
            // console.log(this.eventBus)
            this.$emit('update:selected','我是this.$emit触发的事件出来的数据')

        }
    }
</script>
<style scoped lang="scss">
    $tab-height:40px;
    .tabs-head{
        display: flex;
        height:$tab-height;
        justify-content: flex-start;
        align-items: center;
        border:1px solid red;
        > .actions-wrapper{
            margin-left:auto;
        }
    }
</style>