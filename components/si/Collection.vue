<template>
 <div class="flex flex-col items-center justify-center gap-2 shadow-xl">
        <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
            <si-image width="250" height="250" class="object-cover" :src="item.image ? item.image.src : null" :alt="item.name" srcset=""/>
        </nuxt-link>
        <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
            <h3 class="text-center text-xl text-primary font-semibold">{{ item.name }}</h3>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    }
}
</script>