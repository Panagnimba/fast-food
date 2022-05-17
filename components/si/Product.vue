<template>
    <div class="h-full flex overflow-hidden relative">
      <div class="w-full flex flex-col h-full py-2 rounded productWrapper" @mouseenter="changeImage(item)" @mouseleave="changeInitial(item)">
          <div class="flex justify-around items-center" >
              <!-- DISCOUNT -->
              <div v-if="discount" class="p-1 rounded-br-lg flex items-center justify-center bg-red-700 text-white md:absolute top-20 right-0 z-10 md:rounded-bl-lg md:rounded-br-none">
                <b>-{{ discount.value }}{{discount.type == "percentage"? "%": this.$store.state.currency.symbol}}</b>
              </div>

              <si-product-price :type="item.type" :price="item.price" :variants="item.variants"></si-product-price>
              <!-- REVIEWS -->
              <div class="flex items-center justify-center" v-if="$settings.sections.products.show_reviews">
                  <div class="mb-1 flex">
                    <span v-for="(star, i) in 5" :class="star <= item.review.rating ? 'text-yellow-500': 'text-gray-300'" :key="i">
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 translate">
                        <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                      </svg>
                    </span>
                  </div>
                  <span class="text-sm text-gray-300" key="count">({{ item.review.reviews.length }})</span>
              </div>
          </div>


        <div class="w-100 pb-full relative">
            <nuxt-link :to="`/products/${item.slug}`" :title="item.name" :aria-label="item.name">
              <!-- IMAGE DE BASE (ARRIERE PLAN) -->
              <si-image width="400" height="400" :cle="item._id" class="h-full w-full absolute inset-0 object-cover baseImage" :src="item.images.length > 1 ? item.images[1].src : item.images[0].src" :alt="item.name"/>
              <!-- ROTATE IMAGE -->
              <si-image width="400" height="400" class="h-full w-full absolute inset-0 object-cover rotateImage" :class="id % 2 == 0 ? 'rotateImageX' : 'rotateImageY'" :src="item.images.length > 0 ? item.images[0].src : null" :alt="item.name"/>
            </nuxt-link>
            <!-- ADD TO WISH LIST ICON HANDLE -->
              <div v-if="$settings.sections.products.add_to_wishlist.active">
                <button v-if="$store.state.wishlist.find((i) => i._id == item._id)" @click="removeFromWishlist" title="Wishlist" class="item absolute z-10 m-2 p-2 bg-white rounded-full mx-1 hover:shadow">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate text-red-600">
                    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                  </svg>
                </button>
                <button v-else @click="addToWishlist" title="Wishlist" class="item absolute z-10 p-2 bg-white rounded-full mx-1 hover:shadow">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-5 translate">
                    <path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                  </svg>
                </button>
              </div>
        </div>
        
        <div class="text-center h-full">
          <nuxt-link :to="`/products/${item.slug}`">
            <h3 class="m-2 text-xl productName">{{ item.name }}</h3>
          </nuxt-link>
        </div>
        <!-- ADD TO CART BUTTON ICON AND PRODUCT DESCRIPTION-->
        <div class="flex justify-between items-center">
            <div class="two-lines text-gray-400 mx-2 productDesc">{{ item.description }}</div>
            <button v-if="$settings.sections.products.add_to_cart.active" @click="addToCart" class="rounded-full text-white bg-yellow-500 p-2 mr-2 addToCartBtn">          
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5" fill="white">
                <path d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z"/>
              </svg>
            </button>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    upsell: { type: Object, default: null },
    item: Object,
    id: Number,
  },
  async fetch() {
    if (this.discount) {
      if (this.item.type == "simple") {
        this.item.originalPrice = this.$tools.copy(this.item.price);
        if (this.discount.type == "percentage") {
          this.item.price.salePrice =
            this.item.price.salePrice -
            (this.item.price.salePrice * this.discount.value) / 100;
          this.item.price.comparePrice =
            this.item.price.comparePrice -
            (this.item.price.comparePrice * this.discount.value) / 100;
        } else {
          this.item.price.salePrice =
            this.item.price.salePrice - this.discount.value;
          this.item.price.comparePrice =
            this.item.price.comparePrice - this.discount.value;
        }
      } else {
        this.item.variants.forEach((variant) => {
          variant.originalPrice = this.$tools.copy(variant.price);
          if (this.discount.type == "percentage") {
            variant.price.salePrice =
              variant.price.salePrice -
              (variant.price.salePrice * this.discount.value) / 100;
            variant.price.comparePrice =
              variant.price.comparePrice -
              (variant.price.comparePrice * this.discount.value) / 100;
          } else {
            variant.price.salePrice =
              variant.price.salePrice - this.discount.value;
            variant.price.comparePrice =
              variant.price.comparePrice - this.discount.value;
          }
        });
      }
    }
  },
  data() {
    return {
      filpped: false,
      added: false,
      variant: this.item.type == "variant" ? this.item.variants[0] : null,
      quantity: this.item.quantity,
      price: { salePrice: 0, comparePrice: 0 },
      discount: this.upsell ? this.upsell.discount : null,
    };
  },
  methods: {
    addToCart(ev) {
      // Call add to cart event
      // console.log('items', this.item)
      let item = {
        _id: this.item._id,
        quantity: this.quantity.value
          ? this.quantity.value
          : this.item.quantity.default,
        price: this.variant
          ? this.variant.price.salePrice
          : this.item.price.salePrice,
        variant: this.variant ? { _id: this.variant._id } : null,
        upsell: this.upsell,
      };
      this.$tools.call("ADD_TO_CART", item);
      this.$tools.toast(this.$settings.sections.alerts.added_to_cart);
      this.added = true;
      // REDIRECTING TO CHECKOUT
      // if(this.$settings.sections.products.add_to_cart_to_checkout){
      //     setTimeout(() => {
      //             window.location.href = '/checkout2';
      //     }, 500);
      // }
      setTimeout(() => {
        this.added = false;
      }, 2000);

      this.filpped = false;

      this.$storeino.fbpx("AddToCart", {
        content_name: this.item.name,
        content_ids: [this.item._id],
        content_type: "product",
        value: this.variant
          ? this.variant.price.salePrice
          : this.item.price.salePrice,
        currency:
          this.$store.state.currency && this.$store.state.currency.code
            ? this.$store.state.currency.code
            : "USD",
      });
    },
    variantSelected(variant) {
      this.variant = variant;
      this.quantitySelected(this.item.quantity.value);
    },
    quantitySelected(quantity) {
      this.item.quantity.value = quantity;
      if (this.variant) {
        this.price.salePrice = this.variant.price.salePrice * quantity;
        this.price.comparePrice = this.variant.price.comparePrice * quantity;
      } else {
        this.price.salePrice = this.item.price.salePrice * quantity;
        this.price.comparePrice = this.item.price.comparePrice * quantity;
      }
    },
    addToWishlist() {
      this.$tools.call("ADD_TO_WISHLIST", this.item);
      this.$tools.toast(this.$settings.sections.alerts.added_to_wishlist);
    },
    removeFromWishlist() {
      this.$tools.call("REMOVE_FROM_WISHLIST", this.item);
      this.$tools.toast(this.$settings.sections.alerts.removed_from_wishlist);
    },

    changeImage(item) {
      const baseImages = document.querySelectorAll(".baseImage");
      const rotateImages = document.querySelectorAll(".rotateImage");
      for(let i=0; i<baseImages.length; i++)
      {
          if (baseImages[i].getAttribute("cle") == item._id) 
          {
              const src = baseImages[i].src;
              baseImages[i].src=rotateImages[i].src
              rotateImages[i].src=src
            // break;
          }
      }
    },
    changeInitial(item) {
      const baseImages = document.querySelectorAll(".baseImage");
      const rotateImages = document.querySelectorAll(".rotateImage");
      for(let i=0; i<baseImages.length; i++)
      {
          if (baseImages[i].getAttribute("cle") == item._id) 
          {
              const src = rotateImages[i].src;
              rotateImages[i].src=baseImages[i].src
              baseImages[i].src=src
            // break;
          }
      }
    },
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Lobster&family=Rubik+Puddles&family=Rubik:wght@300&display=swap');

/* for the wishlist icon */
.item{
  top:45%;
  left:45%;
  display: none;
}
.productWrapper:hover .item{display:block;}
/*  */

.addToCartBtn:hover{background-color: var(--primary-color);}
.productWrapper {
  border: 1px solid rgb(244, 242, 242);
  background-color: #ffffff;
  box-shadow: 2px 2px 1px black;
  transition: 0.3s;
}


.productWrapper:hover .rotateImageX {
  border-radius: 100%;
  transition: transform 1.5s;
  transform: rotate3d(0, 1, 0, 360deg);
}
.productWrapper:hover .rotateImageY {
  border-radius: 100%;
  transition: transform 1.5s;
  transform: rotate3d(1, 1, 0, 360deg);
}

.productName {
  color: var(--primary-color);
  font-family: "Rubik";
}
.productDesc{
  font-family: "Rubik";
  font-size: 14px;
}




.close-button {
  position: absolute;
  right: 1px;
  top: 1px;
}
.close-icon {
  display: block;
  width: 30px;
  height: 30px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  background: #ffffff;
  border: 7px solid #ffffff;
  box-shadow: 0 0 5px #00000022;
}
.close-icon::before,
.close-icon::after {
  content: "";
  width: 40px;
  height: 2px;
  display: block;
  position: absolute;
  background-color: #7c7c7c;
}
.close-icon::before {
  transform: rotate(45deg);
  top: 14px;
  left: -5px;
}
.close-icon::after {
  transform: rotate(-45deg);
  top: 0px;
  left: -5px;
}
.icon-star::before {
  content: "\e918";
  font-size: 14px !important;
}

</style>
