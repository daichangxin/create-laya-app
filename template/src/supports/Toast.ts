import { BaseToastItem, Toast } from '@inno/game-sdk';

class ToastItem extends BaseToastItem {
    private txt_des: fgui.GTextField;

    constructor() {
        super(fgui.UIPackage.createObject('basic', 'ToastItem'));
    }

    protected doReady() {
        this.txt_des = this.getChild('txt_des').asTextField;
    }

    setMessage(msg: string) {
        this.txt_des.text = msg;
    }
}

let toast: Toast;
export function showToast(message: string) {
    if (!toast) {
        toast = new Toast(ToastItem);
    }
    toast.show(message);
}
