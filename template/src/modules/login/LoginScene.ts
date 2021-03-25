import { AsyncScene, View } from '@inno/game-sdk';
import { SceneDefines } from '../game/SceneDefines';
import { PrePanel } from '../pre/PrePanel';
import { LoginPanel } from './LoginPanel';

export class LoginScene extends AsyncScene {
    constructor() {
        super(LoginPanel, SceneDefines.LOGIN);
    }

    protected doAwaken() {
        // 本地登录，把loading关闭
        View.togglePanel(PrePanel, 0);
    }
}
