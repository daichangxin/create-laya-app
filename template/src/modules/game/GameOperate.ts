import { App, Console, FairyRes, Scene, View } from '@inno/game-sdk';
import { Singleton } from '@pawgame/game-library';
import { loadConfig } from '../../supports/Config';
import { PathDefine } from '../../supports/PathDefine';
import { HomeScene } from '../home/HomeScene';
import { PrePanel } from '../pre/PrePanel';

export class GameOperate {
    private _pre: PrePanel;
    private _isBasicResReady: boolean;

    static get inst() {
        return Singleton.get(GameOperate);
    }

    /** 初始化框架 */
    init() {
        fgui.UIConfig.packageFileExtension = 'gz';
        fgui.UIConfig.buttonSound = PathDefine.getSound('click');
        Laya.SoundManager.useAudioMusic = false;
        Laya.SoundManager.autoStopMusic = true;
        App.inst.init();
    }

    async startUp() {
        this._pre = View.togglePanel(PrePanel, 1);
        await loadConfig();
        await this.loadResource();
        this._isBasicResReady = true;
        this.enterGame();
    }

    async loadResource() {
        try {
            this._pre.update(30, '小喵正在看电视');
            await FairyRes.getPackageRes('res/ui/basic').loadAll();
            this._pre.update(40, '小喵正在玩耍');
            await FairyRes.getPackageRes('res/ui/home').loadAll();
            this._pre.update(100, '小喵正在来临的路上');
        } catch (e) {
            Console.log('sys', 'loadResource.fail, retry..');
            await this.loadResource();
        }
        Console.log('test', 'load resource complete');
    }

    onLogin() {
        this.enterGame();
    }

    private enterGame() {
        // isLogin
        if (!this._isBasicResReady) {
            Console.log('test', 'enterGame.return: basic res not ready');
            return;
        }
        Console.log('test', 'enterGame.success');
        View.togglePanel(PrePanel, 0);
        Scene.change(HomeScene);
    }
}
