<template>
    <div v-if="!product?.id">loading...</div>
    <v-card v-else max-width="200" elevation="16" class="!relative">
        <v-card-text class="!relative pa-1 group">
            <v-img aspect-ratio="1" cover :src="product.images[0].url" />
            <div
                class="absolute hidden group-hover:grid w-full z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-5 px-3 pb-5 bg-slate-400/40 h-full place-content-center">
                <v-btn v-if="!owner" :disabled="isLoading" color="success" elevated @click="handlePayment">
                    <v-icon>mdi-shopping</v-icon>
                </v-btn>

                <v-btn v-if="owner" color="warning" @click="setProductAndNavigateEdit">
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
        </v-card-text>

        <v-card-title @click="setProductAndNavigateProduct"
            class="pb-1 !text-sm !sm:text-base !lg:text-[20px] cursor-pointer">
            {{ product.name }}
        </v-card-title>


        <v-card-subtitle class="d-flex gap-4 text-gray-900 pb-2">
            <h5 class="font-bold" :class="discount && 'line-through opacity-80'">&#x20A6; {{ product.price }}</h5>
            <p v-if="discount" class="font-semibold">&#x20A6; {{ discount }}</p>
        </v-card-subtitle>
    </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useCartStore from '../stores/cart'
import { useProductStore } from '@/stores/product';
import { useRoute, useRouter } from 'vue-router';
import { deleteProduct, getProduct } from '@/requests/product';
import { initPayment } from '@/requests/payment';
import useAuth from '@/stores/auth';
import { useQuery } from '@tanstack/vue-query';

const { addToCart, checkExisting, removeFromCart } = useCartStore()
const productStore = useProductStore()
const router = useRouter()
const route = useRoute()
const auth = useAuth()

const props = defineProps({
    productId: {
        type: String,
        required: true
    },
    owner: Boolean
})

const { data: product, isLoading } = useQuery({
    queryKey: ['products', props.productId],
    queryFn: () => getProduct(props.productId),
})


const exists = computed(() => checkExisting(product.value!.id))

const discount = computed(() => {
    if (product.value!.price && product.value!.discount) {
        return product.value!.price - (product.value!.price * (product.value!.discount / 100))
    }
})

const setProductAndNavigateEdit = () => {
    productStore.setProduct(product.value!);
    router.push({ name: 'edit' });
};

const setProductAndNavigateProduct = () => {
    productStore.setProduct(product.value!);
    router.push({ name: 'product', params: { id: product.value?.id } });
};

function deletePro() {
    deleteProduct(product.value!.id)
    router.push({ name: 'dashboard' });
}

async function handlePayment() {
    if (!auth.token) router.push('/login?redirect=' + route.path)
    isLoading.value = true
    const res = await initPayment([product.value!])
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