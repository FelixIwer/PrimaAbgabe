namespace TheNextBigWave {
    import fudge = FudgeCore;

    window.addEventListener("load", MainGame);

    interface KeyPressed {
        [code: string]: boolean;
      }
      
    let keysPressed: KeyPressed = {};

    export let viewport: fudge.Viewport;

    export let game: fudge.Node;
    export let player: Player;
    export let enemy: Enemy;
    export let world: World;

    async function MainGame(_event: Event): Promise<void> {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        game = new fudge.Node("Game");

        world = new World("World");
        game.addChild(world);

        await createPlayerSpriteSheet();
        player = new Player("Player");
        game.addChild(player);

        await createEnemySpriteSheet();
        enemy = new Enemy("Enemy");
        game.addChild(enemy);

        game.appendChild(new BackgroundPicture("BackgroundPicture"));

        //Camera Setup
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        // cmpCamera.backgroundColor = ƒ.Color.CSS("darkblue");
        cmpCamera.pivot.translateZ(1);
        cmpCamera.pivot.rotateY(180);

        //Viewport Setup
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);

        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);

        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);
        viewport.draw();
    }

    function update(_event: fudge.Eventƒ): void {
        processInput();
        viewport.draw();
    }

    async function createPlayerSpriteSheet(): Promise<void> {
        let txtPlayer: fudge.TextureImage = new fudge.TextureImage();
        await txtPlayer.load("./Screens/Surfer.png");
        let coatSprite: fudge.CoatTextured = new fudge.CoatTextured(null, txtPlayer);
        Player.generateSprites(coatSprite);
    }

    async function createEnemySpriteSheet(): Promise<void> {
        let txtEnemy: fudge.TextureImage = new fudge.TextureImage();
        await txtEnemy.load("./Screens/Enemys.png");
        let coatSprite: fudge.CoatTextured = new fudge.CoatTextured(null, txtEnemy);
        Enemy.generateSprites(coatSprite);
    }

    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
    }

    function processInput(): void {
        if (keysPressed[fudge.KEYBOARD_CODE.A]) {
            player.act(ACTION.WALK, DIRECTION.LEFT);
            return;
        }

        if (keysPressed[fudge.KEYBOARD_CODE.D]) {
            player.act(ACTION.WALK, DIRECTION.RIGHT);
            return;
        }

        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
            player.act(ACTION.JUMP);
            return;  
        }

        player.act(ACTION.IDLE);
    }
}