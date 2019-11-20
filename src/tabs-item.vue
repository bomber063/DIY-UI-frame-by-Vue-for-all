<template>
    <div class="tabs-item" @click="xxx">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsItem',
        disabled:{
            type:Boolean,
            default:false
        },
        inject:['eventBus'],
        props:{
          disable:{
              type:Boolean,
              default: false
          },
          name:{
              type:[String,Number],
              // type:String|Number,
              required:true
          }
        },
        created() {
            // console.log('爷爷给孙子的eventBus')
            // console.log(this.eventBus)
            this.eventBus.$on('update:selected',(xxxname)=>{
                console.log(xxxname)
            })
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name)
            //    这里emit触发了update:selected事件，并且把this.name传给了上面的$on绑定的事件，
            }
        }
    }
</script>
<style>
    .tabs-item{

    }
</style>