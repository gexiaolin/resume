<template>
    <div class="markdown-wrap" ref="markdownWrap">
        <div v-if="showInHtml" v-html="showCode"></div>
        <pre v-else v-text="showCode"></pre>
    </div>
</template>

<script>
    import marked from 'marked'

    export default {
        props: {
            code: String,
            showInHtml: Boolean
        },
        computed: {
            showCode () {
                return this.showInHtml ? marked(this.code) : this.code;
            }
        },
        methods: {
            goBottom () {
                this.$refs.markdownWrap.scrollTop = 999999;
            }
        }
    };
</script>
