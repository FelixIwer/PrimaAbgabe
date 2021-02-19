"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    var fudgeaid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["SURF"] = "Surf";
        ACTION["JUMP"] = "Jump";
    })(ACTION = TheNextBigWave.ACTION || (TheNextBigWave.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = TheNextBigWave.DIRECTION || (TheNextBigWave.DIRECTION = {}));
    class Player extends TheNextBigWave.MovingObject {
        constructor(_name = "Player") {
            super(_name);
            // private static gravity: fudge.Vector2 = fudge.Vector2.Y(-3);
            this.speed = fudge.Vector3.ZERO();
            this.gravity = ƒ.Vector2.Y(-3);
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += this.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(TheNextBigWave.waves);
                this.checkCollision(TheNextBigWave.world);
                this.hitbox.checkCollision();
            };
            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            this.sprite.setAnimation(Player.spriteAnimation["Idle"]);
            this.appendChild(this.sprite);
            this.addComponent(new fudge.ComponentTransform());
            // this.cmpTransform.local.rotateZ(15);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_coat) {
            this.spriteAnimation = {};
            let surfingMethod;
            let sprite;
            surfingMethod = "Idle";
            sprite = new fudgeaid.SpriteSheetAnimation(surfingMethod, _coat);
            sprite.generateByGrid(fudge.Rectangle.GET(23, 58, 91, 71), 1, 200, fudge.ORIGIN2D.BOTTOMCENTER, fudge.Vector2.X(10));
            this.spriteAnimation[surfingMethod] = sprite;
            surfingMethod = "Surf";
            sprite = new fudgeaid.SpriteSheetAnimation(surfingMethod, _coat);
            sprite.generateByGrid(fudge.Rectangle.GET(23, 47, 91, 82), 2, 200, fudge.ORIGIN2D.BOTTOMCENTER, fudge.Vector2.X(13));
            this.spriteAnimation[surfingMethod] = sprite;
        }
        createHitbox() {
            let hitbox = new TheNextBigWave.Hitbox("PlayerHitbox");
            hitbox.cmpTransform.local.translateX(0.2);
            hitbox.cmpTransform.local.scaleX(0.35);
            hitbox.cmpTransform.local.scaleY(0.5);
            this.hitbox = hitbox;
            return hitbox;
        }
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        }
        act(_action, _direction) {
            this.direction = _direction;
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.SURF:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Player.speedMax.x;
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.JUMP:
                    //Abfrage für einfachen Jump
                    if (this.speed.y != 0) {
                        break;
                    }
                    else {
                        this.speed.y = 3.5;
                    }
                    break;
            }
            this.show(_action);
        }
    }
    Player.speedMax = new fudge.Vector2(1.5, 5);
    TheNextBigWave.Player = Player;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Char.js.map