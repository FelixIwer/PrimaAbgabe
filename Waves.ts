namespace TheNextBigWave {
    import fudge = FudgeCore;

    export class Waves extends fudge.Node {
        private static readonly mQuad: fudge.MeshQuad = new fudge.MeshQuad();
        private static txtWavesPicture: fudge.TextureImage = new fudge.TextureImage("./Screens/Wave.png");
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1.4));

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

        public getRectWorld(): ƒ.Rectangle {
            let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
            
            let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Waves.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
      
            let size: ƒ.Vector2 = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
      
            return rect;
        }
    }
}