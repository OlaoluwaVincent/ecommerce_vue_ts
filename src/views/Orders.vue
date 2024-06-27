<template>
    <v-container>
        <h1> Orders page</h1>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/stores/auth';
import { computed, onMounted } from 'vue';

const auth = useAuth()
const isAdmin = computed(() => auth.user?.role === 'ADMIN')

onMounted(() => {
    if (isAdmin) {
        // Make admin request
    }

    // Make user requests
})

</script>

<style scoped></style>