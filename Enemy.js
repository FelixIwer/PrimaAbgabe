"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    var fudgeaid = FudgeAid;
    class Enemy extends TheNextBigWave.MovingObject {
        constructor(_name) {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                this.checkCollision(TheNextBigWave.waves);
                this.checkCollision(TheNextBigWave.world);
            };
            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            this.sprite.setAnimation(Enemy.spriteAnimation["Idle"]);
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_coat) {
            this.spriteAnimation = {};
            let movementMethod;
            let sprite;
            movementMethod = "Idle";
            sprite = new fudgeaid.SpriteSheetAnimation(movementMethod, _coat);
            sprite.generateByGrid(fudge.Rectangle.GET(4, 5, 36, 39), 1, 200, fudge.ORIGIN2D.BOTTOMCENTER, fudge.Vector2.X(10));
            this.spriteAnimation[movementMethod] = sprite;
        }
        createHitbox() {
            let hitbox = new TheNextBigWave.Hitbox("EnemyHitbox");
            hitbox.cmpTransform.local.scaleX(0.5);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            return hitbox;
        }
    }
    TheNextBigWave.Enemy = Enemy;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Enemy.js.map