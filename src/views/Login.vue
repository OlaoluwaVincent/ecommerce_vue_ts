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
        <v-btn color="blue-darken-3" type="submit" block>Login</v-btn>

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
import { onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const auth = useAuth()


onBeforeMount(() => {
    if (auth.token) return router.push('/dashboard')
})




const data = reactive({
    username: '',
    password: '',
    error: ''
})

async function login() {
    const response = await useAxiosLogin(data.username, data.password)
    if (response.token) {
        router.push('/dashboard')
    } else {
        data.error = response;
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