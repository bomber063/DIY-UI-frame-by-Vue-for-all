<template>
    <div>
        <g-button>默认按钮</g-button>
        <g-button icon="setting">默认按钮</g-button>
        <g-button :loadings="true">默认按钮</g-button>
        <g-button disabled >默认按钮</g-button>
        <pre><code>{{content}}</code></pre>
    </div>
</template>

<script>
    import Button from '../../../src/button'

    export default {
        components:{
            // gButton:Button
            'g-button':Button
        },
        data() {
            return {
                content: `
                <g-button>默认按钮</g-button>
                <g-button icon="setting">默认按钮</g-button>
                <g-button :loadings="true">默认按钮</g-button>
                <g-button disabled >默认按钮</g-button>
            `.replace(/\t+| +/g, '').trim()
            }
        }
    }
</script>