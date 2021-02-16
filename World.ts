namespace TheNextBigWave {
    import fudge = FudgeCore;

    class World extends fudge.Node {
        constructor(_name: string) {
            super(_name);
        }

        public generateWave(): void {
            for (let index: number = 0; index < 5; index++) {
                let nameNumber: number = 0;
                nameNumber ++;
                let wave = new Waves("Waves" + nameNumber);
                wave.appendChild(wave);
            }
        }
    }
}