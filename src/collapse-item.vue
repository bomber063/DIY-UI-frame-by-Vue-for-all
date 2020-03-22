<template>
    <div class="collapseItem">
        <div class="title" @click="toggle">
           {{title}}
            <g-icon :class="{'down-icon':open}" name="right"></g-icon>
        </div>
        <transition name="fade">

        <div class="content" v-if="open">
                <slot></slot>
        </div>
        </transition>

    </div>
</template>

<script>
    import Icon from './icon'
    export default {
        components:{
          'g-icon':Icon
        },
        name: "GuluCollapseItem",
        props:{
            title:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required: true
            }
        },
        data(){
            return{
                open:false
            }
        },
        inject:['eventBus'],
        mounted() {
            this.eventBus&&this.eventBus.$on('update:selected',(names)=>{//这里是eventBus上绑定update:selected这个事件。这里的vm是下面toggle的emit之后传过来的this。
                    if(names.indexOf(this.name)>=0){//如果触发的vm不等于本身的this，那么就关闭本身的this。本身有三个this，有一个是vm等于本身的this，另外两个都关闭。
                        this.open=true
                    }
                    else{
                        // if(this.single){
                            this.open=false
                        // }
                    }
                })
        },
        methods:{
            toggle(){//toggle里面的this跟上面mounted的里面的this是不同的
                if(this.open){
                    this.open=false
                    this.eventBus&&this.eventBus.$emit('update:removeSelected',this.name)//这里是在eventBus上触发update:selected这个事件。这里的this是触发事件的this，也就是点击了哪个就是哪个,因为这个toggle是前面的@click绑定的事件点击触发后执行的函数
                }
                else{
                    //为了避免重复打开所以下面的一行代码注释了，不然会导致打开两次
                    // this.open=true
                    this.eventBus&&this.eventBus.$emit('update:addSelected',this.name)//这里是在eventBus上触发update:selected这个事件。这里的this是触发事件的this，也就是点击了哪个就是哪个,因为这个toggle是前面的@click绑定的事件点击触发后执行的函数
                }
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
            justify-content: space-between;
            padding:12px 16px;
            > .down-icon {
                transform: rotate(90deg);
            }
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
            padding:16px;
            overflow: hidden;
            box-sizing: border-box;
        }
        & .fade-enter-active{
            animation: slide-open .3s ease-in-out;
        }
        & .fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
            animation: slide-close .3s ease-in-out;
        }
    }

    @keyframes slide-open {
        0% {
            height: 0px;
            padding: 0px;
        }
        100% {
            height: auto;
            padding: 16px;
        }
    }

    @keyframes slide-close {
        0% {
            height: auto;
            padding: 16px;
        }
        100% {
            height: 0px;
            padding: 0px;
        }
    }
</style>