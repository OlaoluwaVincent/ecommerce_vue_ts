<template>
    <form class="login" @submit.prevent="login">
        <p v-if="isError" class="text-red-500">{{ error }}</p>
        <div>
            <InputLabel label="username" />
            <InputText v-model="data.username" id="username" placeholder="Enter Username" />
        </div>
        <div>
            <InputLabel label="password" />
            <InputText v-model="data.password" id="password" type="password" placeholder="Enter password" />
        </div>
        <v-btn color="blue-darken-3" type="submit" block :disabled="isPending">Login</v-btn>

        <div>
            <p>Dont have an account? <router-link to="/register" class="text-blue">Register</router-link></p>
        </div>
    </form>
</template>

<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue';
import InputText from '@/components/InputText.vue';
import { loginUser } from '@/requests/user';
import useAuth from '@/stores/auth';
import { useMutation } from '@tanstack/vue-query';
import { onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const auth = useAuth();

const data = reactive({
    username: route.query.username?.toString() || '',
    password: '',
});

onBeforeMount(() => {
    if (auth.token) return router.push('/dashboard');
});

const { isError, error, mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
        const location = route.query.redirect?.toString() || '/dashboard';
        auth.setUser(user)
        router.push(location);

    },
});

function login() {
    mutate({ username: data.username, password: data.password });
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