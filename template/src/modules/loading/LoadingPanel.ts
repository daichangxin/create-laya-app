import { AsyncPanel } from '@inno/game-sdk';

export class LoadingPanel extends AsyncPanel {
    private _canClose: boolean;
    constructor() {
        super('res/ui/basic', 'UI_loading');
    }

    protected doReady() {
        super.doReady();

        this._isCenter = true;
        this._isMode = true;
        this._skin.onClick(this, this.onTap);
    }

    private onTap() {
        if (this._canClose) {
            this.hide();
        }
    }

    private setClose() {
        this._canClose = true;
    }

    protected doAwaken() {
        this._canClose = false;
        Laya.timer.once(10000, this, this.setClose);
    }

    protected doSleep() {
        Laya.timer.clear(this, this.hide);
    }
}
