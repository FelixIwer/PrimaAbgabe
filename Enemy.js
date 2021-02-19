"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    var fudgeaid = FudgeAid;
    let TYPE;
    (function (TYPE) {
        TYPE["SHARK"] = "Shark";
        TYPE["SEAGULL"] = "Seagull";
    })(TYPE = TheNextBigWave.TYPE || (TheNextBigWave.TYPE = {}));
    class Enemy extends TheNextBigWave.MovingObject {
        constructor(_name) {
            super(_name);
            this.updateShark = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                this.checkCollision(TheNextBigWave.player);
                this.movement(TYPE.SHARK);
            };
            this.updateGull = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                this.checkCollision(TheNextBigWave.player);
                this.movement(TYPE.SEAGULL);
            };
            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            this.sprite.setAnimation(Enemy.spriteAnimation["Idle"]);
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.updateShark);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.updateGull);
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
        show(_type) {
            for (let child of this.getChildren())
                child.activate(child.name == _type);
        }
        movement(_type) {
            switch (_type) {
                case TYPE.SHARK:
                    this.speed.x = 10;
                case TYPE.SEAGULL:
                    this.speed.x = 20;
            }
            this.show(_type);
        }
    }
    TheNextBigWave.Enemy = Enemy;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Enemy.js.map