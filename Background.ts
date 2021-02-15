namespace TheNextBigWave {

    import fudge = FudgeCore;

    export class BackgroundPicture extends fudge.Node {
        private static readonly mQuad: fudge.MeshQuad = new fudge.MeshQuad();
        private static txtBackgroundPicture: fudge.TextureImage = new fudge.TextureImage("./Screens/Ocean.png");

        public constructor (_name: string) {
            super(_name);

            let cmpQuad: fudge.ComponentMesh = new fudge.ComponentMesh(BackgroundPicture.mQuad);
            let mtrBackgroundPicture: fudge.Material = new fudge.Material("BackgroundPicture", fudge.ShaderTexture, new fudge.CoatTextured(null, BackgroundPicture.txtBackgroundPicture));
            let cmpBackgroundPicture: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrBackgroundPicture);

            // Ändern wenn man Hintergrund immer neu laden will
            // this.addComponent(new fudge.ComponentTransform(fudge.Matrix4x4.TRANSLATION(fudge.Vector3.X(0))));
            this.addComponent(cmpQuad);
            this.addComponent(cmpBackgroundPicture);
        }

    }
}