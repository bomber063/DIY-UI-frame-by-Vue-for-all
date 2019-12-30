<template>
        <button class="g-button" v-bind:class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')">
<!--            <svg v-if="icon" class="icon" >-->
<!--                <use :xlink:href="`#i-${icon}`"></use>-->
<!--            </svg>-->
            <g-icon v-if="loadings" :name="String('loading')" class="loading-css icon"></g-icon>
            <g-icon class="icon" v-if="icon&&!loadings" :name="icon"></g-icon>
            <div class="g-button-content">
                <slot></slot>
            </div>
        </button>
</template>
<script>
    import Icon from './icon'
    export default {
        name:'GuluButton',
        components:{
          'g-icon':Icon
        },
        // props:['icon','icon-position']
        props: {
            'icon': {},
            'loadings':{
              type:Boolean,
              default: false
            },
            'iconPosition': {
                type: String,
                default: 'left',
                validator(xxx) {
                    return xxx === 'left' || xxx === 'right';
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    $border-radius:4px;
    $border-color:#999;
    $button-bg: white;
    $button-active-bg: #eee;
    $color:#333;
    $border-color-hover:#666;
    $font-size: 14px;
    $button-height:32px;
    .g-button{
        vertical-align: top;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 1em;
        font-size: $font-size;
        height:$button-height;
        border-radius: $border-radius;
        border:1px solid $border-color;
        background: $button-bg;
        /*font-size: var(--font-size);*/
        /*height:var(--button-height);*/
        /*border-radius:var(--border-radius);*/
        /*border:1px solid var(--border-color);*/
        /*background: var(--button-bg);*/
        &:hover{
            border-color: $border-color-hover;
        }
        &:active{
            background: $button-active-bg;
        }
        &:focus{
            outline: none;//这里是不显示默认蓝色的边框，后续在加focus的样式
        }
        & .icon{
            order:1;
            margin-right:.1em;
            /*fill: currentColor;*/
            /*overflow: hidden;*/
        }
        & .g-button-content{
            order:2;
        }
        &.icon-right{
            & .icon{
                order:2;
                margin-left:.1em;
                margin-right:0;
            }
            & .g-button-content{
                order:1;
            }
        }
        & .loading-css{
            animation: rotate 1.5s linear infinite;
        }
    }
    @keyframes rotate {
        from{
            transform: rotate(0deg);
        }
        to{
            transform:rotate(360deg);
        }
    }
</style>