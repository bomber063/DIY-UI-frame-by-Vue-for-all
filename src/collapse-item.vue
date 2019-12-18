<template>
    <div class="collapseItem">
        <div class="title" @click="toggle">
            {{title}}
        </div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCollapseItem",
        props:{
            title:{
                type:String,
                required:true
            }
        },
        data(){
            return{
                open:false
            }
        },
        inject:['eventBus'],
        mounted() {
            this.eventBus&&this.eventBus.$on('update:selected',(vm)=>{//这里是eventBus上绑定update:selected这个事件。这里的vm是下面toggle的emit之后传过来的this。
                    // console.log('vm')
                    // console.log(vm)
                    // console.log('this')
                    // console.log(this)
                    if(vm!==this){//如果触发的vm不等于本身的this，那么就关闭本身的this。本身有三个this，有一个是vm等于本身的this，另外两个都关闭。
                        this.close()
                    }
                })
        },
        methods:{
            toggle(){//toggle里面的this跟上面mounted的里面的this是不同的
                if(this.open){
                    this.open=false
                    console.log(this)
                }
                else{
                    this.open=true
                    this.eventBus&&this.eventBus.$emit('update:selected',this)//这里是在eventBus上触发update:selected这个事件。这里的this是触发事件的this，也就是点击了哪个就是哪个,因为这个toggle是前面的@click绑定的事件点击触发后执行的函数
                    console.log(this)
                }
            },
            close(){
                this.open=false
            }
        }
    }
</script>

<style scoped lang="scss">
    $grey:#ddd;
    $border-radius:4px;
    .collapseItem{
        > .title{
            border: 1px solid $grey;
            /*border-radius: $border-radius;*/
            /*为了与最外面的对齐，所以都往里面缩了1px*/
            margin-top: -1px;
            margin-left: -1px;
            margin-right: -1px;
            min-height: 32px;
            display: flex;
            align-items: center;
            padding:0 8px;
        }
        &:first-child{
            > .title{
                border-top-right-radius:$border-radius;
                border-top-left-radius:$border-radius;
            }
        }
        &:last-child{
            > .title:last-child{
                border-bottom-right-radius:$border-radius;
                border-bottom-left-radius:$border-radius;
            }
        }
        > .content{
            padding:8px;
        }
    }
</style>