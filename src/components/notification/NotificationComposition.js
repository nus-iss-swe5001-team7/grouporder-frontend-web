import {ref, onMounted, onBeforeUnmount, computed} from 'vue';
import {userStore} from "@/stores/stores";
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';


export class NotificationComposition {
    constructor() {
        this.notifications = ref([]);
        this.stompClient = null;
        this.userId = computed(() => userStore.userId);

        onMounted(() => {
            this.connectWebSocket();
        });

        onBeforeUnmount(() => {
            this.disconnect();
        });
    }

    addNotification(notification) {
        const message = `You have an update on order ${notification.orderId}: ${notification.status}`;
        this.notifications.value.push({
            orderId: notification.orderId,
            status: notification.status,
            message
        });
    }

    removeNotification(index) {
        this.notifications.value.splice(index, 1);
    }

    connectWebSocket() {
        const socket = new SockJS('https://d20bde94kgtbik.cloudfront.net/notification/ws');
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log(str);
            },
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                console.log('Connected to server:', socket.url);
                this.subscribeToNotifications();
            },
            onStompError: (frame) => {
                console.error('Error: ' + frame.headers['message']);
                console.error('Details: ' + frame.body);
            },
        });

        this.stompClient.activate();
    }

    subscribeToNotifications() {
        this.stompClient.subscribe(`/topic/${this.userId.value}`, (message) => {
            const data = JSON.parse(message.body);
            this.addNotification({
                orderId: data.messageRequest.orderId,
                status: data.messageRequest.status
            });
        });
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.deactivate();
            console.log('Disconnected from server');
        } else {
            console.log('stompClient is not defined');
        }
    }
}
