<template>
    <form class="login" @submit.prevent="login">
        <p v-if="data.error" class="text-red-500">{{ data.error }}</p>
        <div>
            <InputLabel label="username" />
            <InputText v-model="data.username" id="username" placeholder="Enter Username" />
        </div>
        <div>
            <InputLabel label="password" />
            <InputText v-model="data.password" id="password" type="password" placeholder="Enter password" />
        </div>
        <v-btn color="blue-darken-3" type="submit" block :disabled="loading">Login</v-btn>

        <div>
            <p>Dont have an account? <router-link to="/register" class="text-blue">Register</router-link></p>
        </div>
    </form>
</template>

<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue';
import InputText from '@/components/InputText.vue'
import useAxiosLogin from '@/requests/login';
import useAuth from '@/stores/auth';
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const auth = useAuth()
const loading = ref(false)

const data = reactive({
    username: route.query.username?.toString() || '',
    password: '',
    error: ''
})

onBeforeMount(() => {
    if (auth.token) return router.push('/dashboard')
})

async function login() {
    const response = await useAxiosLogin(data.username, data.password)
    loading.value = response.isLoading;
    if (response.data) {
        router.push('/dashboard')
    } else {
        data.error = response.error;
    }
}

</script>

<style scoped>
.login {
    width: max-content;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>