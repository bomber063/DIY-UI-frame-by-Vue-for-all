<template>
    <div class="tabs">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        name:'GuluTabs',
        props:{
            selected:{
                type:String,
                required:true
            },
            direction:{
                type:String,
                default:'horizontal',
                validator(value){
                    return ['horizontal','vertical'].indexOf(value)>=0
                }

            }
        },
        data(){
            return {
                eventBus:new Vue()
            }
        },
        //provide选项应该是一个对象或返回一个对象的函数
        provide(){
            return{
                eventBus:this.eventBus
            }
        },
        created(){
            // console.log('eventBus')
            // console.log(this.eventBus)
            // console.log('this')
            // console.log(this)
                // this.$emit('update:selected','xxx')
                // this.$emit('update:selected','我是this.$emit触发的事件出来的数据')
                // this.eventBus.$emit('update:selected','我是this.eventBus.$emit触发的事件出来的数据')
        }
    }
</script>
<style>
    .tabs{

    }
</style>