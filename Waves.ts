namespace TheNextBigWave {
    import fudge = FudgeCore;

    export class Waves extends fudge.Node {
        private static readonly mQuad: fudge.MeshQuad = new fudge.MeshQuad();
        private static txtWavesPicture: fudge.TextureImage = new fudge.TextureImage("./Screens/Wave.png");
        private static readonly pivot: fudge.Matrix4x4 = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(1.4));

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

        public getRectWorld(): fudge.Rectangle {
            let rect: fudge.Rectangle = fudge.Rectangle.GET(0, 0, 100, 100);
            let topleft: fudge.Vector3 = new fudge.Vector3(-0.5, 0.5, 0);
            let bottomright: fudge.Vector3 = new fudge.Vector3(0.5, -0.5, 0);
            
            let mtxResult: fudge.Matrix4x4 = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Waves.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
      
            let size: fudge.Vector2 = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
      
            return rect;
        }
    }
}