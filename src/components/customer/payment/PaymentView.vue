<template>
  <div class="payment-form">
    <div>
      <select v-model="selectedPaymentOption">
        <option value="creditCard">Credit Card</option>
        <option value="payLah">PayLah</option>
        <option value="payNow">PayNow</option>
      </select>
    </div>

    <div v-if="selectedPaymentOption === 'creditCard'">
      <input v-model="creditCardNumber" type="text" @input="composition.validateCCNum()" placeholder="Credit Card Number">
      <span v-if="!validCreditCardNumber && creditCardNumber" class="error-message">Invalid number of digits</span>
    </div>

    <div v-if="selectedPaymentOption === 'creditCard'">
      <input v-model="expiryDate" type="text" @input="composition.validateDate()" placeholder="Expiry Date (MM/YY)">
      <span v-if="!validDate && expiryDate" class="error-message">Invalid number of digits</span>
    </div>

    <div v-if="selectedPaymentOption === 'creditCard'">
      <input v-model="cvv" type="text" @input="composition.validateCVV()" placeholder="CVV">
      <span v-if="!validCVV && cvv" class="error-message">Invalid number of CVV digits</span>
    </div>

    <div v-if="selectedPaymentOption === 'payLah'">
      <input v-model="payLahMobileNumber" type="text" placeholder="Mobile Number" @input="composition.validateNumber()">
      <span v-if="!validNumber && payLahMobileNumber" class="error-message">Invalid phone number!</span>
      <!-- Add other PayLah related fields -->
    </div>

    <div v-if="selectedPaymentOption === 'payNow'">
      <input v-model="payNowMobileNumber" type="text" placeholder="Mobile Number" @input="composition.validateNumber()">
      <span v-if="!validNumber && payNowMobileNumber" class="error-message">Invalid phone number!</span>
      <!-- Add other PayLNow related fields -->
    </div>

    <button v-if="isInfoProvided"
        @click="composition.makePayment()">
      Make Payment
    </button>

    <div v-if="paymentSuccessful" class="payment-message">
      Payment successful!
    </div>



  </div>



</template>









<!-- <template>
  <div class="payment-form">
    <div>
      <input v-model="creditCardNumber" type="text" @input="composition.validateCCNum()" placeholder="Credit Card Number">
      <span v-if="!validCreditCardNumber" class="error-message">Invalid number of digits</span>
    </div>
    <div>
      <input v-model="expiryDate" type="text" @input="composition.validateDate()" placeholder="Expiry Date (MM/YY)">
      <span v-if="!validDate" class="error-message">Invalid number of digits</span>
    </div>
    <div>
      <input v-model="cvv" type="text" @input="composition.validateCVV()" placeholder="CVV">
      <span v-if="!validCVV" class="error-message">Invalid number of CVV digits</span>
    </div> -->

    <!-- <button @click="composition.makePayment()">Make Payment</button>
    <div v-if="paymentSuccessful" class="payment-message">
      Payment successful!
    </div> -->
    <!-- <select v-model="usePromo">
      <label for="Apply Promotion?">Cuisine Type: </label>
      <option value="true">Use Promo</option>
      <option value="false">Do not Use Promo</option>
    </select> -->


    <!-- <button @click="composition.makePayment()">Make Payment</button>
    <div v-if="paymentSuccessful" class="payment-message">
      Payment successful!
    </div>
  </div>
</template> -->

<script setup>
import { PaymentViewComposition } from "./PaymentViewComposition";

const composition = new PaymentViewComposition();
//console.log(composition.test);
const { creditCardNumber, expiryDate, cvv, paymentSuccessful, validCreditCardNumber, validCVV, validDate, selectedPaymentOption, payLahMobileNumber, payNowMobileNumber, isInfoProvided, validNumber} = composition;
</script>

<style lang="scss" scoped src="./PaymentView.scss"></style>
