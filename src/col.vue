<template>
    <div class="col" :class="[`col-${span}`]">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name:'GuluCol',
        props: {
            // span: [Number, String]
               span:{
            type:[Number,String]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col {
        border: 1px solid red;
        height: 100px;
        background: grey;
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
    }

</style>