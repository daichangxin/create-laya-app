import { FairyLoader, RES, Resize, UILayer } from '@inno/game-sdk';

let bg: FairyLoader;
function setBG(url: string) {
    if (!bg) {
        bg = new FairyLoader();
        bg.align = 'center';
        bg.verticalAlign = 'middle';
        bg.setSize(Resize.getWidth(), Resize.getHeight());
        UILayer.inst.getUIRoot().addChildAt(bg, 0);
    }
    if (url) {
        // 这么写，可以等待加载完毕再切换，否则两个背景切换会有个加载时间的白屏
        RES.load(url).then(() => {
            (bg.content as Laya.Sprite).texture = Laya.loader.getRes(url);
        });
    } else {
        bg.url = null;
        bg.removeFromParent();
    }
}

function changeEmpty() {
    setBG(null);
}

function changePreBG() {
    setBG('res/images/scene/bg_pre.jpg');
}

function changeHome() {
    setBG('res/images/scene/bg.png');
}

export const SceneBG = {
    setBG,
    changeEmpty,
    changePreBG,
    changeHome,
};
