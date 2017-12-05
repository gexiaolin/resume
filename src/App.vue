<template>
    <div id="app">
        <editorStyle :code="styleCode" ref="styleCompnent"></editorStyle>
        <editorMarkdown></editorMarkdown>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Promise from 'promise-polyfill';
    import jsPolyfill from './commons/js/jsPolyfill';
    import editorStyle from './components/editorStyle';
    import editorMarkdown from './components/editorMarkdown';

    Vue.use(jsPolyfill);

    export default {
        name: 'root',
        data () {
            return {
                styleNumber: 0,
                styleCode: '',
                styleString: [
                `* {
    transition: all ease .2s;
}

body {
    background: #f8f8f8;
}

.style-wrap {
    width: 44%;
    border: 1px solid #ccc;
    overflow: auto;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px 30px;
    background-color: #272823;
    color: #fff;

    position: absolute;
    left: 4%;
    top: 30px;
    bottom: 30px;
}

/* 来点代码高亮 */
.style-wrap pre {
    color: #fff;
}
.token.selector {
    color: #b3da4b;
}
.token.punctuation {
    color: #fff;
}
.token.property {
    color: #7fd4d4;
}

.markdown-wrap {
    width: 44%;
    border: 1px solid #ccc;
    overflow: auto;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px 30px;
    background-color: #fff;

    position: absolute;
    right: 4%;
    top: 30px;
    bottom: 30px;
}`]
            };
        },
        components: {
            editorStyle,
            editorMarkdown
        },
        mounted () {
            !window.Promise ? window.Promise = Promise : null;
            this.initResume();
        },
        methods: {
            async initResume () {
                await this.showStyle();
            },
            showStyle () {
                return new Promise((res, rej) => {
                    let interval = 30;
                    // 计算字符总数
                    let codeLength = this.styleString
                            /* 取需要展示的styleString前this.styleNumber个元素 */
                            .filter((_, index) => {
                                return index <= this.styleNumber;
                            })
                            /* 取每个元素的length */
                            .map(item => {
                                return item.length;
                            })
                            /* 计算所有元素的总length */
                            .reduce((a, b) => {
                                return a + b;
                            });
                    this.currenStyle = this.styleString[this.styleNumber];

                    let n = 0;
                    let timeFn = setInterval(() => {
                        this.getStyle(n, codeLength);
                        if (n < codeLength - 1) {
                            n += 1;
                        } else {
                            clearInterval(timeFn);
                        }
                    }, interval);

                });
            },
            /**
             * 拼接需要显示的style code
             * @param  {Number} n   需要拼接的第n个字符
             * @param  {Number} len 需要拼接的字符总长度
             * @return {String}     返回拼接字符
             */
            getStyle (n, len) {
                // 遇到换行scrollTop到最底部
                if (this.currenStyle[n] === '\n') {
                    this.$refs.styleCompnent.goBottom();
                }

                this.styleCode += this.currenStyle[n];
                this.$refs.styleCompnent.goBottom();
            }
        }
    };
</script>

<style lang="scss">
    @import 'src/commons/styles/base.scss';

    html, body {
        height: 100%;
    }
</style>
