<template>

    <section id="cart" class="mb-52 p-5">
        <aside class="flex flex-col gap-5 flex-shrink-0 md:w-[60%]">
            <h6 class="font-semibold">
                {{ cartStore.cartLength }} Course in Cart
            </h6>
            <v-divider :thickness="5" class="!opacity-50 !border-blue-500"></v-divider>

            <p v-if="!cartStore.cartLength" class="font-semibold md:text-lg">
                You have no Items in your Cart
            </p>

            <div v-else v-for="product in cartStore.cart" :key="product.id">
                <CartCard :product="product" />
            </div>
        </aside>

        <aside class="flex flex-col gap-5 md:w-[40%]">
            <h6 class="font-semibold">Order Details</h6>
            <v-divider :thickness="5" class="!opacity-50 !border-blue-500"></v-divider>
            <Checkout />
        </aside>
    </section>
</template>

<script setup lang="ts">
import CartCard from "@/components/CartCard.vue";
import Checkout from "@/components/Checkout.vue";

import useCartStore from "@/stores/cart";

const props = defineProps({
    enrolled_courses: Array,
    errors: Object,
    auth: Object,
})

const cartStore = useCartStore();

</script>

<style scoped>
#cart {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
}

@media (width>=768px) {
    #cart {
        flex-direction: row;
    }
}
</style>
