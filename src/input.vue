<template>
    <div class="wrapper">
        <input v-bind:value='valuea' :disabled='disableda'   type="text">
    </div>
</template>

<script>
    export default {
        name:'GuluInput',
        props:{
            valuea: {
                type: String
            },
            disableda:{
                type:Boolean,
                default:false
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
            &[disabled]{
                border-color: #ccc;
                color: #ccc;
            }

        }

    }
</style>