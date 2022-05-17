<template>
    <div class="container">
        <div v-if="loading" class="flex justify-center items-center my-5">
            <si-loader></si-loader>
        </div>
        <div class="flex flex-wrap justify-center" v-if="item">
            <meta itemprop="productID" :content="item._id" />
            <!-- IMAGE CONTAINER -->
            <div class="w-full sm:w-1/2 lg:w-3/6 xl:w-5/12">
                <div class="p-2 relative flex flex-col">
                    <button v-if="$store.state.wishlist.find(i=>i._id==item._id)" @click="removeFromWishlist" title="Wishlist" class="item absolute right-5 top-1 m-2 p-2 bg-white rounded-full mx-1 z-10 shadow">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate text-red-600"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                    </button>
                    <button v-else @click="addToWishlist" title="Wishlist" class="item absolute right-5 top-1 m-2 p-2 bg-white rounded-full mx-1 hover:shadow z-10 shado">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" class=""></path></svg>
                    </button>
                    
                    <div id="wrapp" @mousemove="moveImage($event)" @mouseleave="mouseleave">
                        <img id="img" height="400" width="400" class="h-full h-full  lg:w-5/6" @click="$store.state.fullImage=image ? image.src : null" :src="image ? image.src : null " :alt="item.name"/> 
                    </div>
                    
                    <div class="overflow-auto w-full">
                        <div class="flex">
                            <si-image width="100" height="100" class="w-16 h-16 m-1 bg-white rounded-md shadow cursor-pointer" v-for="(image, index) in item.images" @click="setImage(index)" :key="index" :src="image.src" :alt="`${item.name} - ${image.title}`"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- SECOND PART RIGHT SECTION -->
            <div class="w-full sm:w-1/2 xl:w-5/12">
                <div class="p-2">
                    <div class="bg-white p-2">
                        <meta itemprop="name" :content="item.name" />
                        <h1 class="mb-2 text-xl productName">{{ item.name }}</h1>
                            <!-- Reference -->
                        <div class="mb-2"><b>Reference:</b> {{item.reference}}</div>

                        <div class="flex items-center justify-start mb-2" v-if="$settings.sections.product.reviews.active">
                            <div class="mb-1 flex">
                                <span v-for="(star,i) in 5" :class="star <= item.review.rating ? 'text-yellow-500 ': 'text-gray-400'" :key="i">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 translate"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>
                                </span>
                            </div>
                            <span class="text-sm text-gray-600 mx-2 hover:text-red-600 cursor-pointer" key="count">
                                <a href="#reviews">Read Reviews({{ item.review.reviews.length }})</a> 
                            </span>
                        </div>
                        
                        <fragments-product-price class="flex text-3xl" :type="'simple'" :price="price" :variants="item.variants"></fragments-product-price>
    
                        <si-product-variants class="flex" v-if="item.type=='variable'" :options="item.options" :variants="item.variants" @selected="variantSelected"></si-product-variants>
                        <p class="text-md my-3 text-gray-600">{{ item.description }}</p>
                        
                        
                        <div class="flex justify-start items-center gap-3">
                            <si-product-quantity @selected="quantitySelected" :quantity="quantity"></si-product-quantity>
                            <button v-if="$settings.sections.product.buy_now.active" v-show="!$store.state.apps.find(a=>a.placement.indexOf('REPLACE_BUYNOW') >= 0)" @click="buyNow" class="bg-primary text-white click-effect buy">
                                <span class="w-full">+ {{ $settings.sections.product.buy_now.text }}</span>
                            </button>
                        </div>
                        <si-app-loader placement="REPLACE_BUYNOW"/>
                    </div>

                        <!-- PARTAGER -->
                    <div class=" my-2 bg-white" v-if="$settings.sections.product.share_buttons">
                        <div class="flex items-center">
                            <b class="whitespace-nowrap p-2">{{ $settings.sections.product.share_buttons.title }}</b>
                            <div class=" flex justify-center">
                                <div v-for="item in socialMedia.filter(s=>$settings.sections.product.share_buttons[s.name])" :key="item.name" class="h-12 m-2 flex items-center justify-center">
                                    <a class="h-full flex items-center share-icons" :href="item.url" target="_blank" rel="noopener noreferrer" :title="item.name">
                                        <si-image class="h-6 w-6" width="40" height="40" :src="item.image" :alt="item.name"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- UPSELLS AND RELATED PRODUCTS -->
        <div class="flex flex-col">

            <!-- PRODUCT DESCRIPTION -->
            <div class="border my-5" v-if="$settings.sections.product.description.active">
                <h2 class="text-2xl m-4">{{this.$settings.sections.product.description.title}}</h2>
                <div  v-if="item" class="bg-white rounded-md p-2 my-3 mx-2 description" id="description" v-html="item.html"></div>
            </div>
            
            <si-app-loader placement="AFTER_DESCRIPTION"/>
            <div v-if="item && $settings.sections.product.reviews.active" class="reviews" id="reviews">
                <sections-reviews :item="item"></sections-reviews>
            </div>
            <!-- UPSELL ===> VENTE INCITATIVE -->
            <div v-if="item && $settings.sections.product.upsell.active" class="upsells">
                <sections-upsell :item="item.upsell"/>
            </div>

            <!-- RELATED PRODUCTS -->
            <div v-if="item && $settings.sections.product.related.active" class="related">
                <sections-related-products :item="item"/>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: true,
            item: null,
            image: null,
            tab: 'description',
            quantity: {},
            variant: null,
            price: { salePrice: 0, comparePrice: 0 },
            socialMedia: [
                {
                    name: 'pinterest',
                    url: 'https://pinterest.com/pin/create/button/?url={url}&description={title}',
                    image: '/images/pinterest.png'
                },
                {
                    name: 'whatsapp',
                    url: 'https://api.whatsapp.com/send?text={title}%20{url}',
                    image: '/images/whatsapp.png'
                },
                {
                    name: 'facebook',
                    url: 'https://www.facebook.com/sharer.php?u={url}',
                    image: '/images/facebook.png'
                },
                {
                    name: 'twitter',
                    url: 'https://twitter.com/intent/tweet?url={url}&text={title}',
                    image: '/images/twitter.png'
                },
                {
                    name: 'linkedin',
                    url: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
                    // image: 'https://storeno.b-cdn.net/themes/palest/linkedin.png'
                    image: '/images/linkedin.png'
                },
            ]
        }
    },
    async fetch() {
        const { slug } = this.$route.params;
        try{
            const { data } = await this.$storeino.products.get({ slug })
            this.item = data;
            
            this.$store.state.seo.title = (this.item.seo.title || this.item.name) + ' - ' + this.$settings.store_name;
            this.$store.state.seo.description = this.item.seo.description || this.item.description || this.$settings.store_description;
            this.$store.state.seo.keywords = this.item.seo.keywords.length > 0 ? this.item.seo.keywords || [] : this.$settings.store_keywords || [];
            if(this.item.images.length > 0){ this.$store.state.seo.image = this.item.images[0].src; }
            // New meta tags
            [ { hid: "product:price:amount", property: "product:price:amount", content: this.price.salePrice },
            { hid: "productID", itemprop: "productID", content: this.product && this.product ? this.product._id : 'productID' }
            ].forEach(meta=>{
                const index = this.$store.state.seo.metaTags.findIndex(m=>m.hid === meta.hid);
                if(index > -1){ this.$store.state.seo.metaTags.splice(index, 1, meta); }
                this.$store.state.seo.metaTags.push(meta);
            });
            this.loading = false;
            this.quantity = this.item.quantity;
            // Set default image if exists
            if(this.item.images.length > 0) this.setImage(0);
            // Set default variant if exists
            if(this.item.type == 'variable' && this.item.variants.length > 0) this.variantSelected(this.item.variants[0]);
            // Set default quantity
            this.quantitySelected(this.quantity.default);
            // Generate share urls
            let url = `https://${this.$store.state.domain}/posts/${slug}`;
            for (const button of this.socialMedia) {
                button.url = button.url.replace(/\{title\}/gi, this.item.name).replace(/\{url\}/gi, url);
            }
            if(!process.server){
               this.$storeino.fbpx('PageView')
          this.$storeino.fbpx('ViewContent',{
            content_name: this.item.name?this.item.name:'',
            content_ids: [this.item._id],
            content_type: "product",
            value: this.item.price.salePrice,
            currency: this.$store.state.currency.code
          })
              this.$tools.call('PAGE_VIEW', this.item);
            }

        }catch(e){
            // Redirect to error page if product not exists
            this.$nuxt.error({ statusCode: 404, message: 'product_not_found' })
        }
    },

    mounted() {
        console.log('item=====>',this.item);
        if(this.item) this.$tools.call('PAGE_VIEW', this.item);
        window.addEventListener("APP_LOADER", e => {
            window.dispatchEvent(new CustomEvent('CURRENT_PRODUCT', {
                detail: {
                    product_id: this.item._id,
                    product_quantity: this.quantity.value,
                    product_variant: this.variant ? this.variant._id : undefined,
                    product_currency: this.$store.state.currency.code,
                    product_price: this.price
                }
            }));
        });
        if(this.item){
          this.$storeino.fbpx('PageView')
           this.$storeino.fbpx('ViewContent',{
              content_name: this.item.name?this.item.name:'',
              content_ids: [this.item._id],
              content_type: "product",
              value: this.item.price.salePrice,
              currency: this.$store.state.currency.code
            })
        }


        if(this.item){
            const iframes=document.querySelectorAll('iframe')
            for(const ifram of iframes){
            const width = ifram.getAttribute('width')
            const height = ifram.getAttribute('height')
            const parent = ifram.parentNode
            if (!parent.classList.contains('video-wrapper')) {
                const div = document.createElement("div");
                ifram.after(div)
                div.classList.add('video-wrapper');
                ifram.style.width=null;
                ifram.style.height=null;
                ifram.setAttribute('width','');
                ifram.setAttribute('height','');
                div.appendChild(ifram)
            }
            }
        }
    },
    methods: {
        moveImage(event){
            let img = document.querySelector('#img');
            const container = document.querySelector('#wrapp');

                let xcrds = event.clientX - container.offsetLeft;
                let ycrds = event.clientY - container.offsetTop;
               
                img.style.transformOrigin = `${xcrds}px ${ycrds}px`
                img.style.transform = "scale(1.2)"             
        },
          mouseleave(){
                let img = document.querySelector('#img');
                img.style.transformOrigin = "center"
                img.style.transform = 'scale(1)'
                console.log(this.item)
        },

        addToCart() {
            // Call add to cart event
            this.$tools.call('ADD_TO_CART', {
                _id: this.item._id,
                quantity: this.quantity.value,
                price: this.variant?this.variant.price.salePrice : this.item.price.salePrice,
                variant: this.variant ? { _id: this.variant._id } : null
            });
            if(this.$settings.sections.products.add_to_cart_to_checkout){
                setTimeout(() => {
                        window.location.href = '/checkout';
                }, 500);
            }
            this.$tools.toast(this.$settings.sections.alerts.added_to_cart);
        },
        addToWishlist(){
            this.$tools.call('ADD_TO_WISHLIST', this.item);
            this.$tools.toast(this.$settings.sections.alerts.added_to_wishlist);
        },
        removeFromWishlist(){
            this.$tools.call('REMOVE_FROM_WISHLIST', this.item);
            this.$tools.toast(this.$settings.sections.alerts.removed_from_wishlist);
        },
        buyNow() {
            // Add to cart and redirect to checkout
            this.addToCart();
            setTimeout(() => {
                window.location.href = '/checkout';
            }, 500);
        },
        quantitySelected(quantity) {
            this.item.quantity.value = quantity;
            if(this.variant){
                this.price.salePrice = this.variant.price.salePrice * quantity;
                this.price.comparePrice = this.variant.price.comparePrice * quantity;
            }else{
                this.price.salePrice = this.item.price.salePrice * quantity;
                this.price.comparePrice = this.item.price.comparePrice * quantity;
            }
        },
        variantSelected(variant) {
            this.variant = variant;
            if(variant.imageId && this.item.images.length > 0){
                let index = this.item.images.findIndex(i=>i._id == variant.imageId);
                if(index == -1) index = 0;
                this.image = this.item.images[index];
            }else if(this.item.images.length > 0){
                this.image = this.item.images[0];
            }
            this.quantitySelected(this.item.quantity.value);
        },
        setImage(index){
            this.image = this.$tools.copy(this.item.images[index]);
        },
        setTab(tab){
            this.tab = tab;
            if(tab == 'reviews' && this.reviews.results.length == 0) this.getReviews();
        }
    },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Lobster&family=Rubik+Puddles&family=Rubik:wght@300&display=swap');

#wrapp {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        overflow: hidden;
        /* border: 2px solid red; */
    }

    #img{
        object-fit: cover;
        cursor: crosshair;
        /* z-index: -10; */
    }

.video-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.productName {
  /* color: var(--primary-color); */
  font-family: "Rubik";
  font-size: 2.25rem;
}
.buy{
    padding: 0 10px;
    line-height: 48px;
    height: 48px;
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    box-shadow: none;
    text-transform: uppercase;
}
.buy:hover{
    background: #253237;
}
.share-icons:hover{
    filter:grayscale(100%);
}
</style>