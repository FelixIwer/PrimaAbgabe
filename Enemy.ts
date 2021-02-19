namespace TheNextBigWave {
    import fudge = FudgeCore;
    import fudgeaid = FudgeAid;

    export class Enemy extends MovingObject {
        
        private static spriteAnimation: fudgeaid.SpriteSheetAnimations;
        private sprite: fudgeaid.NodeSprite;

        public constructor (_name: string) {
            super(_name);

            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            this.sprite.setAnimation(<fudgeaid.SpriteSheetAnimation>Enemy.spriteAnimation["Idle"]);

            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
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
    }
}