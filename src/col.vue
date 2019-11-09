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
            //我这里把includes修改为indexOf
            if (['span', 'offset'].indexOf(value)===-1) {//如果value是在数组['span','offset']里面的值就返回true
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
            // phone:{
            //     type:Object,
            //     validator//这里的意思就是validator:validator，如果key和value一样就可以简写为validator
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
            // },
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
        methods:{
                createClasses(obj,str=''){//这里的str=''是默认空字符串，也就是如果不传str就默认是''
                    return obj ? [`col-${str}${obj.span}`,`offset-${str}${obj.offset}`]:[]
                }
            // createClasses(obj,str=''){//这里的str=''是默认空字符串，也就是如果不传str就默认是''
            //     if(!obj){return []}
            //     let array=[]
            //     if(obj.span){array.push(`col-${str}${obj.span}`)}
            //     if(obj.offset){array.push(`offset-${str}${obj.offset}`)}
            //     return array
            // }
        },
        computed:{
            colClass(){
                let {span,offset,ipad,narrowPc,pc,widePc}=this//这里增加phone
                // let x=(obj,str='')=>{//这里的str=''是默认空字符串，也就是如果不传str就默认是''
                //     return obj ? [`col-${str}${obj.span}`,`offset-${str}${obj.offset}`]:[]
                // }
                let {createClasses}=this
                return[
                    ...createClasses({span,offset}),//这个意思就是...createClasses({span:span,offset:offset})
                    ...createClasses(ipad,'ipad-'),
                    ...createClasses(narrowPc,'narrow-pc-'),
                    ...createClasses(pc,'pc-'),
                    ...createClasses(widePc,'wide-pc-')
                    // span&&`col-${span}`,
                    // offset&&`offset-${offset}`,
                    // ... ( ipad ? [`col-ipad-${ipad.span}`,`offset-ipad-${ipad.offset}`]:[]),
                    // ... ( narrowPc ? [`col-narrow-pc-${narrowPc.span}`,`offset-narrow-pc-${narrowPc.offset}`]:[]),
                    // ... ( pc ? [`col-pc-${pc.span}`,`offset-pc-${pc.offset}`]:[]),
                    // ... ( widePc ? [`col-wide-pc-${widePc.span}`,`offset-wide-pc-${widePc.offset}`]:[])
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
        @media (min-width: 577px){
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
        @media (min-width: 769px){
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
        @media (min-width: 993px){
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
            $class-prefix: col-wide-pc-;
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