<template>
    <div class="tabs-pane">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsPane',
        inject:['eventBus'],
        // data(){
        //     return {
        //         name:{type:[String,Number],
        //         required:true}
        //     }
        // },
        created() {
            // console.log('传给pane的eventBus')
            // console.log(this.eventBus)
            this.eventBus.$on('update:selected',(xxxname)=>{
                // this.name=xxxname
                console.log('我是pane'+xxxname)
                console.log('我是pane'+this.name)
            })
        },
    }
</script>
<style>
    .tabs-pane{

    }
</style>