<template>
  <div class="notification-container">
    <ToastNotification
        v-for="(notification, index) in notifications"
        :key="index"
        :message="notification.message"
        @close="composition.removeNotification(index)"
        :style="{ top: `${index * 10}px` }"
    ></ToastNotification>
  </div>
</template>

<script setup>

import {NotificationComposition} from "@/components/notification/NotificationComposition";
import ToastNotification from "@/components/notification/toastNotification/ToastNotification.vue";

const composition = new NotificationComposition();

const {notifications} = composition;

</script>

<style scoped lang="scss" src="./NotificationComponent.scss"></style>
