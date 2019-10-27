<template>
    <div class="col" :class="colClass"
        :style="colStyle">
        <slot></slot>
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
        // },
        data(){
            // console.log(`在子组件col里面，因为gutter在data里面变成了${this.gutter}，所以我也要变化`)
            return {
                gutter:0
            }
        },
        computed:{
            colClass(){
                let {span,offset}=this
                return[
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`
                ]
            },
            colStyle(){
                // console.log(`在子组件col里面，因为gutter在computed里面变成了${this.gutter}，所以我也要变化`)
                return {
                    paddingLeft:this.gutter/2+'px',
                    paddingRight:this.gutter/2+'px'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col {
        /*width: 50%;*/

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