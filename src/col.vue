<template>
    <div class="col" :class="[span&&`col-${span}`,offset&&`offset-${offset}`]"
        :style="{paddingLeft:gutter/2+'px',paddingRight:gutter/2+'px'}">
        <div style="border:1px solid green;height:100px;">
        <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'GuluCol',
        props: {
            span: [Number, String],
            //    span:{
            // type:[Number,String]
            // },
            offset:[Number, String],
        },
        // created(){
        //     console.log('col created')
        // },
        // mounted(){
        //     console.log('col mounted')
        // }
        data(){
            return {
                gutter:0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col {
        width: 50%;

        /*下面的就是*/
        /*.col.col-1*/
        /*.col.col-2等等一直到24*/
        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: $n / 24*100%;
            }
        }
        $class-prefix: offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                margin-left: $n / 24*100%;
            }
        }
    }

</style>