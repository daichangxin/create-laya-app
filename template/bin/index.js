// 游戏启动
function startGame() {
    // debug支持
    var is_debug = window.location.href.indexOf("is_debug") !== -1;
    window.is_debug = is_debug;
    // 调试辅助
    if (is_debug) {
        // 不要打印大的东西，or显示对象，会卡死
        loadLib("ext/eruda.min.js");
        setTimeout(function () {
            window["eruda"].init();
        }, 100);
    }
    // 加载js
    loadLib("js/libs.js");
    loadLib("js/bundle.js");
}
startGame();
