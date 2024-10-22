<template>
  <transition name="fade">
    <div v-if="composition.visible" class="toast">
      <span>{{ composition.message }}</span>
      <button @click="composition.close()">✖</button>
    </div>
  </transition>
</template>

<script setup>
import {ToastNotificationComposition} from "@/components/notification/toastNotification/ToastNotificationComposition";

// eslint-disable-next-line no-undef
const props = defineProps(['message']);

// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);

const composition = new ToastNotificationComposition(props, emit);

</script>

<style scoped lang="scss" src="./ToastNotification.scss"></style>
