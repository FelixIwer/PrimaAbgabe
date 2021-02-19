namespace TheNextBigWave {
    import fudge = FudgeCore;
    import fudgeaid = FudgeAid;

    export enum TYPE {
        SHARK = "Shark",
        SEAGULL = "Seagull"
    }

    export class Enemy extends MovingObject {
        
        private static spriteAnimation: fudgeaid.SpriteSheetAnimations;
        private sprite: fudgeaid.NodeSprite;

        public constructor (_name: string, _translateX: number, _translateY: number) {
            super(_name);

            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            this.sprite.setAnimation(<fudgeaid.SpriteSheetAnimation>Enemy.spriteAnimation["Idle"]);

            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        public static generateSprites(_coat: fudge.CoatTextured): void {
            this.spriteAnimation = {};
            let movementMethod: string;
            let sprite: fudgeaid.SpriteSheetAnimation;

            movementMethod = "Idle";
            sprite = new fudgeaid.SpriteSheetAnimation(movementMethod, _coat);
            sprite.generateByGrid(fudge.Rectangle.GET(4, 5, 36, 39), 1, 200, fudge.ORIGIN2D.BOTTOMCENTER, fudge.Vector2.X(10));
            this.spriteAnimation[movementMethod] = sprite;
        }

        public createHitbox(): Hitbox {

            let hitbox: Hitbox = new Hitbox("EnemyHitbox");
            hitbox.cmpTransform.local.scaleX(0.5);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            return hitbox;
        }

        public show(_type: TYPE): void {
            for (let child of this.getChildren())
              child.activate(child.name == _type);
          }
        
        public movement(_type: TYPE): void {
            switch (_type) {
                case TYPE.SHARK:
                    this.speed.x = 0.1;
                case TYPE.SEAGULL:
                    this.speed.x = 0.2;
                }
            this.show(_type);
        }

        private update = (_event: fudge.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));
      
            this.checkCollision(player);
            this.movement(TYPE.SHARK);

            if ((this.mtxWorld.translation.x - player.mtxWorld.translation.x) > 5 ) {
                this.spawnNewEnemy();
            }
        }

        private spawnNewEnemy(): void {
            let enemy: Enemy;
            let charPosition: number = player.mtxWorld.translation.x;
            if (Math.random() < 0.5){
                enemy = new Enemy("Shark", (charPosition + 3), -0.2);
            } else {
                enemy = new Enemy("Seagull", (charPosition + 3), 0.25);
            }
            game.appendChild(enemy);
        }
}}