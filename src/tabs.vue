<template>
    <div class="tabs">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
<script>
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
        created(){
                // this.$emit('update:selected','xxx')
        }
    }
</script>
<style>
    .tabs{

    }
</style>