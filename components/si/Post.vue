<template>
    <div class="">
            <nuxt-link :to="`/posts/${item.slug}`" :title="item.title" :aria-label="item.title" class="flex justify-center overflow-hidden">
                <si-image class="postImage"  :src="item.image ? item.image.url : null" :alt="item.title"/>
            </nuxt-link>

            <!-- <h4 class="px-2 my-2 storeName text-gray-400 one-line">{{storeName}}</h4> -->

            <nuxt-link :to="`/posts/${item.slug}`" :title="item.title" :aria-label="item.title">
                <h4 class="title w-full px-2 mb-4 one-line">{{ item.title }}</h4>
            </nuxt-link>

            <!-- <nuxt-link :to="`/posts/${item.slug}`" :title="item.title" :aria-label="item.title">
                <p>{{ item.excerpt }}</p>
            </nuxt-link> -->
            <div> </div>
        <nuxt-link :to="`/posts/${item.slug}`" class="px-3 p-2 bg-yellow-500 text-white rounded-2xl text-center" :title="item.title" :aria-label="item.title">
            <span>{{ $settings.sections.posts.button.text }}</span>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        item: Object
    },
    data(){
        return{
            storeName: this.$settings.sections.footer.copyright.store_name,

        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Lobster&family=Rubik+Puddles&family=Rubik:wght@500&display=swap');

.postImage{
    width: 100%;
    max-width: 300px;
    height: 200px;
    transition: transform 0.7s;
    overflow: hidden;
}
.postImage:hover{
    transform: scale(1.1);
}
.title{
    font-family: "Rubik";
}
</style>