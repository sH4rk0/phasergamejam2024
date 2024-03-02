import Enemy from "./Enemy";
import IEnemy from "./IEnemy";

export default class EnemyRobot extends Enemy implements IEnemy {

    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [

        { key: "robo-idle", frames: [0, 1, 2, 3], frameRate: 10, yoyo: false, repeat: -1 },
        { key: "robo-walk", frames: [4, 5, 6, 7], frameRate: 10, yoyo: false, repeat: -1 }

    ];

    constructor(params: genericConfig) {
        super(params);
        this.name = "robot";
        this.setAlpha(0);
        this._body.setCollideWorldBounds(true).setBounce(1, 0)
        this._body.setVelocityX(-100)

        this._scene.tweens.add({
            targets: this, alpha: 1, duration: 1000, onComplete: () => {

            }
        })

        this._animations.forEach(element => {

            if (!this._scene.anims.exists(element.key)) {

                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("robo2", { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };

                this._scene.anims.create(_animation);
            }

        });

        this.play("robo-walk");

    }
    create() { }
    update(time: number, delta: number) { }

}
