<template>
  <div class="top-menu">
    <div class="top-menu-logo">
      <img :src="logoImage" class="centered-item" alt="Group Food Order" height="50" width="50" />
    </div>

    <div class="top-menu-header">
      <div class="top-menu-header-text">Group Food Order</div>
    </div>

    <div class="top-menu-user">
      <div class="top-menu-user-name-text">{{ userName }}</div>
      <div class="top-menu-user-role-text">{{ userRole }}</div>
    </div>

    <div v-if="isLoggedIn" class="top-menu-cart">
      <img :src="shoppingCartImage" class="cart-icon" title="Food Selection Cart"
           alt="Food Selection Cart" @click="composition.showCart()"/>
    </div>

    <!-- Only show the logout button if the user is logged in -->
    <div class="top-menu-user-log-out" v-if="isLoggedIn">
      <a href="#" @click="composition.logOut()">LogOut</a>
    </div>
  </div>
</template>

<script setup>

import { TopMenuComposition } from "@/components/topMenu/topMenuComposition";

const composition = new TopMenuComposition();

const { userName, userRole, logoImage, isLoggedIn, shoppingCartImage} = composition;
</script>

<style scoped lang="scss" src="./topMenu.scss"></style>
