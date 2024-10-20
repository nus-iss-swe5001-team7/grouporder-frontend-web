import {ref} from "vue";

export class ToastNotificationComposition {
    constructor(props, emit) {
        this.emit = emit;
        this.visible = ref(false);
        this.message = ref(props.message || "");

        if (this.message.value !== "") {
            this.show();
        }
    }

    show() {
        this.visible.value = true;

        setTimeout(() => {
            this.hide();
        }, 100000);
    }

    hide() {
        this.visible.value = false;
        this.emit('close');
    }

    close() {
        this.hide();
    }
}
