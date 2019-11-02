<template>
    <transition name="slide">
        <div class="sider" v-if="visible">
            <slot></slot>
            <button @click="visible=false">close</button>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'GuluSider',
        data() {
            return {
                visible: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sider {
        position: relative;

        button {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .slide-enter-active, .slide-leave-active {
        transition: all .5s;
    }
    .slide-enter, .slide-leave-to {
        /*这个200px就是sider的宽度,但是作为用户可能并知道这个像素是多少，就需要通过JS来操作，目前暂时不用它，后续用到再说*/
        margin-left: -200px;
    }
</style>