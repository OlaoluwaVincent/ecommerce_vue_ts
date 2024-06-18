<template>
    <section class="login">
        <div>
            <InputLabel label="username" />
            <InputText id="username" placeholder="Enter Username" />
        </div>
        <div>
            <InputLabel label="password" />
            <InputText id="password" type="password" placeholder="Enter password" />
        </div>
        <v-btn color="blue-darken-3" block>Login</v-btn>

        <div>
            <p>Dont have an account? <router-link to="/register" class="text-blue">Register</router-link></p>
        </div>
    </section>
</template>

<script setup lang="ts">
import InputLabel from '@/components/InputLabel.vue';
import InputText from '@/components/InputText.vue'
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