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
        mounted(){
            // console.log('eventBus')
            // console.log(this.eventBus)
            // console.log('this')
            // console.log(this)
                // this.$emit('update:selected','xxx')
                // this.$emit('update:selected','我是this.$emit触发的事件出来的数据')
                //下面是初始选中的selected
            this.$children.forEach((x)=>{
                //第一次循环，因为有两个子组件，一个是head一个是body
                if (x.$options.name === 'GuluTabsHead') {
                    // console.log('第一次循环')
                    // console.log(x)
                    x.$children.forEach((item) => {
                        //第二次循环，因为有三个子组件都是item,但是name不一样。然后找到它的options里面的name和它props里面的name就找到对应的子组件了props可以省略。比如item.name
                        if (item.name === this.selected && item.$options.name === 'GuluTabsItem') {
                            // console.log('第二次循环')
                            // console.log(item.name)
                            // console.log(item.$el.getBoundingClientRect())
                            // console.log(item.$el)
                            this.eventBus.$emit('update:selected', this.selected, item)
                        }
                    })
                }
            })
                // this.eventBus.$emit('update:selected',this.selected,this)
        }
    }
</script>
<style>
    .tabs{

    }
</style>