"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class MovingObject extends fudge.Node {
        constructor(_name) {
            super(_name);
            this.speed = ƒ.Vector3.ZERO();
            this.addComponent(new fudge.ComponentTransform());
        }
        checkCollision(_checkCollision) {
            for (let waves of _checkCollision.getChildren()) {
                if (waves.name == "Waves") {
                    let rect = waves.getRectWorld();
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        let translation = this.cmpTransform.local.translation;
                        translation.y = rect.y;
                        this.cmpTransform.local.translation = translation;
                        this.speed.y = 0;
                    }
                }
                else if (waves.name == "Wall") {
                    let rect = waves.getRectWorld();
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        let translation = this.cmpTransform.local.translation;
                        translation.x = rect.x;
                        this.cmpTransform.local.translation = translation;
                        this.speed.y = 0;
                        this.speed.x = 0;
                    }
                }
            }
        }
    }
    TheNextBigWave.MovingObject = MovingObject;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=MovingObject.js.map