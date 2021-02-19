namespace TheNextBigWave {
    import fudge = FudgeCore;

    export class Sound {
        private backGround: fudge.Audio;
        private cmpBackground: fudge.ComponentAudio;

        public constructor() {
            this.backGround = new fudge.Audio("./Sounds/Retroracing_Beach.mp3");
            this.cmpBackground = new fudge.ComponentAudio(this.backGround, true, false);
            this.cmpBackground.connect(true);
            this.cmpBackground.volume = 0.8;
        }

        public BackgroundSound(_playing: boolean): void {
            this.cmpBackground.play(_playing);
        }
    }
}