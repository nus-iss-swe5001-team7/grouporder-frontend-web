import {APPLICATION_VIEWS, STEPS} from '@/constants/applicationConstants.js';

export class UiStoreModel {
    constructor() {
        this.activeView = APPLICATION_VIEWS.CUSTOMER_VIEW;
        this.currentStep = STEPS.RESTAURANT;
        this.jointGroupOrderId = null;
    }

    getActiveView() {
        return this.activeView;
    }

    setActiveView(activeView) {
        this.activeView = activeView;
    }

    setCurrentStep(step) {
        this.currentStep = step;
    }

    getCurrentStep() {
        return this.currentStep;
    }

}
