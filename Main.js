"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    window.addEventListener("load", MainGame);
    let keysPressed = {};
    async function MainGame(_event) {
        const canvas = document.querySelector("canvas");
        TheNextBigWave.game = new fudge.Node("Game");
        TheNextBigWave.world = new TheNextBigWave.World("World");
        TheNextBigWave.game.addChild(TheNextBigWave.world);
        await createPlayerSpriteSheet();
        TheNextBigWave.player = new TheNextBigWave.Player("Player");
        TheNextBigWave.game.addChild(TheNextBigWave.player);
        await createEnemySpriteSheet();
        TheNextBigWave.enemy = new TheNextBigWave.Enemy("Enemy");
        TheNextBigWave.game.addChild(TheNextBigWave.enemy);
        TheNextBigWave.game.appendChild(new TheNextBigWave.BackgroundPicture("BackgroundPicture"));
        //Camera Setup
        let cmpCamera = new fudge.ComponentCamera();
        // cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");
        cmpCamera.pivot.translateZ(1);
        cmpCamera.pivot.rotateY(180);
        //Viewport Setup
        TheNextBigWave.viewport = new fudge.Viewport();
        TheNextBigWave.viewport.initialize("Viewport", TheNextBigWave.game, cmpCamera, canvas);
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);
        TheNextBigWave.viewport.draw();
    }
    function update(_event) {
        processInput();
        TheNextBigWave.viewport.draw();
    }
    async function createPlayerSpriteSheet() {
        let txtPlayer = new fudge.TextureImage();
        await txtPlayer.load("./Screens/Surfer.png");
        let coatSprite = new fudge.CoatTextured(null, txtPlayer);
        TheNextBigWave.Player.generateSprites(coatSprite);
    }
    async function createEnemySpriteSheet() {
        let txtEnemy = new fudge.TextureImage();
        await txtEnemy.load("./Screens/Enemys.png");
        let coatSprite = new fudge.CoatTextured(null, txtEnemy);
        TheNextBigWave.Enemy.generateSprites(coatSprite);
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[fudge.KEYBOARD_CODE.A]) {
            TheNextBigWave.player.act(TheNextBigWave.ACTION.WALK, TheNextBigWave.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[fudge.KEYBOARD_CODE.D]) {
            TheNextBigWave.player.act(TheNextBigWave.ACTION.WALK, TheNextBigWave.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
            TheNextBigWave.player.act(TheNextBigWave.ACTION.JUMP);
            return;
        }
        TheNextBigWave.player.act(TheNextBigWave.ACTION.IDLE);
    }
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Main.js.map