<template>
    <div class="tabs-head">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
<!--        所有的tabs-item的会出现在上面,其他的插槽会出现在下面-->
        <div ref="line" class="line"></div>
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
            // this.$emit('update:selected','我是this.$emit触发的事件出来的数据')
            this.eventBus.$on('update:selected',(name,vm)=> {
                console.log(name);
                console.log(vm.$el)
            })
        }
    }
</script>
<style scoped lang="scss">
    $tab-height:40px;
    $blue:blue;
    .tabs-head{
        display: flex;
        height:$tab-height;
        justify-content: flex-start;
        align-items: center;
        border:1px solid red;
        position:relative;
        > .line{
            position:absolute;
            bottom:0;
            border-bottom:1px solid $blue;
            width:100px;
        }
        > .actions-wrapper{
            margin-left:auto;
        }
    }
</style>