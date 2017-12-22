<template>
    <div id="app">
        <editorStyle :code="styleCode" ref="styleCompnent"></editorStyle>
        <editorMarkdown :code="markDownCode" :showInHtml="showInHtml" ref="markDownCompnent"></editorMarkdown>
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
                styleCode: '',
                markDownCode: '',
                currentArea: 'style',
                showInHtml: false,
                styleString: [
`* {
    -webkit-transition: all ease .2s;
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

/* 代码高亮 */
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
}`,
`# 这是h1 #
## 这是h2 ##
### 这是h3 ###
***
[这是链接](https://www.smzdm.com)   
[这是链接](https://www.smzdm.com)   
[这是链接](https://www.smzdm.com)   
[这是链接](https://www.smzdm.com)   
[这是链接](https://www.smzdm.com)   
*tips*   
you can use <code>html</code> tag   
you can use <code>html</code> tag   
you can use <code>html</code> tag   
you can use <code>html</code> tag   
you can use \`html\` tag   
`,
`
/** 
 *  emmmmm.......
 *  格式不太友好
 *  转成html
 */`
                ]
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
                await this.showStyle(0, 'style');
                await this.showStyle(1, 'md');
                await this.showStyle(2, 'style');
                this.showInHtml = true;
            },
            showStyle (num, area) {
                this.currentArea = area;
                return new Promise((res, rej) => {
                    let interval = 10;
                    // 计算字符总数
                    let codeLength = this.styleString
                            /* 取需要展示的styleString前index个元素 */
                            .filter((_, index) => {
                                return index === num;
                            })
                            /* 取每个元素的length */
                            .map(item => {
                                return item.length;
                            })
                            /* 计算所有元素的总length */
                            .reduce((a, b) => {
                                return a + b;
                            });
                    this.currenStyle = this.styleString[num];

                    let n = 0;
                    let timeFn = setInterval(() => {
                        this.getStyle(n, codeLength);
                        if (n < codeLength - 1) {
                            n += 1;
                        } else {
                            clearInterval(timeFn);
                            res();
                        }
                    }, interval);

                });
            },
            /**
             * 拼接需要显示的style code
             * @param  {Number} n    需要拼接的第n个字符
             * @param  {Number} len  需要拼接的字符总长度
             * @return {String}      返回拼接字符
             */
            getStyle (n, len) {
                let handleDom = this.currentArea === 'style' ? this.$refs.styleCompnent : this.$refs.markDownCompnent;

                this.$nextTick(() => {
                    // 遇到换行scrollTop到最底部
                    if (this.currenStyle[n] === '\n') {
                        handleDom.goBottom();
                    }

                    this.currentArea === 'style' ? this.styleCode += this.currenStyle[n] : this.markDownCode += this.currenStyle[n];
                    handleDom.goBottom();
                });
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
