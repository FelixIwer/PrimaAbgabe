namespace TheNextBigWave {
    import fudge = FudgeCore;

    interface KeyPressed {
        [code: string]: boolean;
    }
  
    let keysPressed: KeyPressed = {};
    let startGame: boolean = false;
    
    function handleKeyboard(_event: KeyboardEvent): void {
        keysPressed[_event.code] = (_event.type == "keydown");
    }

    export async function start(): Promise<void> {
        await waitForKeyPress(fudge.KEYBOARD_CODE.SPACE);
        startGame = true;
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        let menu: HTMLElement = document.querySelector("div#Start");
        menu.style.visibility = "hidden";
    }

    export function end(): void {
        let domOver: HTMLElement = document.querySelector("div#Over");
        domOver.style.visibility = "visible";
        window.removeEventListener("keydown", handleKeyboard);
        window.removeEventListener("keyup", handleKeyboard);
      }

    async function waitForKeyPress(_code: fudge.KEYBOARD_CODE): Promise<void> {
        return new Promise(_resolve => {
            window.addEventListener("keydown", hndKeyDown);
            function hndKeyDown(_event: KeyboardEvent): void {
                if (_event.code == _code) {
                    window.removeEventListener("keydown", hndKeyDown);
                    _resolve();
                }
            }
        });
    }

    export function handleSound(_event: KeyboardEvent): void {
        if (startGame == true) {
            sounds.BackgroundSound(true);
        }
    }

    export function processInput(): void {

        //Player Keys
        if (keysPressed[fudge.KEYBOARD_CODE.A]) {
            player.act(ACTION.SURF, DIRECTION.LEFT);
            return;
        }

        if (keysPressed[fudge.KEYBOARD_CODE.D]) {
            player.act(ACTION.SURF, DIRECTION.RIGHT);
            return;
        }

        if (keysPressed[fudge.KEYBOARD_CODE.W]) {
            player.act(ACTION.JUMP);
            return;  
        }

        player.act(ACTION.IDLE);
    }
}