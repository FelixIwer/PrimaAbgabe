"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class Hitbox extends fudge.Node {
        constructor(_name) {
            if (_name) {
                super(_name);
            }
            else {
                super("Hitbox");
            }
            this.addComponent(new fudge.ComponentTransform());
            let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
            cmpMesh.pivot = Hitbox.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = fudge.Rectangle.GET(0, 0, 100, 100);
            let topleft = new fudge.Vector3(-0.5, 0.5, 0);
            let bottomright = new fudge.Vector3(0.5, -0.5, 0);
            //let pivot: fudge.Matrix4x4 = this.getComponent(fudge.ComponentMesh).pivot;
            let mtxResult = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
        checkCollision() {
            this.checkCollisionEnemy();
        }
        checkCollisionEnemy() {
            for (let child of TheNextBigWave.game.getChildren()) {
                if (child.name == "Enemy") {
                    let hitbox = Hitbox;
                    hitbox = child.hitbox;
                    if (this.hitDetected(hitbox)) {
                        // Player nimmt Schaden
                    }
                    else {
                        continue;
                    }
                }
            }
        }
        hitDetected(hitbox) {
            let hit = false;
            let rectOfThis = this.getRectWorld();
            let rectOfThat = hitbox.getRectWorld();
            let expansionRight = new fudge.Vector2(rectOfThat.size.x);
            let expansionDown = new fudge.Vector2(0, rectOfThat.size.y);
            let topRight = fudge.Vector2.SUM(rectOfThat.position, expansionRight);
            let bottomLeft = fudge.Vector2.SUM(rectOfThat.position, expansionDown);
            let bottomRight = fudge.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);
            if (rectOfThis.isInside(rectOfThat.position)) {
                hit = true;
            }
            else if (rectOfThis.isInside(topRight)) {
                hit = true;
            }
            else if (rectOfThis.isInside(bottomLeft)) {
                hit = true;
            }
            else if (rectOfThis.isInside(bottomRight)) {
                hit = true;
            }
            return hit;
        }
    }
    Hitbox.mesh = new fudge.MeshSprite();
    // private static material: fudge.Material = new fudge.Material("Hitbox", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("black", 0.5)));
    Hitbox.pivot = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    TheNextBigWave.Hitbox = Hitbox;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Hitbox.js.map