<template>
    <section class="card">
        <div class="title capitalize font-semibold">
            <h3>{{ product.name }}</h3>
            <p :class="product.discount && 'text-red-500 line-through'"> &#x20A6;{{ product.price
                }}</p>

            <p v-if="product.discount"> &#x20A6;{{ product.price
                - (product.price
                    / 100 *
                    product.discount) }}</p>
        </div>

        <div class="body">
            <img :src="product.images[0].url" :alt="product.name">
        </div>

        <div class="actions">
            <v-btn color="success">Buy Now</v-btn>

            <v-btn v-if="!exists" color="primary" @click="addToCart(product)">
                <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-btn v-else color="error" @click="removeFromCart(product.id)">
                <v-icon>mdi-cart-off</v-icon>
            </v-btn>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import useCartStore from '../stores/cart'
import type { Product } from '../utils/typings'
const { addToCart, checkExisting, removeFromCart } = useCartStore()

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    }
})


const exists = computed(() => checkExisting(props.product.id))
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