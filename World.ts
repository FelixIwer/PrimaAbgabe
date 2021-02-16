namespace TheNextBigWave {
    import fudge = FudgeCore;

    export class World extends fudge.Node {
        constructor(_name: string) {
            super(_name);

            let wave: Waves;

            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateY(-0.3);
            this.cmpTransform.local.translateX(-0.47);
            this.createWaves(wave);
        }

        public createWaves(_waves: Waves): void {
            let floorDistance: number = 0;

            for (let index: number = 0; index < 9; index++) {
                _waves = new Waves("Waves", floorDistance);
                floorDistance += 0.36;

                this.appendChild(_waves);
            }
        }
    }
}