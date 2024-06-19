<template>
    <v-app>
        <v-main class="main_wrapper">
            <router-link to="/">
                <h1>Shop with <br> <span id="logo">EasyShop</span></h1>
            </router-link>
            <slot></slot>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">

</script>

<style scoped>
h1 {
    margin-top: 30px;
    text-align: center;
}

#logo {
    font-size: 36px;
    color: maroon;
    text-shadow: whitesmoke;
}

.main_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center !important;
    gap: 20px;
}
</style>