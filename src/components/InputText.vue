<template>
    <input v-model="model" :id="id" :type="type ?? 'text'" required :placeholder="placeholder" class="input">
</template>

<script setup lang="ts">

const model = defineModel()

defineProps({
    type: {
        type: String,
        required: false
    },
    placeholder: {
        type: String,
        required: false
    },
    id: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
.input {
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
    color: #333;
}

.input::placeholder {
    font-size: 90%
}

.input:focus {
    outline-color: teal;
}
</style>