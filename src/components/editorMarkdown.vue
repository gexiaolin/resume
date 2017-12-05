<template>
    <div class="markdown-wrap">
        <div v-if="showInHtml" v-html="showCode"></div>
        <pre v-else v-text="showCode"></pre>
    </div>
</template>

<script>
    import marked from 'marked'

    export default {
        data () {
            return {
                showInHtml: true,
                code: `发现三金西瓜霜漱口水清新口气去除口臭去异味牙渍便携漱口液口腔清洁<strong class="price">9.99元（需用券）</strong>卖家商品页面描述：西瓜霜配方除口臭口气异味天猫商城当前券后价为9.99元，可...<a href="https://www.smzdm.com/p/7675705/" target="_blank" onclick="dataLayer.push({'event':'14100','name':'好价','pagetitle':'aaaaaa'})">阅读全文</a>

发现三金西瓜霜漱口水清新口气去除口臭去异味牙渍便携漱口液口腔清洁<strong class="price">9.99元（需用券）</strong>卖家商品页面描述：西瓜霜配方除口臭口气异味天猫商城当前券后价为9.99元，可...<a href="https://www.smzdm.com/p/7675705/" target="_blank" onclick="dataLayer.push({'event':'14100','name':'好价','pagetitle':'aaaaaa'})">阅读全文</a>

发现三金西瓜霜漱口水清新口气去除口臭去异味牙渍便携漱口液口腔清洁<strong class="price">9.99元（需用券）</strong>卖家商品页面描述：西瓜霜配方除口臭口气异味天猫商城当前券后价为9.99元，可...<a href="https://www.smzdm.com/p/7675705/" target="_blank" onclick="dataLayer.push({'event':'14100','name':'好价','pagetitle':'aaaaaa'})">阅读全文</a>

发现三金西瓜霜漱口水清新口气去除口臭去异味牙渍便携漱口液口腔清洁<strong class="price">9.99元（需用券）</strong>卖家商品页面描述：西瓜霜配方除口臭口气异味天猫商城当前券后价为9.99元，可...<a href="https://www.smzdm.com/p/7675705/" target="_blank" onclick="dataLayer.push({'event':'14100','name':'好价','pagetitle':'aaaaaa'})">阅读全文</a>

发现三金西瓜霜漱口水清新口气去除口臭去异味牙渍便携漱口液口腔清洁<strong class="price">9.99元（需用券）</strong>卖家商品页面描述：西瓜霜配方除口臭口气异味天猫商城当前券后价为9.99元，可...<a href="https://www.smzdm.com/p/7675705/" target="_blank" onclick="dataLayer.push({'event':'14100','name':'好价','pagetitle':'aaaaaa'})">阅读全文</a>`,
            }
        },
        computed: {
            showCode () {
                return this.showInHtml ? marked(this.code) : this.code;
            }
        }
    };
</script>
