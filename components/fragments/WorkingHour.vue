<template>
        <div v-if="workingHour.active" class="container bg-primary h-120 flex justify-between my-5 p-0.5">
            <div class="text-white w-full flex justify-center">
                <div class=" h-full w-full flex mx-5 flex-col justify-evenly text-white items-center  w-3/4 xl:w-1/2 working-time">
                    <div class="flex flex-col gap-3 items-center">
                        <h1>{{workingHour.title}}</h1>
                        <div class="italic">{{workingHour.description}}</div>
                    </div>
                    <div class="flex justify-between w-full" v-for="(item,id) in workingHour.items" :key="id"> 
                        <span class="font-bold">{{item.days}} </span>
                        <span>----------------------------------- </span> 
                        <span class="font-bold">{{item.hours}}</span>
                    </div>
                </div>
            </div>
            <si-image  class="h-1/3 w-1/3 hidden sm:hidden md:block" :src="workingHour.image ? workingHour.image.src : $store.state.defaults.sideBanner" alt="Working image"/>
        
        </div>
</template>

<script>
export default {
    data(){
        return{
            workingHour: this.$settings.sections.workingHour
        }
    }
}
</script>

<style scoped>
    @font-face {
    font-family: "Lobster";
     src: url("/fonts/Lobster-Regular.ttf");
    }
    .working-time{

        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }
    h1{
        font-family: 'Lobster';
    }
</style>