<template>
  <TopMenu></TopMenu>
  <div class="login-form">
    <img class="logo"
         src="../../assets/images/groupFoodOrder.jpg"/>
    <h1> {{ registerOrLogin }} </h1>
    <div class="register">
      <input v-if="!hasAccount" title="Enter Name" type="text" v-model="name" placeholder="Enter Name"/>

      <div>
        <input title="Enter Email" type="text" v-model="email"  @input="composition.validateEmail()" placeholder="Enter Email"/>
        <span v-if="!validEmail && email" class="error-message">Invalid email format</span>
      </div>

      <input title="Enter Password" type="password" v-model="password" placeholder="Enter Password"/>

      <div>
        <input v-if="!hasAccount" title="ReEnter Password" type="password" v-model="rePassword" placeholder="ReEnter Password"/>
        <span class="error-message">{{errorMessage}}</span>
      </div>


      <div v-if="!hasAccount" class="radio-inline">
        <input type="radio" id="customer" value="customer" v-model="role" name="role">
        <label for="customer">Customer</label>
        <input type="radio" id="restaurant" value="restaurant" v-model="role" name="role">
        <label for="restaurant">Restaurant</label>
        <input type="radio" id="delivery" value="delivery" v-model="role" name="role">
        <label for="delivery">Delivery</label>
      </div>


      <button @click="composition.registerUser()"
              :disabled="!isRegisterButtonEnabled">
        {{ registerOrLogin }}
      </button>

      <div v-if="!hasAccount"
           class="info-message">Already have an account, please
        <a href="#" @click="composition.toggleToLogin()">Login</a>
      </div>
      <div v-if="hasAccount"
           class="info-message">Don't have an account yet, please
        <a href="#" @click="composition.toggleToRegister()">Register</a>
      </div>

    </div>
  </div>

</template>

<script setup>
import {LoginViewComposition} from "@/views/LoginView/LoginViewComposition.js";
import TopMenu from "@/components/topMenu/topMenu.vue";

const composition = new LoginViewComposition();
const {name, password, email, role, rePassword, errorMessage, isRegisterButtonEnabled, registerOrLogin, hasAccount, validEmail} = composition;
</script>

<style scoped lang="scss" src="./LoginView.scss"></style>

