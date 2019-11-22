<template>
    <div class="tabs-item" @click="xxx" :class="classes">
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
        data(){
          return {active:false}
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
        computed: {
            classes() {
                return{active:this.active}
            }
        },
        created() {
            // console.log('爷爷给孙子的eventBus')
            // console.log(this.eventBus)
            this.eventBus.$on('update:selected',(xxxname)=>{
                // 下面的代码可以用webStorm优化，但是我这里为了自己以后看明白就不优化了
                if(this.name===xxxname){
                    // console.log('我是item'+`我${this.name}被选中了`)
                    this.active=true
                }
                else{
                    this.active=false
                    // console.log('我是item'+`我${this.name}没被选中了`)
                }
            })
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name,this)
            //    这里emit触发了update:selected事件，并且把this.name传给了上面的$on绑定的事件，
            }
        }
    }
</script>
<style scoped lang="scss">
    $blue:blue;
    .tabs-item{
        /*flex-grow:1;*/
        /*下面默认是1，如果长度超过本身宽度就让他换行，不然会超出显示器到外面去*/
        /*如果写成0，就是少了是不能压缩宽度的*/
        flex-shrink:0;
        padding:0 1em;
        cursor: pointer;
        height:100%;
        /*border:1px solid blue;*/
        display: flex;
        align-items: center;
        /*padding:10px 0px;*/
        &.active{
            /*background: red;*/
            color:$blue;
            font-weight:bold;
        }
    }
</style>