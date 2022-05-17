<template>
    <div class="container my-5" v-if="item">
        <div class="m-2 mb-5">
            <h2 class="text-3xl text-center upsellTitle">{{ $settings.sections.product.upsell.title }}</h2>
        </div>
        <div class="flex flex-wrap">
            <div v-for="(product, i) in item.products" :key="i" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <si-product :item="product" :upsell="item"></si-product>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: { type: Object, default: null },
    }
}
</script>
<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Lobster&family=Rubik+Puddles&family=Rubik:wght@300&display=swap'); */
  .upsellTitle{
    font-family: "Lobster";
  }
</style>