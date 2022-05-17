<template>
    <div class="flex justify-center items-center fixed z-10 inset-0 md:p-10 p-5" v-if="$store.state.fullImage">
        <div @click="$store.state.fullImage=null" class="bg-black absolute inset-0 bg-opacity-25"></div>
        <div class="relative md:h-full w-full md:w-auto z-10 bg-white rounded-md shadow" @click="zoom($event)">
            <si-image class="md:h-full w-full cursor-zoom-in" :src="$store.state.fullImage" :alt="`Full screen image`"/>
            <button @click="$store.state.fullImage=null" class="absolute top-0 z-20 right-0 m-2 bg-primary text-white font-bold rounded-md w-9 h-9 px-2 flex items-center justify-center">&times;</button>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        document.addEventListener('keydown', (e)=>{
            if(e.key == 'Escape' && this.$store.state.fullImage != null) this.$store.state.fullImage=null;
        })
    },
    methods:{
        zoom(event){

            if(event.target.style.transform=="" || event.target.style.transform=="scale(1)")
                event.target.style.transform ='scale(1.15)';
            else
                event.target.style.transform ='scale(1)';
        }
    }
}
</script>