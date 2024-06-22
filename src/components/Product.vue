<template>
    <section class="card">
        <div class="title capitalize font-semibold">
            <h3>{{ product.name }}</h3>
        </div>

        <div class="body">
            <div class="w-[230px] h-[200px]">
                <img :src="product.images[0].url" :alt="product.name">
            </div>
        </div>

        <div class="flex justify-between items-center -mt-2">
            <p :class="product.discount && 'text-red-500 line-through'"> &#x20A6;{{ product.price
                }}</p>

            <p v-if="product.discount && product.price"> &#x20A6;{{ product.price
                - (product.price
                    / 100 *
                    product.discount) }}</p>
        </div>
        <div class="actions">
            <v-btn v-if="!owner" color="success">Buy Now</v-btn>
            <v-btn v-if="owner" color="warning" @click="setProductAndNavigate">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>


            <v-btn v-if="owner" color="error" @click="deletePro">
                <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-btn v-if="!exists && !owner" color="primary" @click="addToCart(product)">
                <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-btn v-if="exists && !owner" color="error" @click="removeFromCart(product.id)">
                <v-icon>mdi-cart-off</v-icon>
            </v-btn>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import useCartStore from '../stores/cart'
import type { Product } from '../utils/typings'
import { useProductStore } from '@/stores/product';
import { useRouter } from 'vue-router';
import { deleteProduct } from '@/requests/product';

const { addToCart, checkExisting, removeFromCart } = useCartStore()
const productStore = useProductStore()
const router = useRouter()

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    },
    owner: Boolean
})


const exists = computed(() => checkExisting(props.product.id))

const setProductAndNavigate = (routeName: string) => {
    productStore.setProduct(props.product);
    router.push({ name: 'edit' });
};



function deletePro() {
    deleteProduct(props.product.id)
    router.push({ name: 'dashboard' });
}
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
    margin-top: -10px;
}

.body {
    display: flex;
    justify-content: center;
    align-items: center;
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