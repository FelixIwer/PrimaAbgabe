"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    window.addEventListener("load", MainGame);
    async function MainGame(_event) {
        const canvas = document.querySelector("canvas");
        TheNextBigWave.Sound.init();
        document.addEventListener("keydown", TheNextBigWave.handleSound);
        document.addEventListener("keyup", TheNextBigWave.handleSound);
        TheNextBigWave.game = new fudge.Node("Game");
        TheNextBigWave.world = new TheNextBigWave.World("World");
        TheNextBigWave.game.appendChild(TheNextBigWave.world);
        await createPlayerSpriteSheet();
        TheNextBigWave.player = new TheNextBigWave.Player("Player");
        TheNextBigWave.game.appendChild(TheNextBigWave.player);
        await createEnemySpriteSheet();
        TheNextBigWave.enemy = new TheNextBigWave.Enemy("Enemy");
        TheNextBigWave.game.appendChild(TheNextBigWave.enemy);
        TheNextBigWave.game.appendChild(new TheNextBigWave.BackgroundPicture("BackgroundPicture"));
        //Camera Setup
        let cmpCamera = new fudge.ComponentCamera();
        // cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");
        cmpCamera.pivot.translateZ(1);
        cmpCamera.pivot.rotateY(180);
        //Viewport Setup
        TheNextBigWave.viewport = new fudge.Viewport();
        TheNextBigWave.viewport.initialize("Viewport", TheNextBigWave.game, cmpCamera, canvas);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);
        TheNextBigWave.viewport.draw();
    }
    function update(_event) {
        TheNextBigWave.processInput();
        TheNextBigWave.viewport.draw();
    }
    async function createPlayerSpriteSheet() {
        let txtPlayer = new fudge.TextureImage();
        await txtPlayer.load("./Screens/SurferBoy.png");
        let coatSprite = new fudge.CoatTextured(null, txtPlayer);
        TheNextBigWave.Player.generateSprites(coatSprite);
    }
    async function createEnemySpriteSheet() {
        let txtEnemy = new fudge.TextureImage();
        await txtEnemy.load("./Screens/Enemys.png");
        let coatSprite = new fudge.CoatTextured(null, txtEnemy);
        TheNextBigWave.Enemy.generateSprites(coatSprite);
    }
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Main.js.map