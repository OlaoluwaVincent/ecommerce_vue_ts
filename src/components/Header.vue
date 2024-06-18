<template>
    <nav class="header">
        <div class="nav-items first">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
            <RouterLink to="/cart" class="nav-link">
                <v-badge color="blue" :content="cartStore.cartLength">
                    <v-icon size="30">mdi-cart</v-icon>
                </v-badge>
            </RouterLink>
        </div>

        <div class="nav-items second">
            <RouterLink to="/login" class="nav-link">Login</RouterLink>
            <RouterLink to="/register" class="nav-link">Register</RouterLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import useCartStore from '../stores/cart'
const cartStore = useCartStore()


</script>

<style scoped>
.header {
    height: 100px;
    border-bottom: 2px solid gray;
    display: flex;
    gap: 40px;
    justify-content: space-between;
    align-items: center;
    margin-inline: auto;
    width: 100%;
    text-align: center;
    padding-inline: 5%;
}

.nav-items {
    display: flex;
    gap: 20px;
    align-items: center;
}

.nav-link {
    text-align: center;
    text-decoration: none;
    color: maroon;
    font-size: 24px;
    z-index: 10;
    position: relative;
}

.router-link-active {
    border: 1px dotted maroon;
    padding: 8px 24px;
}
</style>