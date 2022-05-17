<template>
    <div class="container p-2 pt-0">
        <div class="relative overflow-hidden md:w-full">
         
                <div class="flex image relative  slider-item" :class="'last'" v-if="lastItem">
                    <si-image class="w-full h-full object-cover" :src="lastItem.image ? lastItem.image.src: $store.state.defaults.sliderImage" :alt="lastItem.title"/>
                    <div class="flex absolute bottom-0 p-2">
                        <span v-for="(x,y) in Object.keys(banner.items)" :key="y" :class="y==activeIndex ?'bg-gray-200': ''" class="w-4 h-4 rounded-full bg-white mx-1 flex cursor-pointer" @click="activeIndex=y"></span>
                    </div>
                </div>
            <!-- SLIDE ITEMS HANDLE -->
            <template v-for="(key,i) in Object.keys(banner.items)">
                <div class="slider-item relative" :class="i==activeIndex ? 'active': ''" :key="i">
                    <div class="image w-full h-full">
                        <si-image  class="object-cover h-full w-full" :src="banner.items[key].image ? banner.items[key].image.src : $store.state.defaults.sliderImage" :alt="banner.items[key].title"/>
                        <div class="flex absolute bottom-0 p-2">
                            <span v-for="(x,y) in Object.keys(banner.items)" :key="y" :class="y==activeIndex ?'bg-gray-200': ''" class="w-4 h-4 rounded-full bg-white mx-1 flex cursor-pointer" @click="animate(y)"></span>
                        </div>
                    </div>
                    <div class="descWrapper container" >
                        <h1 class="desctitle" :class="i==activeIndex ? 'titleActive': ''">{{ banner.items[key].title }}</h1>
                        <p class="mb-2 description">{{ banner.items[key].description }}</p>
                        <router-link class="bg-red-600 text-white flex px-5 py-2 my-5 justify-center rounded-2xl" v-if="banner.items[key].button.active" :to="banner.items[key].button.url">{{ banner.items[key].button.text }}</router-link>
                    </div>
                </div>
            </template>
        </div>
            <!-- RIGHT SIDE IMAGE -->
                <!-- <div v-if="banner.right.active" class="w-full hidden md:block md:w-1/4 bg-gray-300">
                    <div class="h-full">
                        <router-link :to="banner.right.url">
                            <si-image class=" object-cover h-full" width="300" height="500" :src="banner.right.image ? banner.right.image.src: $store.state.defaults.sideBanner" alt="Banner image"/>
                        </router-link>
                    </div>
                </div> -->
            <!--  -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            timeout: null,
            lastItem: null,
            activeIndex: 0,
            banner: this.$settings.sections.banner
        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate(index=null){
            if(index != null){
                this.lastItem = this.banner.items[`item_${[this.activeIndex]}`];
                this.activeIndex = index;
                clearTimeout(this.timeout);
            }else{
                this.lastItem = this.banner.items[`item_${[this.activeIndex]}`];
                if(this.activeIndex >= Object.keys(this.banner.items).length-1) this.activeIndex = -1;
                this.activeIndex++;
                this.timeout = setTimeout(() => {
                    this.animate();
                    //this.$nuxt.error({ statusCode: 404, message: 'Okay' })
                }, 3500);
            }
        }
    },
}
</script>
<style>
@font-face {
    font-family: "Lobster";
     src: url("/fonts/Lobster-Regular.ttf");
}
.slider-item{
    width: 100vw;
    height: 60vh;
}
    .slider-item.last{
        position: absolute;
    }
    .slider-item:not(.active):not(.last){
        position: absolute;
        top: 0;
        transform: translateX(-110%);
    }
    .slider-item.active{
        transform: none;
        transition: 2s;
    }
    .descWrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        position: absolute;
        top: 0;
        height: 100%;
    }
    .desctitle{
        font-family: "Lobster";
        font-weight: bold;
        font-size: 3rem;
        letter-spacing: 2px;
        color: white;
        opacity: 0;
        margin-top: 100px;
        transition: opacity 1s, margin-top 1s;
        transition-timing-function:linear;
        transition-delay: 1s;
        }
        .titleActive{
            opacity: 1;
            margin:10px;
        }
    .description,.desctitle{
        max-width: 80%;
    }
</style>