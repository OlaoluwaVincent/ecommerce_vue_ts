<template>
    <v-app>
        <v-main class="main_wrapper">
            <slot></slot>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">

</script>

<style scoped>
.main_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>