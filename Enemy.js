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
        constructor(_name, _translateX, _translateY) {
            super(_name);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                this.checkCollision(TheNextBigWave.player);
                this.movement(TYPE.SHARK);
                if ((this.mtxWorld.translation.x - TheNextBigWave.player.mtxWorld.translation.x) > 5) {
                    this.spawnNewEnemy();
                }
            };
            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            this.sprite.setAnimation(Enemy.spriteAnimation["Idle"]);
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
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
                    this.speed.x = 0.1;
                case TYPE.SEAGULL:
                    this.speed.x = 0.2;
            }
            this.show(_type);
        }
        spawnNewEnemy() {
            let enemy;
            let charPosition = TheNextBigWave.player.mtxWorld.translation.x;
            if (Math.random() < 0.5) {
                enemy = new Enemy("Shark", (charPosition + 3), -0.2);
            }
            else {
                enemy = new Enemy("Seagull", (charPosition + 3), 0.25);
            }
            TheNextBigWave.game.appendChild(enemy);
        }
    }
    TheNextBigWave.Enemy = Enemy;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Enemy.js.map