<template>
    <div class="style-wrap" ref="styleWrap">
        <pre v-html="highlightedCode"></pre>
        <div class="work-style" v-html="workCode"></div>
    </div>
</template>

<script>
    import Prism from 'prismjs'

    export default {
        props: {
            code: String
        },
        computed: {
            highlightedCode () {
                return Prism.highlight(this.code, Prism.languages.css);
            },
            workCode () {
                return `<style>${this.code}</style>`;
            }
        },
        methods: {
            goBottom () {
                this.$refs.styleWrap.scrollTop = 999999;
            }
        }
    };
</script>

<style>
    .work-style {
        display: none;
    }

    .style-wrap {
        top: 0;
        left: 0;
    }

    .markdown-wrap{
        top: 0;
        right: 0;
    }
</style>
