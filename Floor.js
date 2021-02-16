"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class Waves extends fudge.Node {
        constructor(_name) {
            super(_name);
            let cmpQuad = new fudge.ComponentMesh(Waves.mQuad);
            let mtrWavesPicture = new fudge.Material("WavesPicture", fudge.ShaderTexture, new fudge.CoatTextured(null, Waves.txtWavesPicture));
            let cmpWavesPicture = new fudge.ComponentMaterial(mtrWavesPicture);
            this.addComponent(cmpQuad);
            this.addComponent(cmpWavesPicture);
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.scaleX(0.35);
            this.cmpTransform.local.scaleY(0.35);
            this.cmpTransform.local.translateY(-0.85);
        }
    }
    Waves.mQuad = new fudge.MeshQuad();
    Waves.txtWavesPicture = new fudge.TextureImage("./Screens/Wave.png");
    TheNextBigWave.Waves = Waves;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Floor.js.map