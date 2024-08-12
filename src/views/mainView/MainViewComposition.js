
import {APPLICATION_VIEWS} from '@/constants/applicationConstants.js';
import {computed} from "vue";
import {uiStore} from "@/stores/stores";


export class MainViewComposition {
    constructor() {
        this.applicationViews = APPLICATION_VIEWS;
        this.activeView = computed(() => uiStore.activeView);

    }
}

