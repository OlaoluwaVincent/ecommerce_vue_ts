<template>
    <form class="flex flex-col gap-4">
        <p>
            Price: <span>{{ cartStore.price }}</span>
        </p>
        <p>
            Discount: <span>{{ cartStore.discount }}</span>
        </p>
        <p>
            Tax: <span>{{ cartStore.tax }}</span>
        </p>

        <v-divider class="border-gray-600"></v-divider>
        <p class="text-lg uppercase font-bold ">
            Total:
            <span>&#x20A6;{{ total.toFixed(2) }}</span>
        </p>
        <v-btn color="black" type="submit" block :disabled="!cartStore.price">Proceed to Checkout</v-btn>
        <!-- </Link> -->
    </form>
</template>

<script setup lang="ts">
import useCartStore from "@/stores/cart";
import { computed } from "vue";

const cartStore = useCartStore();

const total = computed(() =>
    cartStore.price +
    cartStore.tax -
    cartStore.discount

);

// const form = useForm({
//     amount: total.value,
//     metadata: cartStore.cart.map((item) => ({
//         id: item.id,
//         title: item.title,
//     })),
// });
</script>

<style scoped>
p {
    display: flex;
    justify-content: space-between;
}
</style>
