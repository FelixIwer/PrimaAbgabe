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
    }
    Waves.mQuad = new fudge.MeshQuad();
    Waves.txtWavesPicture = new fudge.TextureImage("./Screens/Wave.png");
    TheNextBigWave.Waves = Waves;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Waves.js.map