"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class World extends fudge.Node {
        constructor(_name) {
            super(_name);
        }
        generateWave() {
            for (let index = 0; index < 5; index++) {
                let nameNumber = 0;
                nameNumber++;
                let wave = new TheNextBigWave.Waves("Waves" + nameNumber);
                wave.appendChild(wave);
            }
        }
    }
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=World.js.map