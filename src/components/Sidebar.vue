<template>
    <v-container d-flex class=" sidebar !w-[250px] bg-gray-900">
        <div>
            <h3 class="text-white font-bold text-center my-5">{{ auth.user?.username }}</h3>
        </div>
        <RouterLink :to="{ name: 'dashboard' }" class="link">
            Dashboard
        </RouterLink>
        <RouterLink v-if="auth.isAdmin" :to="{ name: 'create' }" class="link">
            Create
        </RouterLink>
        <RouterLink :to="{ name: 'orders' }" class="link">
            Orders
        </RouterLink>
    </v-container>
</template>

<script setup lang="ts">
import useAuth from '@/stores/auth';
const auth = useAuth()

</script>

<style scoped>
.sidebar {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    height: max-content;
    min-height: 400px;
    border-radius: 16px;
    gap: 12px;
    text-align: left;
}

.link {
    @apply text-gray-900 font-semibold capitalize hover:ml-2 transition-all duration-300 text-left block w-full rounded-lg p-2 bg-white
}


.router-link-exact-active {
    @apply bg-blue-500 text-white
}
</style>