<template>
    <section class="login">
        <div>
            <InputLabel label="username" />
            <InputText id="username" placeholder="Enter Username" />
        </div>
        <div>
            <InputLabel label="email" />
            <InputText id="email" type="email" placeholder="Enter Email" />
        </div>
        <article>
            <div>
                <InputLabel label="password" />
                <InputText id="password" type="password" placeholder="Enter password" />
            </div>
            <div>
                <InputLabel label="confirm password" />
                <InputText id="confirm password" type="password" placeholder="Comfirm password" />
            </div>
        </article>
        <v-btn color="green-darken-3" block>Register</v-btn>

        <div>
            <p>Already have an account? <router-link to="/login" class="text-blue">Login</router-link></p>
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

article {
    display: flex;
    gap: 20px;
}
</style>