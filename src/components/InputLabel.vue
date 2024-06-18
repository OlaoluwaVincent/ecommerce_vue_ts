<template>
    <label :for="label" class="label">
        {{ label }}
    </label>
</template>

<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.label {
    display: block;
    color: #222;
    font-size: 13px;
    margin-bottom: 8px;
    text-transform: capitalize;
}


@media (width>=768px) {
    .label {
        font-size: 16px;
    }
}
</style>