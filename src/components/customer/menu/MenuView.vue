<template>
  <div>
    <div>
      <div v-for="menu in menus"
           :key="menu.id"
           :title="menu.description"
           class="card">
        <img class="card-img" :src="menu.menuImageURL">
        <p>
          <span>{{ menu.menuName }}</span>
          <span class="menu-price"> ${{ menu.menuPrice.toFixed(2) }}</span>

          <button v-if="composition.getQuantity(menu) !== 0" class="quantity-change-button" @click="composition.removeItem(menu)" type="button"> -</button>
          <span v-if="composition.getQuantity(menu) !== 0" class="cart-quantity">{{ composition.getQuantity(menu) }}</span>
          <button v-if="composition.getQuantity(menu) !== 0" class="quantity-change-button" @click="composition.addItem(menu)" type="button"> +</button>

          <button v-if="composition.getQuantity(menu) === 0"
                  class="add-basket"
                  @click="composition.addToCart(menu)">
            Add
          </button>
        </p>
      </div>
    </div>

    <button v-if="cartItems.length > 0"
            class="checkout-button"
            @click="composition.checkout()">
      Check Out
    </button>

  </div>

</template>

<script setup>

import {MenuViewComposition} from "@/components/customer/menu/MenuViewComposition";

const composition = new MenuViewComposition();

const {menus, cartItems} = composition;

</script>

<style scoped lang="scss" src="./MenuView.scss"></style>