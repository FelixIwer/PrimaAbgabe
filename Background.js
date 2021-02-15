"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class BackgroundPicture extends fudge.Node {
        constructor(_name) {
            super(_name);
            let cmpQuad = new fudge.ComponentMesh(BackgroundPicture.mQuad);
            let mtrBackgroundPicture = new fudge.Material("BackgroundPicture", fudge.ShaderTexture, new fudge.CoatTextured(null, BackgroundPicture.txtBackgroundPicture));
            let cmpBackgroundPicture = new fudge.ComponentMaterial(mtrBackgroundPicture);
            // Ändern wenn man Hintergrund immer neu laden will
            // this.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(0))));
            this.addComponent(cmpQuad);
            this.addComponent(cmpBackgroundPicture);
        }
    }
    BackgroundPicture.mQuad = new fudge.MeshQuad();
    BackgroundPicture.txtBackgroundPicture = new fudge.TextureImage("./Screens/Ocean.png");
    TheNextBigWave.BackgroundPicture = BackgroundPicture;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Background.js.map