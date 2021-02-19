"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class Sound {
        constructor() {
            this.backGround = new fudge.Audio("./Sounds/Retroracing_Beach.mp3");
            this.cmpBackground = new fudge.ComponentAudio(this.backGround, true, false);
            this.cmpBackground.connect(true);
            this.cmpBackground.volume = 0.8;
        }
        BackgroundSound(_playing) {
            this.cmpBackground.play(_playing);
        }
    }
    TheNextBigWave.Sound = Sound;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Sound.js.map