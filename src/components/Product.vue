<template>
    <v-card max-width="300" elevation="16">
        <!-- TODO: Add route name -->
        <!-- <router-link :to="{name:'#'}"> -->
        <v-card-title>{{ product.name }}</v-card-title>
        <!-- </router-link> -->

        <v-card-subtitle class="d-flex gap-4">
            <p class="font-semibold" :class="discount && 'line-through opacity-80'">&#x20A6;{{ product.price }}</p>
            <p v-if="discount" class="font-semibold">&#x20A6;{{ discount }}</p>
        </v-card-subtitle>

        <v-card-text>
            <v-img :width="300" :height="200" aspect-ratio="16/9" cover :src="product.images[0].url" />
        </v-card-text>

        <div class="flex gap-5 px-3 w-full justify-evenly pb-5">
            <v-btn v-if="!owner" class="w-[45%]" :disabled="isLoading" color="success" elevated @click="handlePayment">
                <v-icon>mdi-shopping</v-icon>
            </v-btn>

            <v-btn v-if="owner" class="w-[45%]" color="warning" @click="setProductAndNavigate">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn v-if="owner" class="w-[45%]" color="error" @click="deletePro">
                <v-icon>mdi-delete</v-icon>
            </v-btn>

            <v-btn v-if="!exists && !owner" class="w-[45%]" color="primary" @click="addToCart(product)">
                <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-btn v-if="exists && !owner" class="w-[45%]" color="error" @click="removeFromCart(product.id)">
                <v-icon>mdi-cart-off</v-icon>
            </v-btn>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import useCartStore from '../stores/cart'
import type { Product } from '../utils/typings'
import { useProductStore } from '@/stores/product';
import { useRoute, useRouter } from 'vue-router';
import { deleteProduct } from '@/requests/product';
import { initPayment } from '@/requests/payment';
import useAuth from '@/stores/auth';

const { addToCart, checkExisting, removeFromCart } = useCartStore()
const productStore = useProductStore()
const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const auth = useAuth()

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    },
    owner: Boolean
})

const exists = computed(() => checkExisting(props.product.id))
const discount = computed(() => {
    if (props.product.price && props.product.discount) {
        return props.product.price - (props.product.price * (props.product.discount / 100))
    }
})

const setProductAndNavigate = () => {
    productStore.setProduct(props.product);
    router.push({ name: 'edit' });
};



function deletePro() {
    deleteProduct(props.product.id)
    router.push({ name: 'dashboard' });
}

async function handlePayment() {
    if (!auth.token) router.push('/login?redirect=' + route.path)
    isLoading.value = true
    const res = await initPayment([props.product])
    if (res.error) {
        return alert(res.error)
    }
    window.location.href = res.data.authorization_url;
    isLoading.value = res.isLoading
}

</script>

<style scoped>
img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
    object-position: center;
    mix-blend-mode: exclusion;
}
</style>