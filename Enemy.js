"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    var fudgeaid = FudgeAid;
    class Enemy extends fudge.Node {
        constructor(_name) {
            super(_name);
            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.sprite.setFrameDirection(1);
            //this.sprite.mtxLocal.translateY(-_size.y / 2);
            //this.sprite.framerate = 7;
            //this.sprite.mtxLocal.translateZ(0.1);
            this.sprite.setAnimation(Enemy.spriteAnimation["Idle"]);
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
    }
    TheNextBigWave.Enemy = Enemy;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Enemy.js.map