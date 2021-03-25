import { AsyncPanel, Resize } from '@inno/game-sdk';
import { SceneBG } from '../../supports/SceneBG';

export class PrePanel extends AsyncPanel {
    protected $skin: c.UI_pre;

    constructor() {
        super('res/ui/pre', 'UI_pre');
    }

    protected doReady() {
        super.doReady();
        this._isScene = true;
        this._skin.setSize(Resize.getWidth(), Resize.getHeight());
    }

    update(value: number, des: string) {
        if (!this._isReady) {
            this.addReady(this, this.update, [value, des]);
            return;
        }
        this.$skin.txt_info.text = `Loading ${value}/100`;
    }

    protected doAwaken() {
        SceneBG.changePreBG();
    }
}
