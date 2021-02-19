namespace TheNextBigWave {
    import fudge = FudgeCore;

    export class Sound {
        private static backGround: fudge.Audio;
        private static cmpBackground: fudge.ComponentAudio;

        public static init(): void {
            this.backGround = new fudge.Audio("./Sounds/Retroracing_Beach.mp3");
            this.cmpBackground = new fudge.ComponentAudio(this.backGround, true, false);
            this.cmpBackground.connect(true);
            this.cmpBackground.volume = 1;
        }

        public static BackgroundSound(): void {
            this.cmpBackground.play(true);
        }
    }
}