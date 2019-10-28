<template>
    <div class="col" :class="colClass"
        :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
    let validator = (value) => {
        let keys = Object.keys(value)//把对象value的key组成数组返回，并赋值给keys
        let valid = true
        keys.forEach((value) => {
            if (!['span', 'offset'].includes(value)) {//如果value是在数组['span','offset']里面的值就返回true
                valid = false

            }
        });
        return valid
    };
    export default {
        name:'GuluCol',
        props: {
            span: [Number, String],
            //    span:{
            // type:[Number,String]
            // },
            offset:[Number, String],
            phone:{
                type:Object,
                validator//这里的意思就是validator:validator，如果key和value一样就可以简写为validator
                // validator(value){
                //     console.log(value)
                //     let keys=Object.keys(value)//把对象value的key组成数组返回，并赋值给keys
                //     console.log(keys)
                //     let valid=true
                //     console.log("循环外面"+['span','offset'].includes(keys[0]))
                //     keys.forEach((value)=>{
                //         if(!['span','offset'].includes(value)){//如果value是在数组['span','offset']里面的值就返回true
                //             valid=false
                //             console.log('循环里面'+valid)
                //
                //         }
                //     })
                //     return valid
                // }
            },
            ipad:{
                type:Object,
                validator
            },
            narrowPc:{
                type:Object,
                validator
            },
            pc:{
                type:Object,
                validator
            },
            widePc:{
                type:Object,
                validator
            },
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
                let {span,offset,phone,ipad,narrowPc,pc,widePc}=this//这里增加phone

                return[
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`,
                    ... ( phone  ? [`col-phone-${phone.span}`,`offset-phone-${phone.offset}`]:[]),//因为三点与运算符是针对数组的，那么后面就需要加上一个空数组。
                    ... ( ipad ? [`col-ipad-${ipad.span}`,`offset-ipad-${ipad.offset}`]:[]),
                    ... ( narrowPc ? [`col-narrowPc-${narrowPc.span}`,`offset-narrowPc-${narrowPc.offset}`]:[]),
                    ... ( pc ? [`col-pc-${pc.span}`,`offset-pc-${pc.offset}`]:[]),
                    ... ( widePc ? [`col-widePc-${widePc.span}`,`offset-widePc-${widePc.offset}`]:[])
                ]//如果有phone就把phone里面的span和offset放到phoneClass里面去
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
        /*这个media查询是写在最下面，那么同样生效的同样的属性，上面的会被下面的覆盖掉，下面的样式优先级更高*/
        @media (max-width: 576px){
            $class-prefix: col-phone-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-phone-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 577px) and (max-width: 768px){
            $class-prefix: col-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 769px) and (max-width: 992px){
            $class-prefix: col-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 993px) and (max-width: 1200px){
            $class-prefix: col-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
        @media (min-width: 1201px){
            $class-prefix: col-width-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: $n / 24*100%;
                }
            }
            $class-prefix: offset-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    margin-left: $n / 24*100%;
                }
            }
        }
    }

</style>