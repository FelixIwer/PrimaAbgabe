"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class Waves extends fudge.Node {
        constructor(_name, _distance) {
            super(_name);
            let cmpQuad = new fudge.ComponentMesh(Waves.mQuad);
            let mtrWavesPicture = new fudge.Material("WavesPicture", fudge.ShaderTexture, new fudge.CoatTextured(null, Waves.txtWavesPicture));
            let cmpWavesPicture = new fudge.ComponentMaterial(mtrWavesPicture);
            this.addComponent(cmpQuad);
            this.addComponent(cmpWavesPicture);
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.scaleX(0.35);
            this.cmpTransform.local.scaleY(0.35);
            this.cmpTransform.local.translateX(_distance);
        }
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright = new ƒ.Vector3(0.5, -0.5, 0);
            let mtxResult = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Waves.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Waves.mQuad = new fudge.MeshQuad();
    Waves.txtWavesPicture = new fudge.TextureImage("./Screens/Wave.png");
    Waves.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1.4));
    TheNextBigWave.Waves = Waves;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Waves.js.map