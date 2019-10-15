<template>
        <svg class="g-icon">
            <use :xlink:href="`#i-${name}`"></use>
        </svg>
</template>
<script>
    import './svg'
    export default {
        props:['name']
    }
</script>
<style lang="scss">
    .g-icon {
        vertical-align: -0.15em;
        width: 1em;
        height: 1em;
    }
</style>