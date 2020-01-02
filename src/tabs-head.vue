<template>
    <div class="tabs-head" ref="head">
<!--        如果这里不用slot插槽，会被Vue自动删除-->
        <slot></slot>
<!--        所有的tabs-item的会出现在上面,其他的插槽会出现在下面-->
        <div ref="line" class="line"></div>
        <div class="actions-wrapper">
            <slot name=actions></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'GuluTabsHead',
        inject:['eventBus'],
        mounted(){
            // console.log('爷爷给爸爸的eventBus')
            // console.log(this.eventBus)
            // this.$emit('update:selected','我是this.$emit触发的事件出来的数据')
            this.eventBus.$on('update:selected',(name,vm)=> {
                //left是点击的item组件的距离视口左边的距离
                let {width,height,top,left}=vm.$el.getBoundingClientRect();
                //left2是head组件距离视口左边的距离
                let {left: left2} = this.$refs.head.getBoundingClientRect()
                this.$refs.line.style.width=`${width}px`;
                //item在head里面，那么肯定是item距离左边视口要大，这部分大的就是多余的，减去这部分多余的就符合了距离要求了
                this.$refs.line.style.left=`${left-left2}px`;
            })
        }
    }
</script>
<style scoped lang="scss">
    $tab-height:40px;
    $blue:blue;
    $border-color:#ddd;
    .tabs-head{
        display: flex;
        height:$tab-height;
        justify-content: flex-start;
        /*align-items: center;*/
        /*border:1px solid red;*/
        border-bottom:1px solid $border-color;
        position:relative;
        > .line{
            position:absolute;
            bottom:0;
            border-bottom:1px solid $blue;
            /*width:100px;*/
            /*transform:translateX(127px);*/
            transition: all 350ms;
        }
        > .actions-wrapper{
            margin-left:auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding:0 1em;
        }
    }
</style>