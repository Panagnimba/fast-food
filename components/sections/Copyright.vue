<template>
    <div class="bg-black container p-5">
        <!-- <div class="container mx-auto px-4 py-2">
            <div class="flex justify-between items-center flex-wrap">
                    <h2 class="text-white font-semibold text-2xl">
                        {{ title }}
                    </h2>
            </div>
        </div> -->

        <div class="grid grid-cols-2  pb-16 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div class="flex flex-col justify-between m-5 text-gray-500 h-full" v-for="(item,i) in footer.items" :key="i">
                <h4 class="text-white font-semibold">{{item.title}}</h4>
                <div class="item">{{item.a}}</div>
                <div class="item">{{item.b}}</div>
                <div class="item">{{item.c}}</div>
                <div class="item">{{item.d}}</div>
            </div>
            
            <div class="flex flex-col justify-between m-5 text-gray-500 h-full">
                <h4 class="text-white font-semibold">NEWS LETTERS</h4>
                <div class="item"> 
                    Be the first to know About
                    our new arrivals and exclusive offers
                </div>
                    <form action="" class="form flex">
                        <input type="email" placeholder="Your email address" class="p-2 w-2/3">
                        <input type="submit" value="Sign Up" class="w-1/3 p-2">
                    </form>
            </div>
        </div>

        <hr class="h-0.5 mx-7 bg-gray-600"/>
        
        <div class="flex justify-center py-5">
            <div v-for="item in methods.filter(m=>$settings.sections.footer.methods[m.name])" :key="item.name" class="w-20 h-12 mx-2 flex items-center justify-center  p-2">
                <si-image width="80" height="40" :src="item.image" :alt="item.name" class="h-full object-contain"/>
            </div>
        </div>   
        
        <div class="text-white text-center mt-5 text-xs" v-html="description.replace('__YEAR__',year)"></div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            year: new Date().getFullYear(),
            title: this.$settings.sections.footer.copyright.store_name,
            description: this.$settings.sections.footer.copyright.text,
            footer: this.$settings.sections.footer,

              methods: [
                {
                    name: 'visa',
                    image: 'https://storeno.b-cdn.net/themes/palest/visa.png'
                },
                {
                    name: 'mastercard',
                    image: 'https://storeno.b-cdn.net/themes/palest/mastercard.png'
                },
                {
                    name: 'transfer',
                    image: 'https://storeno.b-cdn.net/themes/palest/transfer.png'
                },
                {
                    name: 'cash',
                    image: 'https://storeno.b-cdn.net/themes/palest/cod.png'
                }
            ],
        }
    },

    mounted(){
        console.log(this.footer)
    }
}
</script>

<style scoped>
.item{
    transition: 0.4s;
    color: #ffffff80;
}
.item:hover{
    color: rgb(136, 4, 4);
    padding-left: 5px;
    transition: 0.4s;
    cursor: pointer;
}
.form{
    border-bottom: 1.5px solid white;
}
.form input{
    border: none;
    outline: none;
    background: none;
    color: white;
}
</style>