<template>
    <v-app>
        <v-main class="main_wrapper">
            <Header />
            <slot></slot>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
</script>

<style scoped>
.main_wrapper {
    width: 100%;
    background: #f2f2f2;
    min-height: 100svh;
}
</style>