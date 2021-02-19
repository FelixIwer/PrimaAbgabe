namespace TheNextBigWave {
    import fudge = FudgeCore;

    export class MovingObject extends fudge.Node {
        public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
        public hitbox: Hitbox;

        public constructor(_name: string) {
            super(_name);
            this.addComponent(new fudge.ComponentTransform());
        }

    public checkCollision(_checkCollision: ƒ.Node): void {
        for (let waves of _checkCollision.getChildren()) {
          if (waves.name == "Waves") {
            let rect: ƒ.Rectangle = (<Waves>waves).getRectWorld();
            let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
              let translation: ƒ.Vector3 = this.cmpTransform.local.translation;
              translation.y = rect.y;
              this.cmpTransform.local.translation = translation;
              this.speed.y = 0;
            }
          } else if (waves.name == "Wall") {
            let rect: ƒ.Rectangle = (<Waves>waves).getRectWorld();
            let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
            if (hit) {
              let translation: ƒ.Vector3 = this.cmpTransform.local.translation;
              translation.x = rect.x;
              this.cmpTransform.local.translation = translation;
              this.speed.y = 0;
              this.speed.x = 0;
            }
          }
        }
      }
    }

}