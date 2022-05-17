<template>
    <div class="flex justify-center">
        <div class="flex">
            <label class="relative border h-full">
                <span class="px-5 text-center h-full">{{ value }}</span>
                <input :min="quantity.min" :max="quantity.max" class="px-4 text-center absolute outline-none inset-0 bg-opacity-0 w-full h-full" v-model="value" type="number">
            </label>
            <span class="flex items-center bg-white border px-4" v-if="quantity.unit">{{ quantity.unit }}</span>
        </div>
        <div class="flex flex-col">
            <button @click="inc(1)" class="border p-1 px-3 border-b-0" :class="value < quantity.instock ? 'bg-primary text-white hover:bg-gray-800' : ''">+</button>
            <button @click="inc(-1)" class="border p-1 px-3" :class="value > quantity.min ? 'bg-primary text-white hover:bg-gray-800' : ''">-</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        quantity: Object,
    },
    data() {
        return {
            value: this.quantity.value || this.quantity.default || 1
        }
    },
    watch:{
        value(val, old){
            if(val > this.quantity.instock) this.value = this.quantity.instock;
            if(val < this.quantity.min) this.value = this.quantity.default;
            if(isNaN(val)) this.value = this.quantity.default;
            this.$emit('selected', this.value);
        }
    },
    methods: {
        inc(inc){
            this.value = Number(this.value) + (Number(this.quantity.increment) * Number(inc))
        }
    },
}
</script>