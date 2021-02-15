"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    var fudgeaid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = TheNextBigWave.ACTION || (TheNextBigWave.ACTION = {}));
    class Player extends fudge.Node {
        constructor(_name = "Player") {
            super(_name);
            this.action = ACTION.IDLE;
            this.sprite = new fudgeaid.NodeSprite("Sprite");
            this.addComponent(new fudge.ComponentTransform());
            this.sprite.setFrameDirection(1);
            //this.sprite.mtxLocal.translateY(-_size.y / 2);
            //this.sprite.framerate = 7;
            //this.sprite.mtxLocal.translateZ(0.1);
            this.sprite.setAnimation(Player.spriteAnimation["Idle"]);
            this.appendChild(this.sprite);
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
    TheNextBigWave.Player = Player;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Char.js.map