<template>
    <div>
        <meta itemprop="priceCurrency" :content="$store.state.currency.code" />
        <div class="price flex justify-center flex-wrap px-1 py-1 rounded priceWrapper" v-if="type=='simple'">
            <span v-if="price.comparePrice > 0">
                <span class="text-white line-through"> {{ $store.state.currency.symbol }}{{ getEntier(price.comparePrice) }}<sup>{{getDecimal(price.comparePrice)}}</sup></span>
            </span>
            <span class="flex w-1"></span>
            <b class="text-white">{{ $store.state.currency.symbol }}{{ getEntier(price.salePrice)}} <sup>{{getDecimal(price.salePrice)}}</sup></b>
            <meta itemprop="price" :content="price.salePrice" />
        </div>
        <!-- WHEN THE PRODUCT CONTAINS VARIANTS -->
        <div class="price flex justify-center flex-wrap px-2 py-1 rounded priceWrapper" v-else-if="variants.length > 0">
            <span v-if="variants[0].price.comparePrice > 0">
                <span class="text-white line-through"> {{ $store.state.currency.symbol }}{{ getEntier(variants[0].price.comparePrice) }}<sup>{{getDecimal(variants[0].price.comparePrice)}}</sup></span>
            </span>
            <span class="flex w-1"></span>
            <b class="text-white">{{ $store.state.currency.symbol }}{{ getEntier(variants[0].price.salePrice)}} <sup>{{getDecimal(variants[0].price.salePrice)}}</sup></b>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        type: String,
        price: Object,
        originalPrice: { type: Object, default: null },
        variants: { type: Array, default: [] }
    },
    data() {
        return {
            minPrice : this.type == 'variable' ? Math.min(...this.variants.map(v=>v.price.salePrice)) : 0,
            maxPrice : this.type == 'variable' ? Math.max(...this.variants.map(v=>v.price.salePrice)) : 0,
        }
    },
    methods:{
        getEntier(price){
            if(Number.isInteger(price))
            return price;
            else
            return price.toString().split(".")[0]
        },
        getDecimal(price){
            if(! Number.isInteger(price))
            return "." + price.toString().split(".")[1].slice(0, 2)
            else
            return "";
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Lobster&family=Rubik+Puddles&family=Rubik:wght@300&display=swap');
.priceWrapper{
    background-color: #4d2c21;
    /* font-family: "Lobster"; */
}
.price{
    font-family: "Rubik";
    font-size: 16px;
}
.compare-price{
    height: 0.2em;
    transform: rotate(-12deg);
    opacity: .5;
}
</style>