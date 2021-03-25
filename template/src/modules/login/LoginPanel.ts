import { Panel } from '@inno/game-sdk';
import { LocalStorage } from '@pawgame/game-library';
import { LoginOperate } from './LoginOperate';

export class LoginPanel extends Panel {
    private txt_name: fgui.GTextField;

    constructor() {
        super(fgui.UIPackage.createObject('basic', 'loginUI'));
    }

    protected doReady() {
        this._isScene = true;
        this.txt_name = this.getChild('txt_name').asTextField;

        this.getChild('btn_login').onClick(this, this.onLoginClick);

        const localUnionID = LocalStorage.defaultInst.getStr('test');
        this.txt_name.text = localUnionID ?? 'Bearer 9527-5023615';
    }

    private onLoginClick() {
        const unionID = this.txt_name.text;
        LocalStorage.defaultInst.setStr('test', unionID);
        LoginOperate.requestLogin(unionID);
    }
}
