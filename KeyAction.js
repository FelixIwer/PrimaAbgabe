"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    let keysPressed = {};
    let startGame = false;
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    async function start() {
        await waitForKeyPress(fudge.KEYBOARD_CODE.SPACE);
        startGame = true;
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        let menu = document.querySelector("div#Start");
        menu.style.visibility = "hidden";
    }
    TheNextBigWave.start = start;
    function end() {
        let domOver = document.querySelector("div#Over");
        domOver.style.visibility = "visible";
        window.removeEventListener("keydown", handleKeyboard);
        window.removeEventListener("keyup", handleKeyboard);
    }
    TheNextBigWave.end = end;
    async function waitForKeyPress(_code) {
        return new Promise(_resolve => {
            window.addEventListener("keydown", hndKeyDown);
            function hndKeyDown(_event) {
                if (_event.code == _code) {
                    window.removeEventListener("keydown", hndKeyDown);
                    _resolve();
                }
            }
        });
    }
    function handleSound(_event) {
        if (startGame == true) {
            TheNextBigWave.sounds.BackgroundSound(true);
        }
    }
    TheNextBigWave.handleSound = handleSound;
    function processInput() {
        //Player Keys
        if (keysPressed[fudge.KEYBOARD_CODE.A]) {
            TheNextBigWave.player.act(TheNextBigWave.ACTION.SURF, TheNextBigWave.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[fudge.KEYBOARD_CODE.D]) {
            TheNextBigWave.player.act(TheNextBigWave.ACTION.SURF, TheNextBigWave.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
            TheNextBigWave.player.act(TheNextBigWave.ACTION.JUMP);
            return;
        }
        TheNextBigWave.player.act(TheNextBigWave.ACTION.IDLE);
    }
    TheNextBigWave.processInput = processInput;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=KeyAction.js.map