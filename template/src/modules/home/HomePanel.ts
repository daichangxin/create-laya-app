import { AsyncPanel } from '@inno/game-sdk';

export class HomePanel extends AsyncPanel {
    private $skin: c.UI_home;

    constructor() {
        super('res/ui/home', 'UI_home');
    }

    protected async doReady() {
        super.doReady();
        this._isScene = true;
    }
}
