<template>
    <section class="card">
        <div class="title">
            <h3 style="text-transform: capitalize;">{{ productSample.title }}</h3>
            <p style="font-weight: 700;">${{ productSample.amount }}</p>
        </div>
        <div class="body">

            <img src="/regImg.png" alt="">
        </div>
        <div class="actions">
            <v-btn color="success">Buy Now</v-btn>
            <v-btn color="primary" @click="addToCart(productSample)">
                <v-icon>{{ !exists ? "mdi-cart" : "mdi-cart-off" }}</v-icon>
            </v-btn>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useCartStore from '../stores/cart'
import type { Product } from '../utils/typings'
const { addToCart, checkExisting } = useCartStore()
const productSample: Product = {
    id: '1huwhdeuw',
    title: "product Title",
    amount: 200,
    discount: 12,
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