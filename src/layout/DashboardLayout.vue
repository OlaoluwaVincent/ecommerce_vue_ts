<template>
  <v-app>
    <v-main class="main_wrapper">
      <Header />
      <section class="page_wrapper">
        <Sidebar />
        <div class="w-full">
          <router-view />
        </div>
      </section>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import Sidebar from '../components/Sidebar.vue';
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
    padding: 2%;
    height: calc(100% - 100px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  @media (width>=768px) {
    .page_wrapper {
      gap: 30px;
      flex-direction: row;
    }
  }
</style>
