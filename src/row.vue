<template>
    <div class="row" :style="rowStyle">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'GuluRow',
        props:{
            gutter:[Number,String]
        },
        created(){
            console.log('row created')
        },
        computed:{
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
                console.log('row mounted，此时循环把gutter传递给子组件col'+x.gutter)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .row{
        display: flex;
    }
</style>