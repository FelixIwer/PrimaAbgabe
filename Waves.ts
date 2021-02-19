namespace TheNextBigWave {
    import fudge = FudgeCore;

    export class Waves extends fudge.Node {
        private static readonly mQuad: fudge.MeshQuad = new fudge.MeshQuad();
        private static txtWavesPicture: fudge.TextureImage = new fudge.TextureImage("./Screens/Wave.png");

        public constructor(_name: string, _distance: number) {
            super(_name);

            let cmpQuad: fudge.ComponentMesh = new fudge.ComponentMesh(Waves.mQuad);
            let mtrWavesPicture: fudge.Material = new fudge.Material("WavesPicture", fudge.ShaderTexture, new fudge.CoatTextured(null, Waves.txtWavesPicture));
            let cmpWavesPicture: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrWavesPicture);

            this.addComponent(cmpQuad);
            this.addComponent(cmpWavesPicture);

            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.scaleX(0.35);
            this.cmpTransform.local.scaleY(0.35);
            this.cmpTransform.local.translateX(_distance);
        }
    }
}