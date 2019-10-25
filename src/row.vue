<template>
    <div class="row" :style="{marginLeft:-gutter/2+'px',marginRight:-gutter/2+'px'}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'GuluRow',
        props:{
            gutter:[Number,String]
        },
        // created(){
        //     console.log('row created')
        // },
        mounted(){
            this.$children.forEach((x)=>{
                x.gutter=this.gutter
                console.log(x.gutter)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .row{
        display: flex;
    }
</style>