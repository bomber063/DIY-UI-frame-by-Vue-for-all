<template>
    <div class="row" :style="rowStyle" :class="rowClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'GuluRow',
        props:{
            gutter:[Number,String],
            align:{
                type:String,
                validator(value){
                    //           我这里把includes修改为indexOf
                    return['left','right','center'].indexOf(value)>=0//下面的也是一样的效果。
                    // return['left','right','center'].indexOf(value)!==-1
                }
            }
        },
        // created(){
        //     console.log('row created')
        // },
        computed:{
            rowClass(){
                let {align}=this
                return [ align &&`align-${align}` ]
            },
            rowStyle(){
                let {gutter}=this
                return{
                    marginLeft:-gutter/2+'px',
                    marginRight:-gutter/2+'px'
                }
            }
        },
        mounted(){
            this.$children.forEach((x)=>{
                x.gutter=this.gutter
                // console.log('row mounted，此时循环把gutter传递给子组件col'+x.gutter)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .row{
        display: flex;
        flex-wrap:wrap;
        &.align-right{
            justify-content: flex-end;
        }
        &.align-left{
            justify-content: flex-start;
        }
        &.align-center{
            justify-content: center;
        }
    }
</style>