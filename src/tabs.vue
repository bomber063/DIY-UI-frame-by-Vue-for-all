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
        methods:{
            checkChildren(){
                if(this.$children.length===0){
                    // throw new Error('tabs的子组件应该是tabs-head和tabs-body,但你没有写子组件')
                    console&&console.warn&&console.warn('tabs的子组件应该是tabs-head和tabs-body,但你没有写子组件')
                }
            },
            selectTab(){
                this.$children.forEach((vm)=>{
                    //第一次循环，因为有两个子组件，一个是head一个是body
                    if (vm.$options.name === 'GuluTabsHead') {
                        // console.log('第一次循环')
                        // console.log(vm)
                        vm.$children.forEach((childVm) => {
                            //第二次循环，因为有三个子组件都是item,但是name不一样。然后找到它的options里面的name和它props里面的name就找到对应的子组件了props可以省略。比如item.name
                            if (childVm.name === this.selected && childVm.$options.name === 'GuluTabsItem') {
                                // console.log('第二次循环')
                                // console.log(childVm.name)
                                // console.log(childVm.$el.getBoundingClientRect())
                                // console.log(childVm.$el)
                                this.eventBus.$emit('update:selected', this.selected, childVm)
                            }
                        })
                    }
                })
                // this.eventBus.$emit('update:selected',this.selected,this)
            }
        },
        mounted(){
            this.checkChildren();
            // console.log('eventBus')
            // console.log(this.eventBus)
            // console.log('this')
            // console.log(this)
                // this.$emit('update:selected','xxx')
                // this.$emit('update:selected','我是this.$emit触发的事件出来的数据')
                //下面是初始选中的selected
            this.selectTab()

        }
    }
</script>
<style>
    .tabs{

    }
</style>