<template>
    <div id="app">
        <editorStyle :code="styleCode" ref="styleCompnent"></editorStyle>
        <editorMarkdown :code="markDownCode" :showInHtml="showInHtml" ref="markDownCompnent"></editorMarkdown>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Promise from 'promise-polyfill';
    import editorStyle from './components/editorStyle';
    import editorMarkdown from './components/editorMarkdown';

    export default {
        name: 'root',
        data () {
            return {
                styleCode: '',
                markDownCode: '',
                currentArea: 'style',
                showInHtml: false,
                styleString: [
`/*
 *欢迎来到我的github
 *这里可以了解到我的基本信息
 *不过页面好像有点。。
 *emm..加点样式吧
*/
* {
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

/*
 *好多了，再加点代码高亮吧
*/
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

/*
 *稍微处理一下文案部分吧
 */
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

`# 个人信息
---
### 基本资料
> 姓名：**葛潇林**    
> 年龄：**28**    
> 邮箱：hina_ge@163.com   
> 现工作于[什么值得买](https://www.smzdm.com)   

### 技能掌握    

* 熟练使用\`html5 + css3\`，原生\`javascript\`书写，\`sass/less\`预处理语言
* 熟练使用\`jQuery + ejs\`模版进行模块化开发
* 熟练使用\`vue\`全家桶进行前后分离的应用开发
* 熟练配置及使用\`gulp\`、\`webpack\`等前端自动化工具， 对现有架构进行开发/生产环境的构建／打包优化
* 熟练使用\`es6\`语法书写js逻辑，通过\`babel\`相关plugin进行生产环境的代码兼容转化
* 熟练开发微信小程序
* 对app的\`hybrid\`混合开发模式有丰富经验，熟悉前端到客户端的交互方式
* 熟悉\`node.js + express / koa2\`及相关中间件进行服务搭建
* 代码书写整洁规范，可通过配置\`eslint\`规范团队代码格式
* ......

### 项目经验

* [什么值得买](https://www.smzdm.com)PC及WAP站好价/首页相关页面的开发及维护（jQuery + ejs + sass, gulp + webpack）
* [什么值得买](https://www.smzdm.com)app好价(hybrid)及优惠券(h5)模块的开发及维护（vue）
* [联合电动](https://www.i-ev.com)PC及WAP站技术选型，开发及维护（jQuery + require.js）
* **聚能充**微信公众号／小程序／生活号／app内h5页开发及维护
* ...... 
`,

`
/** 
 *  emmmmm.......
 *  格式不太友好
 *  转成html的熟悉格式吧
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
                    let interval = 20;
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
