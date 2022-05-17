<template>
<div class="flex justify-center">
    <div class="flex flex-wrap gap-4">
        <div v-for="(item,i) in items" :key="i" class="flex flex-col justify-around items-center bg-white overflow-hidden" :title="item.name">
            <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
                <si-image width="100" height="100" class="object-cover" :src="item.image ? item.image.src : null" :alt="item.name" srcset=""/>
            </nuxt-link>
            <nuxt-link :to="item.childrens.length > 0 ? `/collections/${item.slug}` : `/shop/${item.slug}`">
                <h3 class="p-2 text-center text-xl text-gray-400 colName">{{ item.name }}</h3>
            </nuxt-link>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            items:[]
        }
    },
    async fetch(){
      try{
          const filter = {};
          if(this.$settings.sections.collections.items.length > 0){
            this.items = this.$settings.sections.collections.items;
          }else{
            const { data } = await this.$storeino.collections.search(filter)
            this.items = data.results;
          }
      }catch(e){
        console.log({e});
      }
      this.loading = false;
      if(process.client){
        }
  },
}
</script>
<style scoped>
  .colName{
    font-family: "Open Sans",sans-serif;
    color: var(--primary-color);
    font-weight: bold;
  }
</style>