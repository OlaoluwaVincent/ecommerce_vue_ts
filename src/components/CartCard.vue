<template>
    <p>{{ props.product.title }}</p>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Product } from '@/utils/typings';

const props = defineProps<{
    product: Product
}>();
</script>

<style scoped></style>
