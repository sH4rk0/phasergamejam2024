import Enemy from "./Enemy";
import IEnemy from "./IEnemy";

export default class EnemyBomb extends Enemy implements IEnemy {

    private _velocity: number = Phaser.Math.RND.integerInRange(180, 220);
    private _animations: Array<{ key: string, frames: Array<number>, frameRate: number, yoyo: boolean, repeat: number }> = [

        { key: "bomb-rotation", frames: [0, 1, 2, 3, 4, 5], frameRate: 10, yoyo: false, repeat: -1 },


    ];

    constructor(params: genericConfig) {
        super(params);
        this.name = "bomb";
        this.setScale(2).setAlpha(0);
        this._body.setCollideWorldBounds(true).setBounce(1, 1).setCircle(12, 4, 4);
        this._body.setVelocityX(-100).setVelocityY(100);
        this._body.enable = false;
        this._scene.tweens.add({
            targets: this, alpha: 1, duration: 1000, onComplete: () => {
                this._body.enable = true;
            }
        })

        this._animations.forEach(element => {

            if (!this._scene.anims.exists(element.key)) {

                let _animation: Phaser.Types.Animations.Animation = {
                    key: element.key,
                    frames: this.anims.generateFrameNumbers("bomb", { frames: element.frames }),
                    frameRate: element.frameRate,
                    yoyo: element.yoyo,
                    repeat: element.repeat
                };

                this._scene.anims.create(_animation);
            }

        });

        this.play("bomb-rotation");

    }
    create() { }
    update(time: number, delta: number) { }

}
