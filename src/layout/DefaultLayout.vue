<template>
    <v-app>
        <v-main class="main_wrapper">
            <Header />
            <section class="page_wrapper">
                <slot></slot>
            </section>
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


.page_wrapper {
    width: 100%;
    background: #fff;
    padding: 2% 3%;
    height: calc(100% - 100px);
    box-sizing: border-box;
}
</style>