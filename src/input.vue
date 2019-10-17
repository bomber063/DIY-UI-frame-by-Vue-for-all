<template>
    <div class="wrapper" :class="{error:errora}">
        <input v-bind:value='valuea' :disabled='disableda' :readonly="readonlya" type="text">
        <template v-if="errora">
            <Icon name="setting"></Icon>
            <span>{{errora}}</span>
        </template>
    </div>
</template>

<script>
    import Icon from './icon'
    console.log(Icon)
    export default {
        components:{Icon},
        name:'GuluInput',
        props:{
            valuea: {
                type: String
            },
            disableda:{
                type:Boolean,
                default:false
            },
            readonlya:{
                type:Boolean,
                default: false
            },
            errora:{
                type:String
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*--button-height:32px;*/
    /*--font-size:14px;*/
    /*--button-bg:white;*/
    /*--button-active-bg:#eee;*/
    /*--border-radius:4px;*/
    /*--color:#333;*/
    /*--border-color:#999;*/
    /*--border-color-hover:#666;*/
    $height:32px;
    $border-color:#999;
    $border-color-hover:#666;
    $border-radius:4px;
    $font-size:14px;
    $box-shadow-color:rgba(0,0,0,0.5);
    $red:#F1453D;
    .wrapper{
        font-size:$font-size;
        display: inline-block;
        >input{
            height:$height;
            border:1px solid $border-color;
            border-radius:$border-radius;
            padding:0 8px;
            font-size:inherit;
            &:hover{
                border-color:$border-color-hover;
            }
            &:focus{
                box-shadow:inset 0 1px 3px $box-shadow-color;
                outline: none;
            }
            &[disabled],&[readonly]{
                border-color: #ccc;
                color: #ccc;
                cursor: not-allowed;
            }
        }
        &.error{
            > input{
                border-color:$red;
            }
        }

    }
</style>