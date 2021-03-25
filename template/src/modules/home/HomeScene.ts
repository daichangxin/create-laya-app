import { AsyncScene, SoundManager } from '@inno/game-sdk';
import { PathDefine } from '../../supports/PathDefine';
import { SceneBG } from '../../supports/SceneBG';
import { SceneDefines } from '../game/SceneDefines';
import { HomePanel } from './HomePanel';

export class HomeScene extends AsyncScene {
    constructor() {
        super(HomePanel, SceneDefines.HOME_SCENE);
        SoundManager.inst.playMusic(PathDefine.getSound('background'));
    }

    protected doAwaken() {
        SceneBG.changeHome();
    }
}
