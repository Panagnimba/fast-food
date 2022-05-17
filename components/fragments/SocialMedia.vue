<template>
<div>
    <div class="flex container justify-between">
        <div class="flex flex-wrap h-8 ">
            <div v-for="item in socialMedia.filter(s=>$settings.sections.footer.social_media[s.name])" :key="item.name" class="h-12 m-2 flex items-center justify-center">
                <a class="h-full flex" :href="$settings.sections.footer.social_media[item.name]" target="_blank" rel="noopener noreferrer">
                    <si-image class="h-4 w-4 " :src="item.image" :alt="item.name"/>
                </a>
            </div>
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
