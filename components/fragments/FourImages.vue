<template>
<div class="grid wrapper container my-2" v-if="fourImages.active">
    <div class="p-2  overflow-hidden" :class="id" v-for="(item,id) in fourImages.items" :key="id"> 
        <img :src="item.image.src" /> 
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
           fourImages:this.$settings.sections.fourImages
        }
    }
}
</script>
<style scoped>

  .wrapper{
      display: grid;
      grid-template-columns: auto auto auto;
  }
  .item_1{
      grid-column: 2 / 4;
  }
  .item_2{
      grid-column: 1 / 3;
  }
div img{
    width: 100%;
    height: 100%;
    transition: transform 1s;
}
div img:hover{
    transform: scale(1.05);
}
</style>