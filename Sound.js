"use strict";
var TheNextBigWave;
(function (TheNextBigWave) {
    var fudge = FudgeCore;
    class Sound {
        static init() {
            this.backGround = new fudge.Audio("./Sounds/Retroracing_Beach.mp3");
            this.cmpBackground = new fudge.ComponentAudio(this.backGround, true, false);
            this.cmpBackground.connect(true);
            this.cmpBackground.volume = 1;
        }
        static BackgroundSound() {
            this.cmpBackground.play(true);
        }
    }
    TheNextBigWave.Sound = Sound;
})(TheNextBigWave || (TheNextBigWave = {}));
//# sourceMappingURL=Sound.js.map