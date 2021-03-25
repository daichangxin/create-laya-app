import { BaseAlert, UIEffect } from '@inno/game-sdk';
import { Handler } from '@pawgame/game-library';

class Alert extends BaseAlert {
    constructor() {
        super(fgui.UIPackage.createObject('basic', 'alertUI'));
    }

    protected doReady() {
        super.doReady();
        UIEffect.bounce(this.btn_ok);
        UIEffect.bounce(this.btn_cancel);
    }
}

let alert: Alert;
export function showAlert(
    title: string,
    content: string,
    okHandler?: Handler,
    cancelHandler?: Handler,
) {
    if (!alert) {
        alert = new Alert();
    }
    alert.showContent(content || '', okHandler, cancelHandler, { state: 0, title });
}

export function showSimpleAlert(title: string, content: string, okHandler?: Handler) {
    if (!alert) {
        alert = new Alert();
    }
    alert.showContent(content || '', okHandler, null, { state: 1, title });
}
