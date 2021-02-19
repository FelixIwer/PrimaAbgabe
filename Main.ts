namespace TheNextBigWave {
    import fudge = FudgeCore;

    window.addEventListener("load", MainGame);

    export let viewport: fudge.Viewport;

    export let game: fudge.Node;
    export let player: Player;
    export let enemy: Enemy;
    export let world: World;
    export let waves: Waves;
    export let sounds: Sound;

    async function MainGame(_event: Event): Promise<void> {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        await createPlayerSpriteSheet();
        await createEnemySpriteSheet();

        document.addEventListener("keydown", handleSound);
        document.addEventListener("keyup", handleSound);
        
        sounds = new Sound();

        game = new fudge.Node("Game");

        world = new World("World");
        game.addChild(world);

        player = new Player("Player");
        game.addChild(player);

        game.addChild(new BackgroundPicture("BackgroundPicture"));

        //Camera Setup
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(1);
        cmpCamera.pivot.rotateY(180);

        //Viewport Setup
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);

        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);
        viewport.draw();

        start();

        function update(_event: fudge.Eventƒ): void {
            processInput();
            viewport.draw();
        }

        async function createPlayerSpriteSheet(): Promise<void> {
            let txtPlayer: fudge.TextureImage = new fudge.TextureImage();
            await txtPlayer.load("./Screens/SurferBoy.png");
            let coatSprite: fudge.CoatTextured = new fudge.CoatTextured(null, txtPlayer);
            Player.generateSprites(coatSprite);
        }

        async function createEnemySpriteSheet(): Promise<void> {
            let txtEnemy: fudge.TextureImage = new fudge.TextureImage();
            await txtEnemy.load("./Screens/Enemys.png");
            let coatSprite: fudge.CoatTextured = new fudge.CoatTextured(null, txtEnemy);
            Enemy.generateSprites(coatSprite);
        }
}
}