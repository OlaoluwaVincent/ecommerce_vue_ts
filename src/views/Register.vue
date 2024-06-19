<template>
    <section class="login">
        <p v-if="data.error" class="text-red-600 font-bold text-sm text-center">{{ data.error }}</p>

        <div>
            <InputLabel label="username" />
            <InputText v-model="data.username" id="username" placeholder="Enter Username" />
        </div>
        <div>
            <InputLabel label="full name" />
            <InputText v-model="data.fullname" id="fullname" placeholder="Enter Fullname" />
        </div>
        <div>
            <InputLabel label="email" />
            <InputText v-model="data.email" id="email" type="email" placeholder="Enter Email" />
        </div>
        <article>
            <div>
                <InputLabel label="password" />
                <InputText v-model="data.password" id="password" type="password" placeholder="Enter password"
                    @input="handleLengthCheck($event)" />
            </div>
            <div>
                <InputLabel label="confirm password" />
                <InputText v-model="data.confirmPassword" id="confirm password" type="password"
                    placeholder="Comfirm password" @input="handlePasswordCheck($event)" ref="cPassword" />
            </div>
        </article>
        <p v-if="!checks.isMatch" class="text-red-600 font-bold text-sm">Passwords do not match</p>
        <p v-if="checks.passwordLength" class="text-red-600 font-bold text-sm">Passwords must be atleast 8 characters
        </p>

        <v-btn type="button" color="green-darken-3" block :disabled="checks.loading" @click="login">Register</v-btn>

        <div>
            <p>Already have an account? <router-link to="/login" class="text-blue">Login</router-link></p>
        </div>
    </section>
</template>

<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue';
import InputText from '@/components/InputText.vue';
import useAxiosRegister from '@/requests/register';
import useAuth from '@/stores/auth';
import { onBeforeMount, reactive, ref, type VNodeRef } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuth()
const router = useRouter()
const cPassword = ref<HTMLInputElement | null>(null)

const checks = reactive({
    isMatch: true,
    loading: false,
    passwordLength: false,
})

onBeforeMount(() => {
    if (auth.token) return router.push('/dashboard')
})

function handleLengthCheck(e: any) {
    cPassword.value = document.getElementById('confirm password') as HTMLInputElement

    if (e.target.value.length < 8) {
        checks.passwordLength = true;
        if (cPassword.value) {
            cPassword.value.disabled = true;
        }
        return
    } else {
        checks.passwordLength = false;
        cPassword.value.disabled = false;
    }
}

function handlePasswordCheck(e: any) {
    if (e.target.value === data.password) {
        checks.isMatch = true;
    } else {
        checks.isMatch = false;
    }
}


const data = reactive({
    username: '',
    password: '',
    fullname: '',
    confirmPassword: '',
    email: '',
    error: ''
})

async function login() {
    const response = await useAxiosRegister({
        email: data.email,
        fullname: data.fullname,
        password: data.password,
        username: data.username,
    });

    checks.loading = response.isLoading;
    if (response.data) {
        console.log(response.data)
        router.push('/login?username=' + response.data.user?.username)
    } else {
        console.log(response.error)
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

article {
    display: flex;
    gap: 20px;
}
</style>
