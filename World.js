"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class World extends fudge.Node {
        constructor(_name) {
            super(_name);
            let wave;
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateY(-0.3);
            this.cmpTransform.local.translateX(-0.47);
            this.createWaves(wave);
        }
        createWaves(_waves) {
            let floorDistance = 0;
            for (let index = 0; index < 9; index++) {
                _waves = new TheNextBigWave.Waves("Waves", floorDistance);
                floorDistance += 0.36;
                this.appendChild(_waves);
            }
            return TheNextBigWave.world;
        }
    }
    TheNextBigWave.World = World;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=World.js.map