<template>
<div class="bg-primary">
    <div class="flex container justify-between">
        <div class="flex flex-wrap h-8 ">
            <div v-for="item in socialMedia.filter(s=>$settings.sections.footer.social_media[s.name])" :key="item.name" class="h-12 m-2 flex items-center justify-center grayscale">
                <a class="h-full flex" :href="$settings.sections.footer.social_media[item.name]" target="_blank" rel="noopener noreferrer">
                    <si-image class="h-4 w-4 " :src="item.image" :alt="item.name"/>
                </a>
            </div>
        </div>
        <div class="flex text-white justify-end gap-5 px-8 items-center text-sm"  id="mediaLangue">
            <div class="upper">OUR STORES</div>
                <hr class="w-0.5 h-5 bg-white">
             <!-- CHOOSE LANGAGE AND CURRENCY -->
                <div v-for="(item, i) in otherMenu" :key="i" class="relative" >
                    <div @click="activeId = activeId != item._id ? item._id : null" class="flex">
                        <img v-if="item.text == 'FR'||item.text == 'EN'" :src=" item.text == 'FR'? '/images/2.jpg':'/images/1.jpg'" class="m-1">
                        <a class="text-white m-1" :href="item.url">{{ item.text }}</a>
                    </div>
                    
                    <transition name="slide">
                        <div v-if="item._id == activeId">
                            <div v-for="(item,i) in item.childrens" :key="i" :class="item._id != activeId?'langMenu':''">
                                <a class="p-2 text-gray-400 w-full hover:text-red-500" :href="item.url">
                                    {{item.text}}
                                </a>
                                <a class="p-2 text-gray-400 w-full hover:text-red-500" :href="item.url">
                                    {{item.text}}
                                </a>
                                <!-- <ul class="p-2" v-if="item.childrens && item.childrens.length > 0">
                                    <li v-for="(child,ii) in item.childrens" :key="ii">
                                        <a class="" :href="child.url">
                                            {{ child.text }}
                                        </a>
                                    </li>
                                </ul> -->
                            </div>
                        </div>
                    </transition>
                </div>
                <hr class="w-0.5 h-5 bg-white">
            </div>
        </div> 
</div>
</template>

<script>
export default {
    data() {
        return {
            socialMedia: [
                {
                    name: 'facebook',
                    image: 'https://storeno.b-cdn.net/themes/palest/facebook.png'
                },
                {
                    name: 'twitter',
                    image: 'https://storeno.b-cdn.net/themes/palest/twitter.png'
                },
                {
                    name: 'instagram',
                    image: 'https://storeno.b-cdn.net/themes/palest/instagram.png'
                },
                {
                    name: 'youtube',
                    image: 'https://storeno.b-cdn.net/themes/palest/youtube.png'
                },
                {
                    name: 'whatsapp',
                    image: 'https://storeno.b-cdn.net/themes/palest/whatsapp.png'
                },
                {
                    name: 'linkedin',
                    image: 'https://storeno.b-cdn.net/themes/palest/linkedin.png'
                },
                {
                    name: 'snapchat',
                    image: 'https://storeno.b-cdn.net/themes/palest/snapchat.png'
                },
                {
                    name: 'tiktok',
                    image: 'https://storeno.b-cdn.net/themes/palest/tiktok.png'
                }
            ],
            show: false,
            activeId: null,
            menu: this.$settings.sections.header.menu,
             otherMenu: [
                {
                    _id: "lang",
                    text: this.$store.state.language.code,
                    active: this.$settings.sections.header.icons.language,
                    childrens: this.$settings.store_languages.map(l=> {
                        return {
                            _id: l.code,
                            text: l.name,
                            url: `?lang=${l.code}`
                        }
                    })
                },
                {
                    _id: "currency",
                    text: this.$store.state.currency.code,
                    active: this.$settings.sections.header.icons.currency,
                    childrens: this.$settings.store_currencies.map(c=> {
                        return {
                            _id: c.code,
                            text: c.name,
                            url: `?cur=${c.code}`
                        }
                    })
                }
            ].filter(item=> item.active)
        }
    },

    watch: {
        "$route.params": {
            handler(params) {
                this.$store.state.showHeaderMenu = false
            },
            deep: true
        },
        "$store.state.showHeaderMenu"(val){
            if(val){
                this.show = val;
            }else{
                setTimeout(() => {
                    this.show = val;
                },500);
            }
        }
    }
}
</script>

<style scoped>

    .langMenu{
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background-color: white;
        position: absolute;
        top: 30px;
        right: -20px;
        z-index: 10;
        box-shadow: 1px 1px 3px gray;
        padding: 5px;
        min-width: 100px;
        text-align: center;
        animation: menuSlide 0.3s linear;
    }
    @keyframes menuSlide {
        from{height: 0px;}
        to{height: 100px;}
    }

     @media screen and (max-width: 370px){
        #mediaLangue{
            display: none;
        }
    }
</style>
