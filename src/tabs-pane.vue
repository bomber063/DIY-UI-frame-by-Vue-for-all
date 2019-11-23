<template>
    <div class="tabs-pane" :class="classes" v-if="active">
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
        data(){
            return {active:false}
        },
        props:{
            name:{
                type:[String,Number],
                // type:String|Number,
                required:true
            }
        },
        computed: {
            classes() {
                return{active:this.active}
            }
        },
        created() {
            // console.log('传给pane的eventBus')
            // console.log(this.eventBus)
            this.eventBus.$on('update:selected',(xxxname)=>{
                if(this.name===xxxname){
                    this.active=true
                    // console.log('我是pane'+`我${this.name}被选中了`)
                }
                else{
                    this.active=false
                    // console.log('我是pane'+`我${this.name}没被选中了`)
                }
                // this.name=xxxname
                // console.log('我是pane'+xxxname)
                // console.log('我是pane'+this.name)
            })
        },
    }
</script>
<style lang="scss" scoped>
    .tabs-pane{
        &.active{
             /*background: red;*/
         }
    }
</style>