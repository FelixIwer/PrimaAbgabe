namespace TheNextBigWave {
    import fudge = FudgeCore;
    import fudgeaid = FudgeAid;

    export enum ACTION {
        IDLE = "Idle",
        SURF = "Surf",
        JUMP = "Jump"
    }

    export enum DIRECTION {
        LEFT,
        RIGHT
    }

    export class Player extends fudge.Node {

        private static spriteAnimation: fudgeaid.SpriteSheetAnimations;
        private static speedMax: fudge.Vector2 = new fudge.Vector2(1.5, 5);
        // private static gravity: fudge.Vector2 = fudge.Vector2.Y(-3);
        
        public speed: fudge.Vector3 = fudge.Vector3.ZERO();
        public direction: DIRECTION;
        
        private sprite: fudgeaid.NodeSprite;

        constructor(_name: string = "Player") {
            super(_name);

            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            this.sprite.setAnimation(<fudgeaid.SpriteSheetAnimation>Player.spriteAnimation["Idle"]);
            this.appendChild(this.sprite);

            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.rotateZ(15);

            console.log(this.cmpTransform.local.translation, "Test");
        }

        public static generateSprites(_coat: fudge.CoatTextured): void {
            this.spriteAnimation = {};
            let surfingMethod: string;
            let sprite: fudgeaid.SpriteSheetAnimation;

            surfingMethod = "Idle";
            sprite = new fudgeaid.SpriteSheetAnimation(surfingMethod, _coat);
            sprite.generateByGrid(fudge.Rectangle.GET(23, 58, 91, 71), 1, 200, fudge.ORIGIN2D.BOTTOMCENTER, fudge.Vector2.X(10));
            this.spriteAnimation[surfingMethod] = sprite;
            
            surfingMethod = "Surf";
            sprite = new fudgeaid.SpriteSheetAnimation(surfingMethod, _coat);
            sprite.generateByGrid(fudge.Rectangle.GET(23, 47, 91, 82), 2, 200, fudge.ORIGIN2D.BOTTOMCENTER, fudge.Vector2.X(13));
            this.spriteAnimation[surfingMethod] = sprite;
        }

        public show(_action: ACTION): void {
            for (let child of this.getChildren())
              child.activate(child.name == _action);
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            this.direction = _direction;
            switch (_action) {
              case ACTION.IDLE:
                this.speed.x = 0;
                break;
              case ACTION.SURF:
                let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                this.speed.x = Player.speedMax.x;
                this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                break;
              case ACTION.JUMP:
                //Abfrage für einfachen Jump
                if (this.speed.y != 0) {
                  break;
                } else {
                  this.speed.y = 3.5;
                }
                break;
            }
            this.show(_action);
          }
    }
}