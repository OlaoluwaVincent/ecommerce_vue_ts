<template>
    <section class="card">
        <div class="title capitalize font-semibold">
            <h3>{{ productSample.title }}</h3>
            <p :class="productSample.discount && 'text-red-300'"> &#x20A6;{{ productSample.amount }}</p>
            <p v-if="productSample.discount"> &#x20A6;{{ productSample.amount - (productSample.amount / 100 *
                productSample.discount) }}</p>
        </div>
        <div class="body">

            <img src="/regImg.png" alt="">
        </div>
        <div class="actions">
            <v-btn color="success">Buy Now</v-btn>
            <v-btn v-if="!exists" color="primary" @click="addToCart(productSample)">
                <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-btn v-else color="error" @click="removeFromCart(productSample.id)">
                <v-icon>mdi-cart-off</v-icon>
            </v-btn>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useCartStore from '../stores/cart'
import type { Product } from '../utils/typings'
const { addToCart, checkExisting, removeFromCart } = useCartStore()
const productSample: Product = {
    id: '1huwhdeuw',
    title: "product Title",
    amount: 200,
    discount: 10,
    description: "This is the product for this produuct",
    image: "/regImg.png",
}

const exists = computed(() => checkExisting(productSample.id))
</script>

<style scoped>
.card {
    background: #fff;
    color: #222;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title button {
    font-size: 13px;
}

.actions {
    display: flex;
    justify-content: space-between;
}

img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
    object-position: center;
    mix-blend-mode: darken;
}
</style>