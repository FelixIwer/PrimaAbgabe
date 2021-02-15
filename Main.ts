namespace TheNextBigWave {
    import fudge = FudgeCore;

    window.addEventListener("load", MainGame);

    export let viewport: fudge.Viewport;

    export let game: fudge.Node;
    export let player: Player;

    async function MainGame(_event: Event): Promise<void> {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        game = new fudge.Node("Game");

        await createPlayerSpriteSheet();
        player = new Player("Player");
        game.addChild(player);

        game.appendChild(new BackgroundPicture("BackgroundPicture"));

        //Camera Setup
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");
        

        //Viewport Setup
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);

        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);
        viewport.draw();
    }

    function update(_event: Event): void {
        viewport.draw();
    }

    async function createPlayerSpriteSheet(): Promise<void> {
        let txtPlayer: fudge.TextureImage = new fudge.TextureImage();
        await txtPlayer.load("./Screens/Surfer.png");
        let coatSprite: fudge.CoatTextured = new fudge.CoatTextured(null, txtPlayer);
        Player.generateSprites(coatSprite);
    }
}